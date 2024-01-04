import { useEffect, useState, useCallback } from "react";
import "./assets/skin/default_skin/css/theme.min.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primeflex/primeflex.css"; // css utility
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css"; // core css
import { STEP_SETTING } from "./constants/step_constants";
import BasePanel from "./ui/components/Panel/BasePanel";
import { Toast } from "primereact/toast";
import React from "react";
import constants from "./constants/constants";
import { dataFetcher } from "./features/dataFetcher";
import dataLibrary from "./features/dataLibrary";
import MaximizableModal from "./ui/components/Modal/MaximizableModal";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import axios from 'axios';
import URL_LINKS from "./constants/urls";

function App() {
  const [data, setData] = useState({});
  const [subthemeCount, setSubthemeCount] = useState(0);
  const [title, setTitle] = useState(STEP_SETTING.TITLE.value);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  {
    /* -- use in modal */
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalIdentifier, setModalIdentifier] = useState("");
  const [modalItemId, setModalItemId] = useState("");

  let urlData = constants.STEP_SEVEN_B.value;

  let projectId = localStorage.getItem("course_id");
  let userId = localStorage.getItem("user_id");
  let rqConstruct = localStorage.getItem("rq_construct");

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

    const urlB = urlData + "/" + projectId + "/" + userId + "/" + rqConstruct;
    try {
      const dataStep = await dataFetcher(urlB);
      const lib = new dataLibrary(dataStep);

      const title = lib.getTitle();
      const subthemeCount = lib.getSubthemeCount();

      setData(lib.getSummariesByKey());
      setSubthemeCount(subthemeCount);
      setTitle(title);
    } catch (err) {
      console.error("Error in fetchSubtheme:", err);
      setError(err.message || "An error occurred"); // Assume setError is a function to update error state
    }

    // Delay for 3 seconds before setting loading to false
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const HtmlContentAlert = ({ html }: { html: string }) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };


  const deleteDataClick = (item_id: string, identifier: string, content:string) => {
    console.log(
      " -- deleteDataClick -- " + item_id + " - identifier - " + identifier + " - content - " + content
    );
    console.log(item_id);

    confirmDialog({
      message: (
        <div>
          <p>Are you sure you want to delete this item? This action cannot be undone.</p>
          <HtmlContentAlert html={content} />
        </div>
      ), 
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => performDelete(item_id, identifier),
      reject: () => showWarn('Delete cancelled')
    });
  };

  const performDelete = async (item_id: string, identifier: string) => {
    try {
      // Replace with your API endpoint and pass necessary data
      const urlDelete = URL_LINKS.DELETE_RESEARCH_FILTER.value + projectId;
      const response = await axios.post(urlDelete + "/" + item_id);
      




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
    content: string
  ) => {
    console.log(
      " -- editDataClick -- " + item_id + " - identifier - " + identifier
    );
    console.log(content);
    console.log(item_id);

    openModal();
    setModalItemId(item_id);
    setModalIdentifier(identifier);
    setContent(content);
    setModalTitle(title);
  };
  const saveData = async (
  ) => {


    console.log(" -- saveData -- " + modalItemId + " - identifier - " + modalIdentifier);
    console.log(modalItemId);

    console.log("########### title ######");
    console.log(modalTitle);
    console.log("########### content ######");
    console.log(content);

    let title = modalTitle;
    let forty_words_summary = content;
    let count_subtheme = subthemeCount;
    let item_identifier = modalIdentifier;
    let course_id = projectId;
    let rq_construct = rqConstruct;
    let user_id = userId;
    let course_type = localStorage.getItem("course_type");

    let URLSAVE = URL_LINKS.SAVE_RESEARCH_FILTER.value + projectId;

    // perform save
      try {
        const response = await axios.post(URLSAVE, {
          title,
          forty_words_summary,
          count_subtheme,
          item_identifier,
          course_id,
          rq_construct,
          user_id,
          course_type,
        });

        console.log('-- response  ---');
        console.log(response);
        console.log('-- response  ---');
        showSuccess('Item successfully saved');
        // Refresh data or perform any other actions needed after successful save
        loadData();
      } catch (error) {
        showError('Failed to save item');
        console.error('Save Error:', error);
      }
    
  };
  // (identifier: string, title?: string, content?: string) => void;
  const addData = (identifier: string, title: string, content: string) => {
    console.log(
      " -- addData -- " +
        identifier +
        " - title - " +
        title +
        " - content - " +
        content
    );

    openModal();
    setContent(content);
    setModalTitle(title);
    setModalIdentifier(identifier);
  };

  const resetData = () => {
    console.log(" -- resetData -- ");
  };

  const saveAllData = () => {
    console.log(" -- saveAllData -- ");
  };

  const refreshData = () => {
    // will call load data again
    console.log(" -- RefreshData ===-- ");
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
    setContent("");
    setModalTitle("");
    setModalIdentifier("");
    setModalItemId("");
  };

  const fetchData = async (
    urlData: string,
    projectId: string,
    userId: string,
    rqConstruct: string
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
      console.error("Error in fetchSubtheme:", err);
      throw err; // Rethrow the error so it can be caught in the component
    }
  };
  //-----------------------------//
  // function for toast messages //
  //-----------------------------//

  const toast = React.useRef(null);

  const showSuccess = (message: string) => {
    (toast.current as Toast | null)?.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };

  const showInfo = (message: string) => {
    (toast.current as Toast | null)?.show({
      severity: "info",
      summary: "Info",
      detail: message,
      life: 3000,
    });
  };

  const showWarn = (message: string) => {
    (toast.current as Toast | null)?.show({
      severity: "warn",
      summary: "Warning",
      detail: message,
      life: 3000,
    });
  };

  const showError = (message: string) => {
    (toast.current as Toast | null)?.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 3000,
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  console.log(" -- data -- ");
  console.log(data);
  console.log(" -- subthemeCount -- ");
  console.log(subthemeCount);
  console.log(" -- title -- ");
  console.log(title);

  return (
    <PrimeReactProvider>
      <div className="App">
        <ConfirmDialog />
        <Toast ref={toast} />
        <MaximizableModal
          modalVisible={modalVisible}
          onEditorChange={handleEditorChange}
          handleTitleChange={handleTitleChange}
          getEditorContent={retrieveEditorContent}
          content={content}
          title={modalTitle}
          item_id={modalItemId}
          identifier={modalIdentifier}
          setModalVisible={openModal}
          saveData={saveData}
          close={closeModal}
        />
        <h1>{STEP_SETTING.TITLE.value}</h1>
        <BasePanel
          data={data}
          subthemeCount={subthemeCount}
          title={title}
          loading={loading}
          deleteDataClick={deleteDataClick}
          editDataClick={editDataClick}
          refreshData={refreshData}
          addData={addData}
          resetData={resetData}
          saveAllData={saveAllData}
          error={error}
        />
      </div>
    </PrimeReactProvider>
  );
}

export default App;
