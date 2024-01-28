import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import JournalDetailsComponent from '../Form/JournalDetailComponent';
import URL_LINKS from '../../../constants/urls';
import {
  generateInTextCitation,
  parseAuthors,
} from '../../../functions/app/Citations';
import { useFormik } from 'formik';

import '../../css/loading.css';

interface EditJournalModalProps {
  label: string;
  icon: string;
  visible: boolean;
  onHide: () => void;
  setVisible: (visible: boolean) => void;
  journalId: string;
  projectId: string;
  userId: string;
  onSave: (journalId: string, projectId: string, journal: any) => void;
  onRemove: (journalId: string, projectId: string, rqConstruct: string) => void;
  showSuccess: (message: string) => void;
  showWarn: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
}
/**
 * Visibles edit journal modal
 * @param {
 *   visible,
 *   setVisible,
 *   journalId,
 *   projectId,
 *   userId,
 *   onSave,
 *   showSuccess,
 *   showWarn,
 *   showError,
 *   showInfo,
 * }
 * @returns
 */
const EditJournalModal: React.FC<EditJournalModalProps> = ({
  visible,
  setVisible,
  journalId,
  projectId,
  userId,
  onSave,
  showSuccess,
  showWarn,
  showError,
  showInfo,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [journalData, setJournalData] = useState<any>(null);
  const [journalDataInitial, setJournalDataInitial] = useState<any>(null);
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
  const [panelBLoading, setPanelBLoading] = useState<boolean>(false);
  const [panelBVisible, setPanelBVisible] = useState<boolean>(false);
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

  const [subthemeSelections, setSubthemeSelections] = useState([]);
  const [selectedSubthemes, setSelectedSubthemes] = useState<Subtheme[]>([]);

  const [authorPodColor, setAuthorPodColor] = useState('');
  const [articleSupportStudyColor, setArticleSupportStudyColor] = useState('');
  const [articleDoesNotSupportStudyColor, setArticleDoesNotSupportStudyColor] =
    useState('');
  const [neededSupportStudyColor, setNeededSupportStudyColor] = useState('');
  const [panelALoading, setPanelALoading] = useState<boolean>(false);
  const [panelAVisible, setPanelAVisible] = useState<boolean>(false);

  const [panelVisible, setPanelVisible] = useState<boolean>(false);
  const [panelAbstractLoading, setPanelAbstractLoading] =
    useState<boolean>(false);
  const [panelAbstractData, setPanelAbstractData] = useState<any>(null);

  //##################################################################################
  const formik = useFormik({

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
      article_does_not_support_study_content: article_does_not_support_study_content,
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

  const checkDOI = async (doi: string): Promise<boolean> => {
    const url = `https://doi.org/${doi}`;
    try {
      const response = await fetch(url, { method: 'HEAD' });

      //if fetch failed return false
      if (!response.ok) {
        return false;
      }
      //if redirect return false
      if (response.redirected) {
        return false;
      }

      if (response.status === 404) {
        return false;
      } else if (response.status === 200) {
        return true;
      }
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };
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
  //##################################################################################

  const refreshFormContent = () => {

    loadData();
    //trigger formik reload
  };

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

  /**
   *
   * handling
   */
  const insertTemplate = () => {
    let authorString = formik.values.authors;
    let year = formik.values.year;

    if (!authorString) {
      showError('Author is required');
    }

    if (!year) {
      showError('Year is required');
    }

    //retrigger the useEfect

    handleInsertTemplate(authorString, year);
  };

  /**
   * Set formik values on load
   * - this set the values of formik to the values of the state
   * @returns void
   */
  const setFormikValueOnLoad = () => {
    formik.setFieldValue('article_title', journalData.article_title);
    formik.setFieldValue('authors', journalData.authors);
    formik.setFieldValue('journal_name', journalData.journal_name);
    formik.setFieldValue('location', journalData.location);
    formik.setFieldValue('doi', journalData.doi);
    formik.setFieldValue('year', journalData.year);
    formik.setFieldValue('volume', journalData.volume);
    formik.setFieldValue('issue', journalData.issue);
    formik.setFieldValue('page', journalData.page);
    formik.setFieldValue('step06', journalData.step06);
    formik.setFieldValue('article_about_content', journalData.article_about_content);
    formik.setFieldValue('article_about_page', journalData.article_about_page);
    formik.setFieldValue(
      'article_support_study_content',
      journalData.article_support_study_content,
    );
    formik.setFieldValue(
      'article_support_study_page',
      journalData.article_support_study_page,
    );
    formik.setFieldValue(
      'article_does_not_support_study_content',
      journalData.article_does_not_support_study_content,
    );
    formik.setFieldValue(
      'needed_support_study_content',
      journalData.needed_support_study_content,
    );
    formik.setFieldValue('author_pod_color', authorPodColor);
    formik.setFieldValue(
      'article_support_study_color',
      journalData.articleSupportStudyColor,
    );
    formik.setFieldValue(
      'article_does_not_support_study_color',
      journalData.articleDoesNotSupportStudyColor,
    );
    formik.setFieldValue('needed_support_study_color', journalData.neededSupportStudyColor);
    formik.setFieldValue('subtheme_selections', journalData.subthemeSelections);
    formik.setFieldValue('selected', selectedSubthemes);
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
  const handleInsertTemplate = (authorString: string, year: string) => {
    setPanelBLoading(true); // Start loading animation

    // Fetch metadata if not available and then proceed
    if (!journalMetadata) {
      fetchMetadata(doi).then((fetchedMetadata) => {
        continueWithTemplateInsertion(fetchedMetadata, authorString, year);
      });
    } else {
      continueWithTemplateInsertion(journalMetadata, authorString, year);
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

    const authorsObj = parseAuthors(metadataAuthor);
    const inTextCitation = generateInTextCitation(
      authorsObj,
      parseInt(metadataYear),
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

    formikManipulation(
      'onReset', [], null
    );
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

  const loadData = () => {
    setLoading(true);
    const urlFetchJournal = `${URL_LINKS.GET_EDIT_JOURNAL_DATA.value}${projectId}/${journalId}/${userId}`;

    axios
      .get(urlFetchJournal)
      .then((response) => {
        const data = response.data;

        setJournalData(data.data.journal);
        setJournalDataInitial(data.data.journal);

        formikManipulation('onLoad', [], null);
        // Update Panel A Data
        setArticleTitle(journalData.article_title);
        setArticleTitleInitial(journalData.article_title);
        setAuthors(journalData.author);
        setAuthorsInitial(journalData.author);
        setJournalName(journalData.journal_name);
        setJournalNameInitial(journalData.journal_name);
        setLocation(journalData.location);
        setLocationInitial(journalData.location);
        setDoi(journalData.doi);
        setDoiInitial(journalData.doi);
        setYear(journalData.year);
        setYearInitial(journalData.year);
        setVolume(journalData.volume);
        setVolumeInitial(journalData.volume);
        setIssue(journalData.issue);
        setIssueInitial(journalData.issue);
        setPage(journalData.page);
        setPageInitial(journalData.page);

        // Update Panel B Data
        // (your existing code to update Panel B data)

        // below is panel B
        setArticleAboutContent(journalData.article_about.content);
        setArticleAboutContentInitial(journalData.article_about.content);
        setArticleAboutPage(journalData.article_about.page);
        setArticleAboutPageInitial(journalData.article_about.page);
        setArticleSupportStudyContent(
          journalData.article_support_study.content,
        );
        setArticleSupportStudyContentInitial(
          journalData.article_support_study.content,
        );
        setArticleSupportStudyPage(
          journalData.article_support_study.page,
        );

        setArticleSupportStudyPageInitial(
          journalData.article_support_study.page,
        );
        setArticleDoesNotSupportStudyContent(
          journalData.article_does_not_support_study.content,
        );
        setArticleDoesNotSupportStudyContentInitial(
          journalData.article_does_not_support_study.content,
        );

        setNeededSupportStudyContent(
          journalData.needed_support_study.content,
        );

        setNeededSupportStudyContentInitial(
          journalData.needed_support_study.content,
        );
        setSubthemeSelections(data.data.subthemes);

        setSelectedSubthemesInitial(Object.values(data.data.selections));
        //extract all values from data.data.selections
        let values = Object.values(data.data.selections);
        console.log('-- values --');
        console.log(values);
        console.log('-- values --');
        setSelectedSubthemes(values);
        setStep06([subthemeSelections[data.data.selections]]);

        setAuthorPodColor(data.data.journal_color.author_pod_color);
        setArticleSupportStudyColor(
          data.data.journal_color.article_support_study_color,
        );
        setArticleDoesNotSupportStudyColor(
          data.data.journal_color.article_dontsupport_study_color,
        );
        setNeededSupportStudyColor(data.data.journal_color.your_pod_color);

        formikManipulation('onLoad', [], null);
      })
      .catch((error: any) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
        // Remove the redundant timeout logic for Panel B
        setPanelAVisible(true);
        //wait for 3 seconds
        setPanelALoading(true);

        setTimeout(() => {
          setPanelALoading(false);
        }, 3000); // 3000 milliseconds = 3 seconds

        setPanelBVisible(true);
        setPanelBLoading(true);
        setTimeout(() => {
          setPanelBLoading(false);
        }, 3000); // 3000 milliseconds = 3 seconds
      });
  };

  useEffect(() => {
    console.log('--useEffect--');

    console.log('-- in useEffect ####################################### --');

    console.log(article_about_content);
    console.log(article_about_page);
    console.log(article_support_study_content);
    console.log(article_support_study_page);
    console.log(article_does_not_support_study_content);
    console.log(needed_support_study_content);

    console.log('-- in useEffect ####################################### --');

    if (!visible) {
      //Wipe all state values
      resetAllDataInFields();
      return;
    }
    if (chooseMetadata) {
      ProcessUseMetadata(doi);
    } else {
      loadData();
    }
  }, [visible, projectId, journalId, userId]); // Add dependencies here
  console.log('--return--');

  console.log('-- in  ####################################### --');

  console.log(article_about_content);
  console.log(article_about_page);
  console.log(article_support_study_content);
  console.log(article_support_study_page);
  console.log(article_does_not_support_study_content);
  console.log(needed_support_study_content);

  console.log('-- in  ####################################### --');
  return (
    <div className='card flex'>
      {loading ? (
        <Dialog
          header='Journal Details'
          visible={visible}
          style={{ width: '50vw' }}
          onHide={() => setVisible(false)}
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
          visible={visible}
          style={{ width: '50vw' }}
          onHide={() => setVisible(false)}
          maximizable={true}
        >
          <JournalDetailsComponent
            userId={userId}
            formik={formik}
            getFormErrorMessage={getFormErrorMessage}
            isFormFieldInvalid={isFormFieldInvalid}
            authorPodColor={authorPodColor}
            articleSupportStudyColor={articleSupportStudyColor}
            articleDoesNotSupportStudyColor={articleDoesNotSupportStudyColor}
            neededSupportStudyColor={neededSupportStudyColor}
            subthemeSelections={subthemeSelections}
            selected={selectedSubthemes}
            showWarn={showWarn}
            setVisible={setVisible}
            setLoading={setLoading}
            resetAllDataInFields={resetAllDataInFields}
            resetAllDataInFieldsToInitial={resetAllDataInFieldsToInitial}
            retrieveVideo={retrieveVideo}
            videoData={videoData}
            panelAbstractData={panelAbstractData}
            panelVisible={panelVisible}
            panelAbstractLoading={panelAbstractLoading}
            retrieveAbstract={retrieveAbstract}
            journalMetadata={journalMetadata}
            setJournalMetadata={setJournalMetadata}
            isConfirmDialogVisible={isConfirmDialogVisible}
            setIsConfirmDialogVisible={setIsConfirmDialogVisible}
            setChooseMetadata={setChooseMetadata}
            insertTemplate={insertTemplate}
            panelBVisible={panelBVisible}
            panelBLoading={panelBLoading}
            panelAVisible={panelAVisible}
            panelALoading={panelALoading}
            setPanelALoading={setPanelALoading}
            ProcessUseMetadata={ProcessUseMetadata}
            refreshFormContent={refreshFormContent}
          />
        </Dialog>
      )}
    </div>
  );
};

export default EditJournalModal;
