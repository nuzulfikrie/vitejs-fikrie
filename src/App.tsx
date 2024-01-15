import { useEffect, useState, useCallback } from 'react';
import './assets/skin/default_skin/css/theme.min.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primeflex/primeflex.css'; // css utility
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css'; // core css
import { STEP_SETTING } from './constants/step_constants';
import { Toast } from 'primereact/toast';
import React from 'react';
import constants from './constants/constants';
import { dataFetcher } from './features/dataFetcher';
import dataLibrary from './features/dataLibrary';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import axios from 'axios';
import URL_LINKS from './constants/urls';
import PanelTableBase from './ui/components/Panel/PanelTableBase';
import PanelCompilation from './ui/components/Panel/PanelCompilation';
import PanelPodSummary from './ui/components/Panel/PanelPodSummary';
import RefreshButton from './ui/components/Buttons/RefreshButton';
import { PodDataExtractor } from './features/PodDataExtractor';
import { Accordion, AccordionTab } from 'primereact/accordion';
import {
  DataTableSelectEvent,
  DataTableUnselectEvent,
} from 'primereact/datatable';
import ResetButton from './ui/components/Buttons/ResetButton';
import GenerateButton from './ui/components/Buttons/GenerateButton';
import SaveButton from './ui/components/Buttons/SaveButton';
import DeleteButton from './ui/components/Buttons/DeleteButton';
import GoToButton from './ui/components/Buttons/GoToButton';
import {
  savedata,
  goto,
  generate,
  deletedata,
} from './functions/app/AppFunctions';
import '../src/ui/css/loading.css';
import EditJournalModal from './ui/components/Modal/EditJournalModal';
function App() {
  const [datatable, setDatatable] = useState([]);
  const [title, setTitle] = useState(STEP_SETTING.TITLE.value);
  const [loading, setLoading] = useState(false);
  const [panelCompilationLoading, setPanelCompilationLoading] = useState(false);
  const [panelPodSummaryLoading, setPanelPodSummaryLoading] = useState(false);
  const [panelRawLoading, setPanelRawLoading] = useState(false);

  const [error, setError] = useState(null);
  //-----------------------------//
  // function for toast messages //
  //-----------------------------//

  const toast = React.useRef(null);

  {
    /**
     FOR DATA TABLE - data state is selection
     */
  }

  //1 check if item is selected
  const [projectId, setProjectId] = useState(
    localStorage.getItem('course_id') || '',
  );
  const [subthemeId, setSubthemeId] = useState(
    localStorage.getItem('subtheme_id') || '',
  );
  const [rqConstruct, setRqConstruct] = useState(
    localStorage.getItem('rq_construct') || '',
  );
  const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
  const [selections, setSelections] = useState([]);
  const [rowsSelected, setRowsSelected] = useState([]);
  const [rowClick, setRowClick] = useState(true);
  const [expandedRows, setExpandedRows] = useState(null);
  const [summary40Words, setSummary40Words] = useState('');
  const [compilation, setCompilation] = useState('');
  const [compilationRaw, setCompilationRaw] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');

  {
    /*
      - use in form
      */
  }
  const [selectedJournal, setSelectedJournal] = useState('');
  const [modalEditVisible, setModalEditVisible] = useState(false);
  {
    /* -- use in modal */
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalIdentifier, setModalIdentifier] = useState('');
  const [modalItemId, setModalItemId] = useState('');

  let urlDataTable =
    URL_LINKS.DATATABLE_DATA.value +
    projectId +
    '/' +
    subthemeId +
    '/' +
    rqConstruct +
    '/' +
    userId;

  let urlSubthemeData = URL_LINKS.SUBTHEME.value + subthemeId;

  const setEditorContent = (content: string) => {
    setContent(content);
  };

  const handleEditorChange = useCallback((content: string) => {
    setEditorContent(content);
  }, []);

  const handleTitleChange = useCallback((modalTitle: string) => {
    setModalTitle(modalTitle);
  }, []);

  const retrieveEditorContent = () => {
    // Retrieve the editor content
    return content;
  };

  const loadData = async () => {
    setLoading(true);
    setPanelCompilationLoading(true);
    setPanelPodSummaryLoading(true);

    if (!projectId || !subthemeId || !rqConstruct || !userId) {
      showError(
        'important data project id, subtheme id, rq construct, user id is missing',
      );
    }

    //WIPE OUT ALL LOCAL STORAGE BY KEY
    localStorage.removeItem('subtheme_pod');
    localStorage.removeItem('subtheme_40_summary');
    localStorage.removeItem('subtheme_raw');
    localStorage.removeItem('preselections');

    //const urlB = urlData + '/' + projectId + '/' + userId + '/' + rqConstruct;
    try {
      // First Axios call
      axios
        .get(urlDataTable)
        .then((response) => {
          // Process the response from the first call

          if (response.data.status === 'success') {
            setDatatable(response.data.data);
            if (response.data.data.selections !== null) {
              const preselections = response.data.selections;
              setSelections(preselections);

              //set initial preselections in local storage use on reset
              localStorage.setItem(
                'preselections',
                JSON.stringify(preselections),
              );

              const preselectedRows = datatable.filter((row: any) =>
                preselections.includes(row.id),
              );
              setRowsSelected(preselectedRows);
            }
          } else {
            showError(response.data.message);
          }

          // Second Axios call
          return axios.get(urlSubthemeData);
        })
        .then((response) => {
          if (response.data.status === 'success') {
            setLoading(false);

            let summary40Words = PodDataExtractor.extractTextFromHtml(
              response.data.data.subtheme_40_summary,
            );

            //sanitize remove all \n
            summary40Words = summary40Words.replace(/\n/g, ' ');

            let compilation = PodDataExtractor.extractTextFromHtml(
              response.data.data.subtheme_pod,
            );

            //sanitize remove all \n
            compilation = compilation.replace(/\n/g, ' ');
            setSummary40Words(summary40Words);
            setCompilation(compilation);

            //set in local storage for reset
            localStorage.setItem('subtheme_pod', JSON.stringify(compilation));

            //set in local storage for reset
            localStorage.setItem(
              'subtheme_40_summary',
              JSON.stringify(summary40Words),
            );

            //parse and get text only
            let subthemeRawContent = PodDataExtractor.extractTextFromHtml(
              response.data.data.subtheme_raw,
            );

            setCompilationRaw(subthemeRawContent);

            //set in local storage for reset
            localStorage.setItem(
              'subtheme_raw',
              JSON.stringify(subthemeRawContent),
            );
            setPanelCompilationLoading(false);
            setPanelPodSummaryLoading(false);
          }
        })
        .catch((error) => {
          // Handle any error that occurs during the calls
          console.error('An error occurred:', error);
        });
    } catch (err: any) {
      console.error('Error in fetchSubtheme:', err);
      // Directly set the error message
      setError(err?.message || 'An error occurred');
    }

    // Delay for 3 seconds before setting loading to false
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const HtmlContentAlert = ({ html }: { html: string }) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  //retrieve primereact datatable selection
  const updateSelections = (selectedRow: any) => {
    setRowsSelected(selectedRow);
  };

  const unselectAll = () => {
    setSelections([]);
  };

  const removeDataClick = () => { };

  const onCheckedChange = (id: string, checked: boolean, content: string) => { };

  const deleteDataClick = (
    item_id: string,
    identifier: string,
    content: string,
  ) => {
    console.log(
      ' -- deleteDataClick -- ' +
      item_id +
      ' - identifier - ' +
      identifier +
      ' - content - ' +
      content,
    );
    console.log(item_id);

    confirmDialog({
      message: (
        <div>
          <p>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
          <HtmlContentAlert html={content} />
        </div>
      ),
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => performDelete(item_id, identifier),
      reject: () => showWarn('Delete cancelled'),
    });
  };

  const performDelete = async (item_id: string, identifier: string) => {
    try {
      // Replace with your API endpoint and pass necessary data
      const urlDelete = URL_LINKS.DELETE_RESEARCH_FILTER.value + projectId;
      const response = await axios.post(urlDelete + '/' + item_id);

      console.log('-- response  ---');
      console.log(response);
      console.log('-- response  ---');

      showSuccess('Item successfully deleted');
      // Refresh data or perform any other actions needed after successful deletion
      loadData();
    } catch (error) {
      showError('Failed to delete item');
      console.error('Delete Error:', error);
    }
  };

  const editDataClick = (
    item_id: string,
    identifier: string,
    title: string,
    content: string,
  ) => {
    console.log(
      ' -- editDataClick -- ' + item_id + ' - identifier - ' + identifier,
    );
    console.log(content);
    console.log(item_id);

    openModal();
    setModalItemId(item_id);
    setModalIdentifier(identifier);
    setContent(content);
    setModalTitle(title);
  };
  const saveData = async () => {
    console.log(
      ' -- saveData -- ' + modalItemId + ' - identifier - ' + modalIdentifier,
    );
    console.log(modalItemId);

    console.log('########### title ######');
    console.log(modalTitle);
    console.log('########### content ######');
    console.log(content);

    let title = modalTitle;
    let forty_words_summary = content;
    let course_id = projectId;
    let rq_construct = rqConstruct;
    let user_id = userId;
    let course_type = localStorage.getItem('course_type');

    let URLSAVE = URL_LINKS.SAVE_RESEARCH_FILTER.value + projectId;

    // perform save
    try {
      const response = await axios.post(URLSAVE, {
        title,
        forty_words_summary,
        course_id,
        rq_construct,
        user_id,
        course_type,
      });

      console.log(
        '-- ####################### response #######################################3 ---',
      );
      console.log(response);
      console.log(
        '-- ####################### response #######################################3 ---',
      );

      if (response.data.status === 'success') {
        console.log('success');
        showSuccess(response.data.message);
      } else {
        showError(response.data.message);
      }
      closeModal();
      // Refresh data or perform any other actions needed after successful save
      loadData();
    } catch (error: any) {
      showError('Failed to save item ' + error.data.message);
      console.error('Save Error:', error);
    }
  };
  // (identifier: string, title?: string, content?: string) => void;
  const addData = (identifier: string, title: string, content: string) => {
    console.log(
      ' -- addData -- ' +
      identifier +
      ' - title - ' +
      title +
      ' - content - ' +
      content,
    );

    openModal();
    setContent(content);
    setModalTitle(title);
    setModalIdentifier(identifier);
  };

  const resetData = () => {
    console.log(' -- resetData -- ');
  };

  const saveAllData = () => {
    console.log(' -- saveAllData -- ');
  };

  const refreshData = () => {
    // will call load data again
    console.log(' -- RefreshData ===-- ');
    loadData();
  };

  const modalVisibleChange = (visible: boolean) => {
    setModalVisible(visible);
  };

  const openModal = () => {
    modalVisibleChange(true);
  };

  const closeModal = () => {
    modalVisibleChange(false);
    //wipe out content
    setContent('');
    setModalTitle('');
    setModalIdentifier('');
    setModalItemId('');
  };

  //########################################## data table interaction ##########################################//

  const onRowSelect = (event: DataTableSelectEvent) => {
    console.log(' --- row select ---');
    console.log(event);

    showSuccess('test');
    showInfo('Item selected  ' + event.data.string_data);

    let stringExtract = PodDataExtractor.extractPodTextContent(
      event.data.string_data,
    );

    //extract string, remove html tag
    //remove double .. at the end if exist
    let stringExtracted = stringExtract[0];
    if (stringExtracted.endsWith('..')) {
      stringExtracted = stringExtracted.slice(0, -2);
    }

    //append to both compilation and compilationRaw
    let compilationNew = compilation + ' ' + stringExtracted;
    let compilationRawNew = compilationRaw + ' ' + stringExtracted;

    setCompilation(compilationNew);
    setCompilationRaw(compilationRawNew);

    //re render PanelCompilation
    setPanelCompilationLoading(true);
    setTimeout(() => {
      setPanelCompilationLoading(false);
    }, 3000);
  };

  const onRowUnselect = (event: DataTableUnselectEvent) => {
    console.log(' --- row unselect ---');
    console.log(event);

    showWarn('Item unselected  ' + event.data.string_data);

    let stringExtract = PodDataExtractor.extractPodTextContent(
      event.data.string_data,
    );

    //extract string, remove html tag
    //remove double .. at the end if exist
    let stringExtracted = stringExtract[0];
    if (stringExtracted.endsWith('..')) {
      stringExtracted = stringExtracted.slice(0, -2);
    }
    //search compilation and remove string
    let compilationNew = compilation.replace(stringExtracted, '');
    let compilationRawNew = compilationRaw.replace(stringExtracted, '');

    setCompilation(compilationNew);
    setCompilationRaw(compilationRawNew);

    setPanelCompilationLoading(true);
    setTimeout(() => {
      setPanelCompilationLoading(false);
    }, 3000);
  };

  const expandAll = () => {
    let _expandedRows = {};

    datatable.forEach((p) => (_expandedRows[`${p.id}`] = true));

    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows(null);
  };
  //########################################## data table interaction ##########################################//

  //########################################## button interaction ##########################################//

  /**
   * show confirm dialog for reset
   */
  const confirmReset = () => {
    confirmDialog({
      message: 'Are you sure you want to reset the data?',
      header: 'Reset Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => performReset(),
      reject: () => rejectReset(),
    });
  };

  const rejectReset = () => {
    showWarn('Reset cancelled');
  };

  const performReset = () => {
    //read from local storage and set state to initial
    console.log(' -- performReset -- ');

    let subtheme_pod = localStorage.getItem('subtheme_pod') || '';
    let subtheme_40_summary = localStorage.getItem('subtheme_40_summary') || '';
    let subtheme_raw = localStorage.getItem('subtheme_raw') || '';
    let preselections = JSON.parse(
      localStorage.getItem('preselections') || '[]',
    );

    console.log('-- in local storage --');
    console.log(subtheme_pod, subtheme_40_summary, subtheme_raw, preselections);
    console.log('-- in local storage --');

    const preselectedRows = datatable.filter((row: any) =>
      preselections.includes(row.id),
    );

    setRowsSelected(preselectedRows);

    // Set the states with the retrieved data
    setCompilation(subtheme_pod);
    setSummary40Words(subtheme_40_summary);
    setCompilationRaw(subtheme_raw);
    setSelections(preselections);

    console.log('-- after setting state --');
    console.log(compilation, summary40Words, compilationRaw, selections);
    console.log('-- after setting state --');

    setLoading(true);
    setPanelCompilationLoading(true);
    setPanelPodSummaryLoading(true);

    setTimeout(() => {
      setLoading(false);
      setPanelCompilationLoading(false);
      setPanelPodSummaryLoading(false);
    }, 3000);
    showSuccess('Data successfully reset');
  };

  const editDatatableClick = (journal_id: string) => {
    console.log(' -- editDatatableClick -- ' + journal_id);

    setSelectedJournal(journal_id);
    setModalEditVisible(true);
  };

  const removeDatatableClick = (
    journal_id: string,
    rqConstruct: string,
    id: string,
  ) => {
    console.log(
      ' -- removeDatatableClick -- ' +
      journal_id +
      ' - id - ' +
      id +
      ' - rqConstruct - ' +
      rqConstruct,
    );
  };

  //########################################## button interaction ##########################################//

  const fetchData = async (
    urlData: string,
    projectId: string,
    userId: string,
    rqConstruct: string,
  ) => {
    try {
      const urlB = `${urlData}/${projectId}/${userId}/${rqConstruct}`;
      const dataStep = await dataFetcher(urlB);
      const lib = new dataLibrary(dataStep);

      return {
        summaries: lib.getSummariesByKey(),
        subthemeCount: lib.getSubthemeCount(),
        title: lib.getTitle(),
      };
    } catch (err) {
      console.error('Error in fetchSubtheme:', err);
      throw err; // Rethrow the error so it can be caught in the component
    }
  };

  const showSuccess = (message: string) => {
    (toast.current as Toast | null)?.show({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 3000,
    });
  };

  const showInfo = (message: string) => {
    (toast.current as Toast | null)?.show({
      severity: 'info',
      summary: 'Info',
      detail: message,
      life: 3000,
    });
  };

  const showWarn = (message: string) => {
    (toast.current as Toast | null)?.show({
      severity: 'warn',
      summary: 'Warning',
      detail: message,
      life: 3000,
    });
  };

  const showError = (message: string) => {
    (toast.current as Toast | null)?.show({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 3000,
    });
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <PrimeReactProvider>
      <Toast ref={toast} />
      <EditJournalModal
        label='Edit Journal'
        icon='pi pi-pencil'
        visible={modalEditVisible}
        onHide={() => setModalEditVisible(false)}
        setVisible={setModalEditVisible}
        journalId={selectedJournal}
        projectId={projectId}
        userId={userId}
        onSave={saveData}
      />
      <div className='App'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <span className='panel-title'>
              {STEP_SETTING.TITLE_PART_A.value}
            </span>
          </div>
          <div className='panel-body'>
            <div className='row'>
              <div className='card'>
                <PanelTableBase
                  rqConstruct={rqConstruct}
                  datatable={datatable}
                  rowsSelected={rowsSelected}
                  loading={loading}
                  // Rest of the code...
                  onCheckedChange={onCheckedChange}
                  updateSelections={updateSelections}
                  onRowSelect={onRowSelect}
                  onRowUnselect={onRowUnselect}
                  rowClick={rowClick}
                  setRowClick={setRowClick}
                  editDatatableClick={editDatatableClick}
                  removeDatatableClick={removeDatatableClick}
                  expandedRows={expandedRows}
                  setExpandedRows={setExpandedRows}
                />
              </div>
            </div>
            <div className='row'>
              <div className='card'>
                <Accordion activeIndex={0}>
                  <AccordionTab header='Compilation Raw'>
                    <p className='m-0'>{compilationRaw}</p>
                  </AccordionTab>
                </Accordion>
              </div>
            </div>
            <div className='row'>
              <PanelCompilation
                compilation={compilation}
                loading={panelCompilationLoading}
                showSuccess={showSuccess}
                showError={showError}
              />
            </div>
            <div className='row'>
              <PanelPodSummary
                summary={summary40Words}
                loading={panelPodSummaryLoading}
                showSuccess={showSuccess}
                showError={showError}
              />
            </div>
          </div>
          <div className='panel-footer'>
            <DeleteButton onClick={deletedata} />
            <RefreshButton onClick={refreshData} />
            <ResetButton onClick={confirmReset} />
            <GenerateButton onClick={generate} />
            <SaveButton onClick={savedata} />
            <GoToButton onClick={goto} />
          </div>
        </div>
      </div>
    </PrimeReactProvider>
  );
}

export default App;
