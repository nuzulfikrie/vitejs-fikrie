import React from 'react';

interface EditDatatableButtonProps {
  onClick: (journal_id: string) => void;
  journal_id: string;
}

const EditDatatableButton: React.FC<EditDatatableButtonProps> = ({
  onClick,
  journal_id,
}) => {
  return (
    <button
      type='button'
      className='btn btn-sm btn-warning'
      onClick={() => onClick(journal_id)}
    >
      <i className='fa fa-pencil'></i>
    </button>
  );
};

export default EditDatatableButton;
