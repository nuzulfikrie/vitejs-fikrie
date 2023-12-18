import React, { FC } from "react";
import PartAButton from "../Buttons/partAButton";
import PartBButton from "../Buttons/PartBButton";

interface rowPanelTableProps {
  rqConstructKey: string;
  rqConstructSet: object;
  rowspan: number;
  rowData: {
    subtheme_id: number;
    subtheme_description: string;
    flag_subtheme_complete: boolean;
    course_subtheme_count: number;
  }[];
  completedB: {
    [key: string]: completedB[];
  };
  openDrawer: (operation: string, keyIdentifer: string, keyIdentifierSecond: string, userId: string, projectId: string) => void;
  isDrawerOpen: boolean;
  userId: string;
  projectId: string;
}

interface completedB {
  //just array of booleans
  [key: string]: boolean;
}
interface rqConstructSet {
  rqConstructKey: string;
};
const createTDRandomKey = (key: string) => {
  return key + Math.random();
};

const RowPanelTable: React.FC<rowPanelTableProps> = ({
  rqConstructKey,
  rqConstructSet,
  rowspan,
  rowData,
  completedB,
  openDrawer,
  isDrawerOpen,
  userId,
  projectId,
}) => {

  console.log('--- row data ---');
  console.log(rowData);
  return (
    <>
      <td>{rqConstructSet[rqConstructKey]}</td>
      <td key={rqConstructKey}>
        {rowData.map((rowData, index) => {
          return (
            <PartAButton
              buttonName={rowData.subtheme_description}
              isComplete={rowData.flag_subtheme_complete}
              subthemeId={rowData.subtheme_id.toString()}
              openDrawer={openDrawer}
              isDrawerOpen={isDrawerOpen}
              rqConstructKey={rqConstructKey}
              userId={userId}
              projectId={projectId}
            />
          );
        })}
      </td>
      <td key="{td-partA-$rqConstruct}">
        <PartBButton
          buttonName={rqConstructSet[rqConstructKey]}
          isComplete={completedB[rqConstructKey]}
          rqConstruct={rqConstructKey}
          openDrawer={openDrawer}
          isDrawerOpen={isDrawerOpen}
        />
      </td>
    </>
  );
};

export default RowPanelTable;
