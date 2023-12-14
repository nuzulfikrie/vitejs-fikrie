import React, { FC } from "react";
import { getRqSortData } from "../../../utility/eagletableTypeUtils";
import RowPanelTable from "../Panel/RowPanelTable";

interface PanelBodyProps {
  eagletableType: string;
  rqConstructSet: object;
  subthemeList: { [key: string]: any }; // Add index signature
  completedB: { [key: string]: completedB[] }; // Add index signature
  openDrawer: (operation: string, keyIdentifer: string) => void;
  isDrawerOpen: boolean;


}

const PanelBody: React.FC<PanelBodyProps> = ({
  eagletableType,
  rqConstructSet,
  subthemeList,
  completedB,
  openDrawer,
  isDrawerOpen,
}) => {
  const sort = getRqSortData(eagletableType);

  console.log("--- sort --");
  console.log(sort);

  //(3) ['who', 'what', 'how'] we use this to draw table

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
              />
              </tr>

          ))}

        </tbody>
      </table>
    </div>
  );
};

export default PanelBody;
