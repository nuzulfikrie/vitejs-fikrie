import React from 'react';
import { Dialog } from 'primereact/dialog';
import JournalDetailsComponent from '../Form/JournalDetailComponent';

interface EditJournalModalProps {
  label: string;
  icon: string;
  visible: boolean;
  onHide: () => void;
  setVisible: (visible: boolean) => void;
  journalId: string;
  projectId: string;
  onSave: (journalId: string, projectId: string, journal: any) => void;
}

const EditJournalModal: React.FC<EditJournalModalProps> = ({
  label,
  icon,
  visible,
  onHide,
  setVisible,
  journalId,
  projectId,
}) => {
  return (
    <div className='card flex justify-content-center'>
      <Dialog
        header='Journal Details'
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => setVisible(false)}
      >
        <JournalDetailsComponent journalId={journalId} projectId={projectId} />
      </Dialog>
    </div>
  );
};

export default EditJournalModal;
