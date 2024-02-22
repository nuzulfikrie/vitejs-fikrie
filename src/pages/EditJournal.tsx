import React from 'react';
import { useParams } from 'react-router-dom';

interface EditJournalProps {
  journalId: number;
}

const EditJournal: React.FC<EditJournalProps> = () => {
  let { journalId } = useParams();
  const journalIdString = journalId?.toString();

  return (
    <div>
      <h1>Edit Journal Id {journalIdString}</h1>
      {/* Add your form or content here */}
    </div>
  );
};

export default EditJournal;