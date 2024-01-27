import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import JournalDetailsComponent from '../Form/JournalDetailComponent';
import URL_LINKS from '../../../constants/urls';
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
  {
    /* initial state - for reset  */
  }

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
  const [selectedSubthemesInitial, setSelectedSubthemesInitial] = useState<
    Subtheme[]
  >([]);

  {
    // -- for metadata modal and visibility
  }
  const [journalMetadata, setJournalMetadata] = useState(null);
  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
  const [chooseMetadata, setChooseMetadata] = useState(false);

  {
    // -- for metadata modal and visibility
  }
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

  {
    /* for panel abstract  */
  }
  const [panelVisible, setPanelVisible] = useState<boolean>(false);
  const [panelAbstractLoading, setPanelAbstractLoading] =
    useState<boolean>(false);
  const [panelAbstractData, setPanelAbstractData] = useState<any>(null);
  {
    /* for panel abstract  */
  }
  //--------------- handle metadata ----------------------------
  const ProcessUseMetadata = () => {
    //need to force rerender

    if (!journalMetadata || (journalMetadata as any[]).length === 0) {
      showWarn('No metadata to use. Please retrieve metadata first.');
      return;
    }

    // Map the metadata array to an object for easier access
    const metadataObj = (journalMetadata as any[]).reduce(
      (obj: { [x: string]: any }, item: { category: string; data: any }) => {
        obj[item.category.toLowerCase()] = item.data; // Use lowercase for keys
        return obj;
      },
      {},
    );

    setArticleTitle(metadataObj['title']);
    setAuthors(metadataObj['authors']);
    setJournalName(metadataObj['journal']);
    setLocation(metadataObj['location']); // Assuming 'location' is a category in your metadata
    setDoi(metadataObj.url ? metadataObj['url'].split('doi.org/')[1] : ''); // Extract DOI from URL
    setYear(metadataObj.year ? metadataObj['year'].toString() : ''); // Convert year to string if it exists
    setVolume(metadataObj['volume']);
    setIssue(metadataObj['issue']);
    setPage(metadataObj['page']);

    setStep06([]);
    setArticleAboutContent('');
    setArticleAboutPage('');
    setArticleSupportStudyContent('');
    setArticleSupportStudyPage('');
    setArticleDoesNotSupportStudyContent('');
    setNeededSupportStudyContent('');

    setSelectedSubthemes([0]);

    //delete the metadata
    setJournalMetadata(null);
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
        //check if response status 200

        console.log('--- response --');
        console.log(response);
        console.log('--- response --');

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
    setLoading(false);
  };

  const loadData = () => {
    setLoading(true);
    const urlFetchJournal = `${URL_LINKS.GET_EDIT_JOURNAL_DATA.value}${projectId}/${journalId}/${userId}`;

    axios
      .get(urlFetchJournal)
      .then((response) => {
        const data = response.data;

        setArticleTitle(data.data.journal.article_title);
        setArticleTitleInitial(data.data.journal.article_title);
        setAuthors(data.data.journal.author);
        setAuthorsInitial(data.data.journal.author);
        setJournalName(data.data.journal.journal_name);
        setJournalNameInitial(data.data.journal.journal_name);
        setLocation(data.data.journal.location);
        setLocationInitial(data.data.journal.location);
        setDoi(data.data.journal.doi);
        setDoiInitial(data.data.journal.doi);
        setYear(data.data.journal.year);
        setYearInitial(data.data.journal.year);
        setVolume(data.data.journal.volume);
        setVolumeInitial(data.data.journal.volume);
        setIssue(data.data.journal.issue);
        setIssueInitial(data.data.journal.issue);
        setPage(data.data.journal.page);
        setPageInitial(data.data.journal.page);
        setArticleAboutContent(data.data.journal.article_about.content);
        setArticleAboutContentInitial(data.data.journal.article_about.content);
        setArticleAboutPage(data.data.journal.article_about.page);
        setArticleAboutPageInitial(data.data.journal.article_about.page);
        setArticleSupportStudyContent(
          data.data.journal.article_support_study.content,
        );
        setArticleSupportStudyContentInitial(
          data.data.journal.article_support_study.content,
        );
        setArticleSupportStudyPage(
          data.data.journal.article_support_study.page,
        );

        setArticleSupportStudyPageInitial(
          data.data.journal.article_support_study.page,
        );
        setArticleDoesNotSupportStudyContent(
          data.data.journal.article_does_not_support_study.content,
        );
        setArticleDoesNotSupportStudyContentInitial(
          data.data.journal.article_does_not_support_study.content,
        );

        setNeededSupportStudyContent(
          data.data.journal.needed_support_study.content,
        );

        setNeededSupportStudyContentInitial(
          data.data.journal.needed_support_study.content,
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
      })
      .catch((error: any) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!visible) return;

    if (chooseMetadata && journalMetadata) {
      ProcessUseMetadata();
    } else {
      loadData();
    }
  }, [visible, projectId, journalId, userId, chooseMetadata]); // Add dependencies here

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
            journalId={journalId}
            projectId={projectId}
            userId={userId}
            article_title={article_title}
            authors={authors}
            journal_name={journal_name}
            location={location}
            doi={doi}
            year={year}
            volume={volume}
            issue={issue}
            page={page}
            step06={step06}
            article_about_content={article_about_content}
            article_about_page={article_about_page}
            article_support_study_content={article_support_study_content}
            article_support_study_page={article_support_study_page}
            article_does_not_support_study_content={
              article_does_not_support_study_content
            }
            needed_support_study_content={needed_support_study_content}
            authorPodColor={authorPodColor}
            articleSupportStudyColor={articleSupportStudyColor}
            articleDoesNotSupportStudyColor={articleDoesNotSupportStudyColor}
            neededSupportStudyColor={neededSupportStudyColor}
            subthemeSelections={subthemeSelections}
            selected={selectedSubthemes}
            onSave={onSave}
            showSuccess={showSuccess}
            showWarn={showWarn}
            showError={showError}
            showInfo={showInfo}
            setVisible={setVisible}
            setLoading={setLoading}
            resetAllDataInFields={resetAllDataInFields}
            resetAllDataInFieldsToInitial={resetAllDataInFieldsToInitial}
            retrieveVideo={retrieveVideo}
            videoData={videoData}
            setPanelVisible={setPanelVisible}
            setPanelAbstractLoading={setPanelAbstractLoading}
            panelAbstractData={panelAbstractData}
            panelVisible={panelVisible}
            panelAbstractLoading={panelAbstractLoading}
            retrieveAbstract={retrieveAbstract}
            journalMetadata={journalMetadata}
            setJournalMetadata={setJournalMetadata}
            isConfirmDialogVisible={isConfirmDialogVisible}
            setIsConfirmDialogVisible={setIsConfirmDialogVisible}
            setChooseMetadata={setChooseMetadata}
          />
        </Dialog>
      )}
    </div>
  );
};

export default EditJournalModal;
