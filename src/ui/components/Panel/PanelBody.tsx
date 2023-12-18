import React, { FC } from "react";
import { getRqSortData } from "../../../utility/eagletableTypeUtils";
import RowPanelTable from "../Panel/RowPanelTable";

interface PanelBodyProps {
  eagletableType: string;
  rqConstructSet: object;
  subthemeList: { [key: string]: any }; // Add index signature
  completedB: { [key: string]: completedB[] }; // Add index signature
  openDrawer: (operation: string, keyIdentifer: string, keyIdentifierSecond: string, userId: string, projectId: string) => void;
  isDrawerOpen: boolean;
  userId: string;
  projectId: string;


}

interface completedB {
  //just array of booleans
  [key: string]: boolean;
}

const PanelBody: React.FC<PanelBodyProps> = ({
  eagletableType,
  rqConstructSet,
  subthemeList,
  completedB,
  openDrawer,
  isDrawerOpen,
  userId,
  projectId,
}) => {
  const sort = getRqSortData(eagletableType);

  return (
    <div className="panel-body">
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Main Theme</th>
            <th>Subtheme</th>
            <th> POD Tree </th>
          </tr>
        </thead>
        <tbody>

          {sort && sort.map((key) => (
            <tr key={key}>

              <RowPanelTable
                rqConstructKey={key}
                rqConstructSet={rqConstructSet}
                rowspan={subthemeList[key].length}
                rowData={subthemeList[key]}
                completedB={completedB} // Add completedB prop
                openDrawer={openDrawer}
                isDrawerOpen={isDrawerOpen}
                userId={userId}
                projectId={projectId}
              />
            </tr>

          ))}

        </tbody>
      </table>
    </div>
  );
};

export default PanelBody;
