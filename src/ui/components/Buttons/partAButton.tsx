import React, { useState } from 'react';


interface PartAButtonProps {
  buttonName: string;
  isComplete: boolean;
  subthemeId: string;
  openDrawer: (operation: string, keyIdentifer: string) => void;
  isDrawerOpen: boolean;


};

const handleButtonClass = (isComplete: boolean) => {
  if (isComplete === true) {
    return 'btn btn-lg btn-info btn-block';
  } else {
    return 'btn btn-lg btn-danger btn-block';
  }
}


const handleButtonHover = (isComplete: boolean) => {
  if (isComplete === true) {
    return '';
  } else {
    return 'this subtheme is not complete';
  }
}

const PartAButton = ({
  buttonName,
  isComplete,
  subthemeId,
  openDrawer,
  isDrawerOpen

}: PartAButtonProps): JSX.Element => {


  if (isDrawerOpen === false) {
    return (
      <button
        type="button"
        className={handleButtonClass(isComplete)}
        id={buttonName}

        title={handleButtonHover(isComplete)}
        onClick={() => openDrawer(
          'partA',
          subthemeId
        )}
      >
        {buttonName}
      </button>
    );
  } else {
    return (
      <button
        type="button"
        className={handleButtonClass(isComplete)}
        id={buttonName}

        title={handleButtonHover(isComplete)}
        onClick={() => openDrawer(
          'partA',
          subthemeId
        )}
      >
        {buttonName}
      </button>
    );
  }
};

export default PartAButton;
