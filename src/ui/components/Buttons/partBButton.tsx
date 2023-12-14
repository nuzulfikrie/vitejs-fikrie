import React, { useState } from "react";

interface PartBButtonProps {
  buttonName: string;
  isComplete: boolean;
  rqConstruct: string;
  openDrawer: (operation: string, keyIdentifer: string) => void;

  isDrawerOpen: boolean;
}

const handleButtonClass = (isComplete: boolean) => {
  if (isComplete === true) {
    return "btn btn-lg btn-dark btn-block";
  } else {
    return "btn btn-lg btn-danger btn-block";
  }
};

const handleButtonHover = (isComplete: boolean) => {
  if (isComplete === true) {
    return "";
  } else {
    return "this subtheme is not complete";
  }
};

const PartBButton = ({
  buttonName,
  isComplete,
  rqConstruct,
  openDrawer,
  isDrawerOpen,
}: PartBButtonProps): JSX.Element => {

  //IF OPENDRAWER FALSE
  //IF OPENDRAWER TRUE
  if (isDrawerOpen === false) {
    return (
      <button
        type="button"
        className={handleButtonClass(isComplete)}
        id={buttonName}
        title={handleButtonHover(isComplete)}
        onClick={() => openDrawer("partB", rqConstruct)}
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
        onClick={() => openDrawer("partB", rqConstruct)}
      >
        {buttonName + ' ' + rqConstruct}
      </button>
    );
  }
};

export default PartBButton;
