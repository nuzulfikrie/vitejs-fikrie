import React from 'react';

interface SaveButtonProps {
  onClick: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick }) => {
  return (
    <button
      type='button'
      className='btn btn-md btn-system'
      onClick={() => onClick()}
    >
      <i className='fa fa-floppy-disk'></i> Save
    </button>
  );
};

export default SaveButton;
