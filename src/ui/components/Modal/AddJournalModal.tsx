import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import URL_LINKS from '../../../constants/urls';
import { CitationService } from './../../../services/citationService';
import { useFormik } from 'formik';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { InputTextarea } from 'primereact/inputtextarea';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import VideoModal from '../Modal/VideoModal';
import PanelAbstractData from '../Panel/PanelAbstractData';
import ContentDataTable from '../Modal/ContentDataTable';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { Skeleton } from 'primereact/skeleton';

interface Subtheme {
  name: string;
  key: string;
}

import '../../css/loading.css';
import JournalDetailCheckboxesComponent from '../Form/JournalDetailCheckboxesComponent';

import { abstractService } from '../../../services/abstractService';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

interface AddJournalModalProps {
  toast: React.RefObject<Toast>;
  showAddModal: boolean;
  handleAddModalVisible: (showAddModal: boolean) => void;
  projectId: string | null;
  userId: string | null;
  onSave: (journalId: string, projectId: string, journal: any) => void;
  showSuccess: (message: string) => void;
  showWarn: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  subthemeOptions: Subtheme[];
  journalColors: {};
}
interface Subtheme {
  name: string;
  key: string;
}

interface Provider {
  name: string;
  code: string;
}

// --data
/**
 *
         "journal_color": {
            "author_pod_color": "#669999",
            "article_support_study_color": "#3399ff",
            "article_dontsupport_study_color": "#666699",
            "your_pod_color": "#003399"
        },
 */

const providerSelection: Provider[] = [
  { name: 'IEEE', code: 'ieee' },
  { name: 'Springer', code: 'springer' },
  { name: 'Elsevier', code: 'elsevier' },
  { name: 'Pubmed', code: 'pubmed' },
  { name: 'Reset', code: 'reset' },
];

interface Subtheme {
  name: string;
  key: string;
}

interface subtheme {
  name: string;
  key: string;
  construct: string;
}

const AddJournalModal: React.FC<AddJournalModalProps> = ({
  toast,
  showAddModal,
  handleAddModalVisible,
  projectId,
  userId,
  onSave,
  showSuccess,
  showWarn,
  showError,
  showInfo,
  subthemeOptions,
  journalColors,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [panelALoading, setPanelALoading] = useState<boolean>(false);
  const [panelAVisible, setPanelAVisible] = useState<boolean>(false);

  const [panelBLoading, setPanelBLoading] = useState<boolean>(false);
  const [panelBVisible, setPanelBVisible] = useState<boolean>(false);

  const [videoData, setVideoData] = useState<any>(null);

  const [articleTitleInitial, setArticleTitleInitial] = useState('');
  const [authorsInitial, setAuthorsInitial] = useState('');
  const [journalNameInitial, setJournalNameInitial] = useState('');
  const [locationInitial, setLocationInitial] = useState('');
  const [doiInitial, setDoiInitial] = useState('');
  const [yearInitial, setYearInitial] = useState('');
  const [volumeInitial, setVolumeInitial] = useState('');
  const [issueInitial, setIssueInitial] = useState('');
  const [pageInitial, setPageInitial] = useState('');
  const [step06Initial, setStep06Initial] = useState([]);

  const [selectedSubthemesInitial, setSelectedSubthemesInitial] = useState<
    Subtheme[]
  >([]);
  const [journalMetadata, setJournalMetadata] = useState(null);
  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
  const [chooseMetadata, setChooseMetadata] = useState(false);

  const [articleAboutContentInitial, setArticleAboutContentInitial] =
    useState('');
  const [articleAboutPageInitial, setArticleAboutPageInitial] = useState('');
  const [
    articleSupportStudyContentInitial,
    setArticleSupportStudyContentInitial,
  ] = useState('');
  const [articleSupportStudyPageInitial, setArticleSupportStudyPageInitial] =
    useState('');
  const [
    articleDoesNotSupportStudyContentInitial,
    setArticleDoesNotSupportStudyContentInitial,
  ] = useState('');
  const [
    neededSupportStudyContentInitial,
    setNeededSupportStudyContentInitial,
  ] = useState('');
  const [article_title, setArticleTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [journal_name, setJournalName] = useState('');
  const [location, setLocation] = useState('');
  const [doi, setDoi] = useState('');
  const [year, setYear] = useState('');
  const [volume, setVolume] = useState('');
  const [issue, setIssue] = useState('');
  const [page, setPage] = useState('');
  const [step06, setStep06] = useState([]);
  const [article_about_content, setArticleAboutContent] = useState('');
  const [article_about_page, setArticleAboutPage] = useState('');
  const [article_support_study_content, setArticleSupportStudyContent] =
    useState('');
  const [article_support_study_page, setArticleSupportStudyPage] = useState('');
  const [
    article_does_not_support_study_content,
    setArticleDoesNotSupportStudyContent,
  ] = useState('');
  const [needed_support_study_content, setNeededSupportStudyContent] =
    useState('');

  const [authorPodColor, setAuthorPodColor] = useState(
    journalColors.author_pod_color,
  );
  const [articleSupportStudyColor, setArticleSupportStudyColor] = useState(
    journalColors.article_support_study_color,
  );
  const [articleDoesNotSupportStudyColor, setArticleDoesNotSupportStudyColor] =
    useState(journalColors.article_dontsupport_study_color);
  const [neededSupportStudyColor, setNeededSupportStudyColor] = useState(
    journalColors.your_pod_color,
  );
  const [panelVisible, setPanelVisible] = useState<boolean>(false);
  const [panelAbstractLoading, setPanelAbstractLoading] =
    useState<boolean>(false);
  const [panelAbstractData, setPanelAbstractData] = useState<any>(null);

  const [selectedSubthemes, setSelectedSubthemes] = useState([0]);
  const [loadingMetadata, setLoadingMetadata] = useState<boolean>(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );

  const [modalVideoVisible, setModalVideoVisible] = useState(false);

  const selected = [0];

  const onCategoryChange = (e: CheckboxChangeEvent) => {
    console.log('--- checkboxchangeevent');

    console.log(e);

    let _selectedSubthemes = [...selectedSubthemes];

    if (e.checked) _selectedSubthemes.push(e.value);
    else
      _selectedSubthemes = _selectedSubthemes.filter(
        (subtheme) => subtheme.key !== e.value.key,
      );
    console.log('--- _selectedSubthemes');

    console.log(_selectedSubthemes);
    console.log('--- _selectedSubthemes');

    setSelectedSubthemes(_selectedSubthemes);
  };

  {
    /**
  video handling
*/
  }

  const getVideoData = async (videoId: string) => {};

  const callVideo = () => {};

  //##################################################################################
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      article_title: article_title,
      authors: authors,
      journal_name: journal_name,
      location: location,
      doi: doi,
      year: year,
      volume: volume,
      issue: issue,
      page: page,
      step06: step06,
      article_about_content: article_about_content,
      article_about_page: article_about_page,
      article_support_study_content: article_support_study_content,
      article_support_study_page: article_support_study_page,
      article_does_not_support_study_content:
        article_does_not_support_study_content,
      needed_support_study_content: needed_support_study_content,
    },

    validate: (values) => {
      const errors: any = {};
      // Add validation logic here

      //doi is optional but if has value need to check if doi exists
      if (values.doi && values.doi !== '') {
        let existsDoi: any;
        //1 check if doi exists
        // existsDoi = checkDOI(values.doi);
        // console.log('exists ==============', existsDoi);
        // if (!existsDoi) {
        //   errors.value = 'DOI does not exist';
        // }

        return true;
      }

      //authors is required
      if (!values.authors) {
        errors.authors = 'Authors Name Required';
      }

      // Authors name can only be separated by commas
      if (values.authors) {
        const authorsArray = values.authors
          .split(',')
          .map((author: string) => author.trim());
        const invalidAuthors = authorsArray.filter(
          (authors: string) => !/^[a-zA-Z\s]+$/.exec(authors),
        );

        if (invalidAuthors.length > 0) {
          errors.authors =
            'Authors Name Cannot be separated by characters other than comma';
        }
      }
      //article_title is required
      if (!values.article_title) {
        errors.article_title = 'Article Title Required';
      }

      //year is required
      if (!values.year) {
        errors.year = 'Year Required';
      }

      //validate year is number format YYYY
      if (values.year) {
        const year = values.year;
        if (!/^\d{4}$/.test(year)) {
          errors.year = 'Year must be in YYYY format';
        }
      }

      // YEAR must be between - the year internet existed and current year
      if (values.year) {
        const year = Number(values.year);
        const currentYear = new Date().getFullYear();
        if (year < 1990 || year > currentYear) {
          errors.year = 'Year must be between 1990 and current year';
        }
      }

      if (!values.step06) {
        errors.step06 = 'This is required.';
      }

      if (!values.article_about_content) {
        errors.article_about_content = 'This is required.';
      }

      if (!values.article_about_page) {
        errors.article_about_page = 'This is required.';
      }

      if (!values.article_support_study_content) {
        errors.article_support_study_content = 'This is required.';
      }

      if (!values.article_support_study_page) {
        errors.article_support_study_page = 'This is required.';
      }

      if (!values.article_does_not_support_study_content) {
        errors.article_does_not_support_study_content = 'This is required.';
      }

      if (!values.needed_support_study_content) {
        errors.needed_support_study_content = 'This is required.';
      }

      // Add other validation rules as needed
      return errors;
    },
    onSubmit: (values) => {
      console.log('---- values submit ---');

      console.log(values);
      console.log('---- values submit ---');

      formik.resetForm();
    },
  });

  const isFormFieldInvalid = (name: any) =>
    !!(
      formik.touched[name as keyof typeof formik.touched] &&
      formik.errors[name as keyof typeof formik.errors]
    );

  const getFormErrorMessage = (name: any) => {
    return isFormFieldInvalid(name) ? (
      <small className='p-error'>{formik.errors[name]}</small>
    ) : null;
  };

  const confirmDialogMetadata = () => {
    let doi = formik.values.doi;

    console.log(' -- confirm dialog metadata --');
    console.log(doi);
    console.log(' -- confirm dialog metadata --');

    if (!doi) {
      showWarn('DOI is required');
      return;
    }

    // Retrieve metadata
    const url = `${URL_LINKS.FETCH_METADATA.value}`;
    const csrfToken = localStorage.getItem('csrfToken');
    axios
      .post(url, {
        doi: doi,
        csrfToken: csrfToken,
      })
      .then((response) => {
        if (response.data.status === 'success') {
          // Ensure the data structure of response is as expected
          let data = response.data.data;

          // Instead of calling confirmDialog directly, set state here
          setJournalMetadata(data);
          setIsConfirmDialogVisible(true); // This state will be used to control the visibility of the dialog
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        showWarn('Error fetching metadata');
      });
  };

  //##################################################################################

  const formikManipulation = (
    conditions: string,
    citationStrings: string[],
    fetchedMetadata: any,
  ) => {
    switch (conditions) {
      case 'onLoad':
        setFormikValueOnLoad();

        break;
      case 'onReset':
        setFormikValueOnReset();
        break;
      case 'onClear':
        setFormikValueOnClear();
        break;

      case 'onMetadata':
        setFormikValueOnMetadata(fetchedMetadata);
        break;

      case 'onTemplate':
        setFormikValueOnTemplate(citationStrings);
        break;

      default:
        break;
    }
  };

  const acceptTemplate = () => {
    setPanelBLoading(true);
    insertTemplate();
    showInfo('Success insert template');
  };

  const reject = () => {
    showWarn('Canceled action');
  };

  const confirmTemplate = () => {
    confirmDialog({
      message: 'Are you sure you want to insert template?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept: () => acceptTemplate(),
      reject: () => reject(),
    });
  };
  /**
   *
   * handling
   */
  const insertTemplate = () => {
    let authorString = formik.values.authors;
    let year = formik.values.year;
    let doi = formik.values.doi;

    if (!authorString) {
      showError('Author is required');
    }

    if (!year) {
      showError('Year is required');
    }

    //retrigger the useEfect

    handleInsertTemplate(authorString, year, doi);
  };

  const onCancel = () => {
    formik.resetForm();
    showWarn('Form has been reset');
    //CLOSE MODAL
    handleAddModalVisible(false);
  };

  const confirmClearForm = () => {
    formik.resetForm();
    showInfo('Form has been cleared');
  };

  const handleDropDown = (e: DropdownChangeEvent) => {
    console.log('--- value ---');
    console.log(e.value);
    console.log('--- value ---');
    if (e.value.code === 'reset') {
      setSelectedProvider(null);
    } else {
      setSelectedProvider(e.value);
    }
  };

  /**
   * Set formik values on load
   * - this set the values of formik to the values of the state
   * @returns void
   */
  const setFormikValueOnLoad = () => {
    formik.setFieldValue('article_title', '');
    formik.setFieldValue('authors', '');
    formik.setFieldValue('journal_name', '');
    formik.setFieldValue('location', '');
    formik.setFieldValue('doi', '');
    formik.setFieldValue('year', '');
    formik.setFieldValue('volume', '');
    formik.setFieldValue('issue', '');
    formik.setFieldValue('page', '');
    formik.setFieldValue('step06', '');
    formik.setFieldValue('article_about_content', '');
    formik.setFieldValue('article_about_page', '');
    formik.setFieldValue('article_support_study_content', '');
    formik.setFieldValue('article_support_study_page', '');
    formik.setFieldValue('article_does_not_support_study_content', '');
    formik.setFieldValue('needed_support_study_content', '');
  };

  //this function set formik value back to initial value retrieved
  const setFormikValueOnReset = () => {
    formik.setFieldValue('article_title', articleTitleInitial);
    formik.setFieldValue('authors', authorsInitial);
    formik.setFieldValue('journal_name', journalNameInitial);
    formik.setFieldValue('location', locationInitial);
    formik.setFieldValue('doi', doiInitial);
    formik.setFieldValue('year', yearInitial);
    formik.setFieldValue('volume', volumeInitial);
    formik.setFieldValue('issue', issueInitial);
    formik.setFieldValue('page', pageInitial);
    formik.setFieldValue('step06', step06Initial);
    formik.setFieldValue('article_about_content', articleAboutContentInitial);
    formik.setFieldValue('article_about_page', articleAboutPageInitial);
    formik.setFieldValue(
      'article_support_study_content',
      articleSupportStudyContentInitial,
    );
    formik.setFieldValue(
      'article_support_study_page',
      articleSupportStudyPageInitial,
    );
    formik.setFieldValue(
      'article_does_not_support_study_content',
      articleDoesNotSupportStudyContentInitial,
    );

    formik.setFieldValue(
      'needed_support_study_content',
      neededSupportStudyContentInitial,
    );
  };

  //this will clear fields
  const setFormikValueOnClear = () => {
    formik.setFieldValue('article_title', '');
    formik.setFieldValue('authors', '');
    formik.setFieldValue('journal_name', '');
    formik.setFieldValue('location', '');
    formik.setFieldValue('doi', '');
    formik.setFieldValue('year', '');
    formik.setFieldValue('volume', '');
    formik.setFieldValue('issue', '');
    formik.setFieldValue('page', '');
    formik.setFieldValue('step06', '');
    formik.setFieldValue('article_about_content', '');
    formik.setFieldValue('article_about_page', '');
    formik.setFieldValue('article_support_study_content', '');
    formik.setFieldValue('article_support_study_page', '');
    formik.setFieldValue('article_does_not_support_study_content', '');
    formik.setFieldValue('needed_support_study_content', '');
  };

  //this will populate metadata and clear form part b
  const setFormikValueOnMetadata = (journalMetadata: any) => {
    const metadataObj = (
      journalMetadata ? (journalMetadata as any[]) : []
    ).reduce(
      (obj: { [x: string]: any }, item: { category: string; data: any }) => {
        obj[item.category.toLowerCase()] = item.data; // Use lowercase for keys
        return obj;
      },
      {},
    );

    // Update Panel A Data
    setArticleTitle(metadataObj['title']);
    setAuthors(metadataObj['authors']);
    setJournalName(metadataObj['journal']);
    setLocation(metadataObj['location']);
    setDoi(metadataObj.url ? metadataObj['url'].split('doi.org/')[1] : '');
    setYear(metadataObj.year ? metadataObj['year'].toString() : '');
    setVolume(metadataObj['volume']);
    setIssue(metadataObj['issue']);
    setPage(metadataObj['page']);

    // Update Panel B Data
    setStep06([]);
    setArticleAboutContent('');
    setArticleAboutPage('');
    setArticleSupportStudyContent('');
    setArticleSupportStudyPage('');
    setArticleDoesNotSupportStudyContent('');
    setNeededSupportStudyContent('');

    setSelectedSubthemes([0]);

    formik.setFieldValue('article_title', metadataObj.title);
    formik.setFieldValue('authors', metadataObj.authors);
    formik.setFieldValue('journal_name', metadataObj.journal);
    formik.setFieldValue('location', metadataObj.location);
    formik.setFieldValue('doi', metadataObj.doi);
    formik.setFieldValue('year', metadataObj.year);
    formik.setFieldValue('volume', metadataObj.volume);
    formik.setFieldValue('issue', metadataObj.issue);
    formik.setFieldValue('page', metadataObj.page);
    formik.setFieldValue('step06', metadataObj.step06);
    formik.setFieldValue('article_about_content', '');
    formik.setFieldValue('article_about_page', '');
    formik.setFieldValue('article_support_study_content', '');
    formik.setFieldValue('article_support_study_page', '');
  };

  {
    /* for interaction, button insert template  */
  }
  const handleInsertTemplate = (
    authorString: string,
    year: string,
    doi: string,
  ) => {
    setPanelBLoading(true); // Start loading animation

    // Fetch metadata if not available and then proceed
    if (!journalMetadata) {
      fetchMetadata(doi).then((fetchedMetadata) => {
        continueWithTemplateInsertion(fetchedMetadata, authorString, year, doi);
      });
    } else {
      continueWithTemplateInsertion(journalMetadata, authorString, year, doi);
    }
  };

  const fetchMetadata = async (doi: string) => {
    const url = `${URL_LINKS.FETCH_METADATA.value}`;
    try {
      const response = await axios.post(url, { doi });
      if (response.data.status === 'success') {
        return response.data.data;
      }
    } catch (error) {
      console.error('Error fetching metadata:', error);
      showWarn('Error fetching metadata');
    }
    return null;
  };

  const continueWithTemplateInsertion = (
    metadata: any[],
    authorString: string,
    year: string,
    doi: string,
  ) => {
    // Process metadata and generate citation strings
    const { citationStrings, metadataAuthor, metadataYear } = processMetadata(
      metadata,
      authorString,
      year,
    );

    if (!metadataAuthor || !metadataYear) {
      showWarn('Author and year are required from metadata.');
      setPanelBLoading(false); // Stop loading animation
      return;
    }
    setTimeout(() => {
      // Sequentially set new content with delays
      setArticleAboutContent(citationStrings[0]);
      setTimeout(() => setArticleSupportStudyContent(citationStrings[1]), 1000);
      setArticleDoesNotSupportStudyContent(citationStrings[2]);

      setNeededSupportStudyContent(citationStrings[3]);

      formikManipulation('onTemplate', [], citationStrings);

      setPanelBLoading(false); // Stop loading animation
      showInfo('Template inserted successfully');
    }, 3000);
  };

  const processMetadata = (metadata: any[], authorString: any, year: any) => {
    const metadataObj = metadata.reduce(
      (obj, item) => ({ ...obj, [item.category.toLowerCase()]: item.data }),
      {},
    );
    const metadataAuthor = authorString || metadataObj.authors;
    const metadataYear = year || metadataObj.year;

    const authorsObj = CitationService.parseAuthors(metadataAuthor);

    console.log('--- authors object ---');
    console.log(authorsObj);
    const inTextCitation = CitationService.generateInTextCitation(
      authorsObj,
      parseInt(metadataYear),
      doi,
    );

    const citationStrings = [
      `${inTextCitation} states that`,
      `${inTextCitation} highlighted on`,
      `However ${inTextCitation} only focused on`,
      `Therefore based on ${inTextCitation} my study will focus on`,
    ];

    return { citationStrings, metadataAuthor, metadataYear };
  };

  const setFormikValueOnTemplate = (citationStrings: string[]) => {
    formik.setFieldValue('article_about_content', citationStrings[0]);
    formik.setFieldValue('article_support_study_content', citationStrings[1]);
    formik.setFieldValue(
      'article_does_not_support_study_content',
      citationStrings[2],
    );
    formik.setFieldValue('needed_support_study_content', citationStrings[3]);
  };

  {
    /* for interaction, button insert template  */
  }

  //--------------- handle metadata ----------------------------
  const ProcessUseMetadata = (doi: string) => {
    // Start loading animations for both panels
    setPanelALoading(true);
    setPanelBLoading(true);

    if (!journalMetadata) {
      //load metadata back
      //get metadata
      const url = `${URL_LINKS.FETCH_METADATA.value}`;
      axios.post(url, { doi: doi }).then((response) => {
        if (response.data.status === 'success') {
          // Ensure the data structure of response is as expected
          let data = response.data.data;

          // Instead of calling confirmDialog directly, set state here
          setJournalMetadata(data);
        }
      });
    }

    setTimeout(() => {
      formikManipulation('onMetadata', [], journalMetadata);
      setPanelALoading(false);
      setPanelBLoading(false);
    }, 3000); // 3000 milliseconds = 3 seconds
  };
  const retrieveAbstract = (doi: string, provider: string) => {
    const url = `${URL_LINKS.FETCH_ABSTRACT.value}`;
    setPanelVisible(true);
    setPanelAbstractLoading(true);

    axios
      .post(url, {
        doi: doi,
        keyidentifier: provider,
      })
      .then((response) => {
        if (response.status === 200) {
          //data.abstract
          setPanelAbstractData(response.data.data.abstract);
        } else {
          showWarn('Error fetching abstract');
        }
      })
      .catch((error: any) => {
        console.error('Error fetching data:', error);

        showWarn('Error fetching abstract');
      });

    setPanelAbstractLoading(false);
  };

  const retrieveVideo = (key: string, userId: string) => {
    const url = `${URL_LINKS.FETCH_USER_VIDEO.value}${userId}/${key}`;
    axios
      .get(url)
      .then((response) => {
        setVideoData(response.data.data);
      })
      .catch((error: any) => {
        console.error('Error fetching data:', error);

        showWarn('Error fetching video');
      });
  };

  const resetAllDataInFieldsToInitial = () => {
    setArticleTitle(articleTitleInitial);
    setAuthors(authorsInitial);
    setJournalName(journalNameInitial);
    setLocation(locationInitial);
    setDoi(doiInitial);
    setYear(yearInitial);
    setVolume(volumeInitial);
    setIssue(issueInitial);
    setPage(pageInitial);
    setStep06(step06Initial);
    setArticleAboutContent(articleAboutContentInitial);
    setArticleAboutPage(articleAboutPageInitial);
    setArticleSupportStudyContent(articleSupportStudyContentInitial);
    setArticleSupportStudyPage(articleSupportStudyPageInitial);
    setArticleDoesNotSupportStudyContent(
      articleDoesNotSupportStudyContentInitial,
    );
    setNeededSupportStudyContent(neededSupportStudyContentInitial);
    setSelectedSubthemes(selectedSubthemesInitial);

    formikManipulation('onReset', [], null);
  };

  const resetAllDataInFields = () => {
    console.log('resetAllDataInFields');
    setLoading(true);
    setArticleTitle('');
    setAuthors('');
    setJournalName('');
    setLocation('');
    setDoi('');
    setYear('');
    setVolume('');
    setIssue('');
    setPage('');
    setStep06([]);
    setArticleAboutContent('');
    setArticleAboutPage('');
    setArticleSupportStudyContent('');
    setArticleSupportStudyPage('');
    setArticleDoesNotSupportStudyContent('');
    setNeededSupportStudyContent('');

    setSelectedSubthemes([0]);

    formikManipulation('onClear', [], null);
    setLoading(false);
  };

  useEffect(() => {
    if (!showAddModal) {
      //Wipe all state values
      resetAllDataInFields();
      return;
    }
    if (chooseMetadata && doi) {
      ProcessUseMetadata(doi);
    }
  }, [showAddModal, projectId, userId]); // Add dependencies here
  return (
    <div className='card flex'>
      {loading ? (
        <Dialog
          header='Journal Details'
          visible={showAddModal}
          style={{ width: '50vw' }}
          onHide={() => handleAddModalVisible(false)}
          maximizable={true}
        >
          <div className='panel-body'>
            <div className='container'>
              <div className='loading-spinner'></div>
            </div>
          </div>
        </Dialog>
      ) : (
        <Dialog
          header='Journal Details'
          visible={showAddModal}
          style={{ width: '50vw' }}
          onHide={() => handleAddModalVisible(false)}
          maximizable={true}
        >
          <>
            <ConfirmDialog />
            {isConfirmDialogVisible && (
              <ConfirmDialog
                visible={isConfirmDialogVisible}
                onHide={() => setIsConfirmDialogVisible(false)}
                content={
                  journalMetadata && (
                    <ContentDataTable
                      journalMetadata={journalMetadata}
                      setChooseMetadata={setChooseMetadata}
                      setIsConfirmDialogVisible={setIsConfirmDialogVisible}
                      setPanelALoading={setPanelALoading}
                      formikManipulation={formikManipulation}
                    />
                  )
                }
              />
            )}
            <form
              onSubmit={formik.handleSubmit}
              className='flex flex-column gap-2'
            >
              <Toast ref={toast} />
              <VideoModal
                videoData={videoData}
                modalVideoVisible={modalVideoVisible}
                setModalVideoVisible={setModalVideoVisible}
              />
              {/* Repeat the following pattern for each field */}

              {/** button set start */}
              <div className='card flex flex-wrap gap-3'>
                <Button
                  label='Video'
                  severity='info'
                  icon='pi pi-video'
                  onClick={() => callVideo()}
                />
                <Button
                  label='Retrieve Abstract'
                  icon='pi pi-check'
                  loading={loadingMetadata}
                  onClick={() =>
                    abstractService.retrieveAbstractData(formik.values.doi)
                  }
                  severity='success'
                />
                <div className='card flex justify-content-center'>
                  <Dropdown
                    value={selectedProvider}
                    onChange={handleDropDown}
                    options={providerSelection}
                    optionLabel='name'
                    placeholder='Select a Provider'
                    className='w-full md:w-14rem'
                  />
                </div>
              </div>
              {/** button set end */}
              <span className='p-float-label'>
                <InputText
                  id='doi'
                  name='doi'
                  value={formik.values.doi}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={classNames({
                    'p-invalid': isFormFieldInvalid('doi'),
                  })}
                />
                <label htmlFor='doi'>DOI</label>{' '}
                <Button
                  type='button'
                  label='Retrieve Metadata'
                  onClick={() => confirmDialogMetadata()}
                  severity='danger'
                />
              </span>

              {panelALoading ? (
                <Skeleton width='100%' height='150px'></Skeleton>
              ) : (
                <div className='flex flex-column gap-2'>
                  <label htmlFor='authors'>Authors</label>
                  <InputText
                    id='authors'
                    aria-describedby='authors-help'
                    value={formik.values.authors}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      formik.setFieldValue('authors', e.target.value);
                    }}
                    className={classNames({
                      'p-invalid': isFormFieldInvalid('article_title'),
                    })}
                  />
                  {getFormErrorMessage('authors')}

                  <small id='username-help'>Enter article authors.</small>
                </div>
              )}

              {panelALoading ? (
                <Skeleton width='100%' height='150px'></Skeleton>
              ) : (
                <div className='flex flex-column gap-2'>
                  <label htmlFor='article_title'>Article Title</label>
                  <InputText
                    id='article_title'
                    aria-describedby='article_title-help'
                    value={formik.values.article_title}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      formik.setFieldValue('article_title', e.target.value);
                    }}
                    className={classNames({
                      'p-invalid': isFormFieldInvalid('article_title'),
                    })}
                  />
                  {getFormErrorMessage('article_title')}

                  <small id='username-help'>Enter article title.</small>
                </div>
              )}

              {panelALoading ? (
                <Skeleton width='100%' height='150px'></Skeleton>
              ) : (
                <div className='flex flex-column gap-2'>
                  <label htmlFor='year'>Article Published Year</label>
                  <InputText
                    id='year'
                    aria-describedby='year-help'
                    value={formik.values.year}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      formik.setFieldValue('year', e.target.value);
                    }}
                    className={classNames({
                      'p-invalid': isFormFieldInvalid('year'),
                    })}
                  />
                  {getFormErrorMessage('year')}

                  <small id='year-help'>Enter article published year.</small>
                </div>
              )}
              {panelALoading ? (
                <Skeleton width='100%' height='150px'></Skeleton>
              ) : (
                <div className='flex flex-column gap-2'>
                  <label htmlFor='journal_name'>Journal Name</label>
                  <InputText
                    id='journal_name'
                    aria-describedby='journal_name-help'
                    value={formik.values.journal_name}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      formik.setFieldValue('journal_name', e.target.value);
                    }}
                    className={classNames({
                      'p-invalid': isFormFieldInvalid('journal_name'),
                    })}
                  />
                  {getFormErrorMessage('journal_name')}

                  <small id='year-help'>Enter Journal Name.</small>
                </div>
              )}
              {panelALoading ? (
                <Skeleton width='100%' height='150px'></Skeleton>
              ) : (
                <div className='flex flex-column gap-2'>
                  <label htmlFor='location'>Journal location</label>
                  <InputText
                    id='location'
                    aria-describedby='location-help'
                    value={formik.values.location}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      formik.setFieldValue('location', e.target.value);
                    }}
                    className={classNames({
                      'p-invalid': isFormFieldInvalid('location'),
                    })}
                  />
                  {getFormErrorMessage('location')}

                  <small id='year-help'>Enter Journal Location.</small>
                </div>
              )}

              {panelALoading ? (
                <Skeleton width='100%' height='150px'></Skeleton>
              ) : (
                <div className='flex flex-column gap-2'>
                  <label htmlFor='volume'>Volume</label>
                  <InputText
                    id='volume'
                    aria-describedby='volume-help'
                    value={formik.values.volume}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      formik.setFieldValue('volume', e.target.value);
                    }}
                    className={classNames({
                      'p-invalid': isFormFieldInvalid('volume'),
                    })}
                  />
                  {getFormErrorMessage('volume')}

                  <small id='volume-help'>Enter Journal Volume.</small>
                </div>
              )}
              {panelALoading ? (
                <Skeleton width='100%' height='150px'></Skeleton>
              ) : (
                <div className='flex flex-column gap-2'>
                  <label htmlFor='issue'>Issue</label>
                  <InputText
                    id='issue'
                    aria-describedby='issue-help'
                    value={formik.values.issue}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      formik.setFieldValue('issue', e.target.value);
                    }}
                    className={classNames({
                      'p-invalid': isFormFieldInvalid('issue'),
                    })}
                  />
                  {getFormErrorMessage('issue')}

                  <small id='issue-help'>Enter Journal Issue.</small>
                </div>
              )}

              {panelALoading ? (
                <Skeleton width='100%' height='150px'></Skeleton>
              ) : (
                <div className='flex flex-column gap-2'>
                  <label htmlFor='pages'>Pages</label>
                  <InputText
                    id='pages'
                    aria-describedby='issue-pages'
                    value={formik.values.page}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      formik.setFieldValue('pages', e.target.value);
                    }}
                    className={classNames({
                      'p-invalid': isFormFieldInvalid('pages'),
                    })}
                  />
                  {getFormErrorMessage('pages')}

                  <small id='issue-help'>Enter Journal Pages.</small>
                </div>
              )}
              <div className='card flex flex-wrap justify-content-left gap-4'>
                <Button
                  label='Insert Template'
                  severity='info'
                  onClick={() => confirmTemplate()}
                />
              </div>
              <Divider />
              <PanelAbstractData
                panelVisible={panelVisible}
                dataLoading={panelAbstractLoading}
                dataAbstract={panelAbstractData}
                dataDoi={formik.values.doi}
              />

              <Splitter style={{ height: '600px' }}>
                <SplitterPanel
                  className='flex flex-column'
                  size={60}
                  minSize={60}
                >
                  {panelBLoading ? (
                    <Skeleton width='100%' height='150px'></Skeleton>
                  ) : (
                    <>
                      <label htmlFor='description'>
                        What is the article about and authors's point of
                        departure ?
                      </label>
                      <InputTextarea
                        id='article_about_content'
                        name='article_about_content'
                        rows={4}
                        cols={30}
                        style={{
                          color: authorPodColor,
                          borderColor: authorPodColor,
                        }}
                        className={classNames({
                          'p-invalid': isFormFieldInvalid(
                            'article_about_content',
                          ),
                        })}
                        value={formik.values.article_about_content}
                        onChange={(e) => {
                          formik.setFieldValue(
                            'article_about_content',
                            e.target.value,
                          );
                        }}
                      />
                      {getFormErrorMessage('article_about_content')}
                    </>
                  )}
                  {panelBLoading ? (
                    <Skeleton width='100%' height='150px'></Skeleton>
                  ) : (
                    <>
                      <label htmlFor='description'>
                        How the article support your study ?
                      </label>

                      <InputTextarea
                        id='article_support_study_content'
                        name='article_support_study_content'
                        rows={4}
                        cols={30}
                        className={classNames({
                          'p-invalid': isFormFieldInvalid(
                            'article_support_study_content',
                          ),
                        })}
                        value={formik.values.article_support_study_content}
                        style={{
                          color: articleSupportStudyColor,
                          borderColor: articleSupportStudyColor,
                        }}
                        onChange={(e) => {
                          formik.setFieldValue(
                            'article_support_study_content',
                            e.target.value,
                          );
                        }}
                      />
                      {getFormErrorMessage('article_support_study_content')}
                    </>
                  )}
                  ;
                  {panelBLoading ? (
                    <Skeleton width='100%' height='150px'></Skeleton>
                  ) : (
                    <>
                      <label htmlFor='description'>
                        How the article does not support your study ?
                      </label>
                      <InputTextarea
                        id='article_does_not_support_study_content'
                        name='article_does_not_support_study_content'
                        rows={4}
                        cols={30}
                        style={{
                          color: articleDoesNotSupportStudyColor,
                          borderColor: articleDoesNotSupportStudyColor,
                        }}
                        className={classNames({
                          'p-invalid': isFormFieldInvalid(
                            'article_does_not_support_study_content',
                          ),
                        })}
                        value={
                          formik.values.article_does_not_support_study_content
                        }
                        onChange={(e) => {
                          formik.setFieldValue(
                            'article_does_not_support_study_content',
                            e.target.value,
                          );
                        }}
                      />
                      {getFormErrorMessage(
                        'article_does_not_support_study_content',
                      )}
                    </>
                  )}
                  {panelBLoading ? (
                    <Skeleton width='100%' height='150px'></Skeleton>
                  ) : (
                    <>
                      <label htmlFor='description'>
                        What else is needed to support your study ? (Your POD)
                      </label>
                      <InputTextarea
                        id='needed_support_study_content'
                        name='needed_support_study_content'
                        rows={4}
                        cols={30}
                        style={{
                          color: neededSupportStudyColor,
                          borderColor: neededSupportStudyColor,
                        }}
                        className={classNames({
                          'p-invalid': isFormFieldInvalid(
                            'needed_support_study_content',
                          ),
                        })}
                        value={formik.values.needed_support_study_content}
                        onChange={(e) => {
                          formik.setFieldValue(
                            'needed_support_study_content',
                            e.target.value,
                          );
                        }}
                      />
                      {getFormErrorMessage('needed_support_study_content')}
                    </>
                  )}
                </SplitterPanel>
                <SplitterPanel
                  className='flex justify-content-left'
                  size={20}
                  minSize={10}
                >
                  <Card>
                    <label htmlFor='article_about_page'>Page</label>
                    <div className='card flex justify-content-center'>
                      <InputText
                        name='article_about_page'
                        value={formik.values.article_about_page}
                        onChange={() => {}}
                      />

                      {getFormErrorMessage('article_about_page')}
                    </div>

                    <label htmlFor='article_support_study_page'>Page</label>

                    <div className='card flex justify-content-center'>
                      <InputText
                        name='article_support_study_page'
                        value={formik.values.article_support_study_page}
                        onChange={(
                          e: React.ChangeEvent<HTMLInputElement>,
                        ) => {}}
                      />

                      {getFormErrorMessage('article_support_study_page')}
                    </div>
                  </Card>
                </SplitterPanel>

                <SplitterPanel className='flex justify-content-left' size={20}>
                  <JournalDetailCheckboxesComponent
                    subthemeSelections={subthemeOptions}
                    selected={selected}
                    onCategoryChange={onCategoryChange}
                  />
                </SplitterPanel>
              </Splitter>

              {getFormErrorMessage('doi')}
              {/* Continue for other fields */}
              <div className='card flex flex-wrap gap-3'>
                <Button type='submit' label='Submit' severity='success' />
                <Button
                  type='reset'
                  label='Reset'
                  onClick={resetAllDataInFieldsToInitial}
                  severity='warning'
                />
                <Button
                  type='button'
                  label='Cancel'
                  onClick={onCancel}
                  severity='secondary'
                />
                <Button
                  type='button'
                  label='Clear Form'
                  onClick={confirmClearForm}
                  severity='danger'
                />
              </div>
            </form>
          </>
        </Dialog>
      )}
    </div>
  );
};

export default AddJournalModal;
