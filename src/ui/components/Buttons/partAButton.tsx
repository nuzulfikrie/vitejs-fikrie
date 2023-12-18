import React, { useState } from 'react';
import "./../../../assets/css/loading.css";


interface PartAButtonProps {
  buttonName: string;
  isComplete: boolean;
  subthemeId: string;
  openDrawer: (operation: string, keyIdentifer: string, keyIdentifierSecond: string, userId: string, projectId: string) => void;
  isDrawerOpen: boolean;
  rqConstructKey: string;
  userId: string;
  projectId: string;

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
  isDrawerOpen,
  rqConstructKey,
  userId,
  projectId,
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
          subthemeId,
          rqConstructKey,
          userId,
          projectId,
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
          subthemeId,
          rqConstructKey,
          userId,
          projectId,
        )}
      >
        {buttonName}
      </button>
    );
  }
};

export default PartAButton;
