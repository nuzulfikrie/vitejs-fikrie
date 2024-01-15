import React, { useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import JournalDetailsComponent from '../Form/JournalDetailComponent';
import URL_LINKS from '../../../constants/urls';

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
  showSuccess: (message: string) => void;
  showWarning: (message: string) => void;
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
  showSuccess,
  showWarning,
  showError,
  showInfo
}) => {
  const [data, setData] = React.useState<any>([]);

  useEffect(() => {

    //if visible fetch
    if (!visible) return;

    let urlFetchJournal = URL_LINKS.GET_EDIT_JOURNAL_DATA.value + projectId + '/' + journalId + '/' + userId;

    //data 
    fetch(urlFetchJournal)
      .then((response) => response.json())
      .then((data) => {
        console.log('-------------- data fetch journal --------------------------');
        console.log(data);
        console.log('-------------- data fetch journal --------------------------');
        setData(data);
      });

  });

  return (
    <div className='card flex'>
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
          data={data}
          onSave={onSave}
          showSuccess={showSuccess}
          showWarning={showWarning}
          showError={showError}
          showInfo={showInfo}
        />
      </Dialog>
    </div>
  );
};

export default EditJournalModal;
