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
  label,
  icon,
  visible,
  onHide,
  setVisible,
  journalId,
  projectId,
  userId,
  onSave,
  onRemove,
  showSuccess,
  showWarn,
  showError,
  showInfo,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
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

  useEffect(() => {
    if (!visible) return;

    setLoading(true);
    const urlFetchJournal = `${URL_LINKS.GET_EDIT_JOURNAL_DATA.value}${projectId}/${journalId}/${userId}`;

    axios
      .get(urlFetchJournal)
      .then((response) => {
        const data = response.data;
        console.log(
          '-------------- data fetch journal --------------------------',
        );
        console.log(data);
        console.log(
          '-------------- data fetch journal --------------------------',
        );

        setArticleTitle(data.data.journal.article_title);
        setAuthors(data.data.journal.author);
        setJournalName(data.data.journal.journal_name);
        setLocation(data.data.journal.location);
        setDoi(data.data.journal.doi);
        setYear(data.data.journal.year);
        setVolume(data.data.journal.volume);
        setIssue(data.data.journal.issue);
        setPage(data.data.journal.page);
        setArticleAboutContent(data.data.journal.article_about.content);
        setArticleAboutPage(data.data.journal.article_about.page);
        setArticleSupportStudyContent(
          data.data.journal.article_support_study.content,
        );
        setArticleSupportStudyPage(
          data.data.journal.article_support_study.page,
        );
        setArticleDoesNotSupportStudyContent(
          data.data.journal.article_does_not_support_study.content,
        );
        setNeededSupportStudyContent(
          data.data.journal.needed_support_study.content,
        );
        setSubthemeSelections(data.data.subthemes);

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
  }, [visible, projectId, journalId, userId]); // Add dependencies here

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
          />
        </Dialog>
      )}
    </div>
  );
};

export default EditJournalModal;
