import React from 'react';
import { useParams } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { JournalProvider } from '../Journal/JournalContext';
import EditJournal from '../Journal/EditJournal';

interface Subtheme {
  name: string;
  key: string;
}
interface EditJournalPageProps {
  journalId: number;
  toast: React.RefObject<Toast>;
  showSuccess: (message: string) => void;
  showWarn: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  projectId: string | null;
  userId: string | null;
  subthemeOptions: Subtheme[];
  journalColors: {};
}

const EditJournalPage: React.FC<EditJournalPageProps> = ({
  toast,
  showSuccess,
  showWarn,
  showError,
  showInfo,
  projectId,
  userId,
  subthemeOptions,
  journalColors,
}) => {
  let { journalId } = useParams();
  const journalIdString = journalId?.toString();

  return (
    <JournalProvider>
      <div className='AddJournalPage'>
        <EditJournal
          journalId={journalIdString}
          toast={toast}
          showSuccess={showSuccess}
          showInfo={showInfo}
          showWarn={showWarn}
          showError={showError}
          projectId={projectId}
          userId={userId}
          subthemeOptions={subthemeOptions}
          journalColors={journalColors}
        />
      </div>
    </JournalProvider>
  );
};

export default EditJournalPage;
