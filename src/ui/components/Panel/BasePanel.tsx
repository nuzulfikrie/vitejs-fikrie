import React, { useEffect, useLayoutEffect, useState } from "react";
import PanelBody from "../Panel/PanelBody";
import PanelFooter from "../Panel/PanelFooter";
import { getEagletableType, getRqConstructSet, getSubthemelist, getCompletedB } from "../../../utility/basePanelDataExtractor";

//HOOK 



interface BasePanelProps {
  title: string;
  data: {
    data: Data;
  };
  showAlertError: (errorMessage: string) => void;
  showAlertSuccess: (successMessage: string) => void;
  openDrawer: (operation: string, keyIdentifer: string, keyIdentifierSecond:string, userId: string, projectId: string) => void;
  isDrawerOpen: boolean;
  projectId: string;
  userId: string;
};
interface Data {
  status: string;
  message: string;
  is_article: boolean;
  key: string;
  course_id: number;
  rqConstructSet: {
    [key: string]: string;
  };
  subthemeList: {
    [key: string]: Subtheme[];
  };
  completedB: {
    [key: string]: completedB[];
  };
  dataStepSeven: {
    [key: string]: {
      construct_definition: string;
      subtheme_count: number;
      subtheme_data: Subtheme[];
    };
  };
  eagletable_type: string;
}
interface completedB {
  //just array of booleans
  [key: string]: boolean;
};

interface Subtheme {
  subtheme_description: string;
  subtheme_id: number;
  flag_subtheme_complete: boolean;
  course_subtheme_count: number;
}


const BasePanel: React.FC<BasePanelProps> = ({ title, data, showAlertError, showAlertSuccess, openDrawer, isDrawerOpen, userId, projectId }) => {
  const eagletableType = getEagletableType(data.data);
  const rqConstructSet = getRqConstructSet(data.data);
  const subthemeList = getSubthemelist(data.data);
  const completedB = getCompletedB(data.data);
  useEffect(() => {
    if (data.data.status === '"success"') {
      showAlertSuccess('Data loaded successfully');
    } else {
      showAlertError(data.data.message);
    }
  });

  return (
    <div className="panel panel-system">
      <div className="panel-heading fill">
        <span className="panel-title">{title}</span>
      </div>
      <PanelBody
        eagletableType={eagletableType}
        rqConstructSet={rqConstructSet}
        subthemeList={subthemeList}
        completedB={completedB}
        openDrawer={openDrawer}
        isDrawerOpen={isDrawerOpen}
        userId={userId}
        projectId={projectId}

      />
      <PanelFooter />
    </div>
  );
};

export default BasePanel;
