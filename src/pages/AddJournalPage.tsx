import { Toast } from 'primereact/toast';
import React from 'react';
import { JournalProvider } from '../Journal/JournalContext';
import AddJournal from '../Journal/AddJournal';

interface Subtheme {
  name: string;
  key: string;
}
interface AddJournalPageProps {
  toast: React.RefObject<Toast>;
  showSuccess: (message: string) => void;
  showWarn: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  projectId: string | null;
  userId: string | null;
  subthemeOptions: Subtheme[];
  journalColors: {};
};

const AddJournalPage: React.FC<AddJournalPageProps> = ({
toast,
showSuccess,
showWarn,
showError,
showInfo,
projectId,
userId,
subthemeOptions,
journalColors

}) => {


  return (
    <JournalProvider>
    <div className="AddJournalPage">
      <AddJournal          toast={toast}
                showSuccess={showSuccess}
                showInfo={showInfo}
                showWarn={showWarn}
                showError={showError}
                projectId={projectId}
                userId={userId}
                subthemeOptions={subthemeOptions}
                journalColors={journalColors} />
    </div>
  </JournalProvider>
  );
};

export default AddJournalPage;