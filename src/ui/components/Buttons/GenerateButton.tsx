import React from 'react';

interface GenerateButtonProps {
  onClick: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick }) => {
  return (
    <button type='button' className='btn btn-md btn-dark' onClick={onClick}>
      <i className='fa fa-file'></i> Generate
    </button>
  );
};

export default GenerateButton;
