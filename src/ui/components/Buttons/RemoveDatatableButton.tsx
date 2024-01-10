import React from 'react';

interface RemoveDatatableButtonProps {
  //onclick will need to accept journal id
  onClick: (journal_id: string, rqConstruct: string, id: string) => void;
  journal_id: string;
  rqConstruct: string;
  id: string;
}

const RemoveDatatableButton: React.FC<RemoveDatatableButtonProps> = ({
  onClick,
  journal_id,
  rqConstruct,
  id,
}) => {
  return (
    <button
      type='button'
      className='btn btn-sm btn-dark'
      data-bs-toggle='tooltip'
      data-bs-placement='top'
      data-pr-tooltip='Remove This Journal'
      onClick={() => onClick(journal_id, rqConstruct, id)}
    >
      <i className='fa fa-trash'></i>
    </button>
  );
};

export default RemoveDatatableButton;
