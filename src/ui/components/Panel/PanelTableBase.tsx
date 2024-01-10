import React from 'react';
import DataTable from '../Table/DataTable';
import '../../css/loading.css';

interface PanelTableBaseProps {
  rqConstruct: string;
  datatable: [];
  rowsSelected: [];
  loading: boolean;
  onCheckedChange: (id: string, isChecked: boolean, stringData: string) => void;
  updateSelections: (selections: []) => void;
  onRowSelect: (e: any) => void;
  onRowUnselect: (e: any) => void;
  rowClick: boolean;
  setRowClick: (value: boolean) => void;
  editDatatableClick: (journal_id: string) => void;
  removeDatatableClick: (
    journal_id: string,
    rqConstruct: string,
    id: string,
  ) => void;
  expandedRows: any[];
  setExpandedRows: (value: any[]) => void;
}

const PanelTableBase: React.FC<PanelTableBaseProps> = ({
  rqConstruct,
  datatable,
  rowsSelected,
  loading,
  onCheckedChange,
  updateSelections,
  onRowSelect,
  onRowUnselect,
  rowClick,
  setRowClick,
  editDatatableClick,
  removeDatatableClick,
  expandedRows,
  setExpandedRows,
}) => {
  return (
    <>
      {loading ? (
        <div>
          <div className='container'>
            <div className='loading-spinner'></div>
          </div>
        </div>
      ) : (
        <DataTable
          rqConstruct={rqConstruct}
          datatable={datatable}
          rowsSelected={rowsSelected}
          loading={loading}
          onCheckedChange={onCheckedChange}
          updateSelections={updateSelections}
          onRowSelect={onRowSelect}
          onRowUnselect={onRowUnselect}
          rowClick={rowClick}
          setRowClick={setRowClick}
          editDatatableClick={editDatatableClick}
          removeDatatableClick={removeDatatableClick}
          expandedRows={expandedRows}
          setExpandedRows={setExpandedRows}
        />
      )}
    </>
  );
};

export default PanelTableBase;
