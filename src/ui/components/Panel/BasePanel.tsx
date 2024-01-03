import PanelBody  from "./PanelBody";
import ResetButton from "../Buttons/ResetButton";
import SaveAllButton from "../Buttons/SaveAllButton";
import RefreshButton from "../Buttons/RefreshButton";

interface BasePanelProps {
  data: object;
  subthemeCount: number;
  title : string;
  loading: boolean;
  deleteDataClick: (item_id: string, identifier: string, content: string) => void;
  editDataClick: (item_id: string, identifier: string, title:string,content:string ) => void;
  refreshData: () => void;
  addData: (identifier: string, title: string, content: string) => void;
  resetData: () => void;
  saveAllData: () => void;
  error: string | null;
};


const BasePanel: React.FC<BasePanelProps> = ({
  data,
  subthemeCount,
  title,
  loading,
  deleteDataClick,
  editDataClick,
  refreshData,
  addData,
  resetData,
  saveAllData,
  error
}) => {
  return (
    <div className="panel panel-system">
      <div className="panel-heading fill">
        <span className="panel-title">{title}</span>
      </div>
      <PanelBody
      data={data}
      subthemeCount={subthemeCount}
      loading={loading}
      deleteDataClick={deleteDataClick}
      editDataClick={editDataClick}
      addData={addData}
      error={error}

      />
      <div className="panel-footer">
        <div className="row">
          <div className="col md-12">
            <ResetButton onClick={resetData} />
            <SaveAllButton onClick={saveAllData} />
            <RefreshButton onClick={refreshData} />

          </div>
        </div>
      </div>
    </div>
  );
};

export default BasePanel;
