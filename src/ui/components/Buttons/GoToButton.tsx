import React from 'react';

interface GoToButtonProps {
  onClick: () => void;
}

const GoToButton: React.FC<GoToButtonProps> = ({ onClick }) => {
  return (
    <button
      type='button'
      className='btn btn-md btn-system'
      onClick={() => onClick()}
    >
      <i className='fa fa-arrow'></i> Go To Step Seven
    </button>
  );
};

export default GoToButton;
