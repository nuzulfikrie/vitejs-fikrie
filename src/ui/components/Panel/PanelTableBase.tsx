import React from 'react';
import DataTable from '../Table/DataTable';
import '../../css/loading.css';

interface PanelTableBaseProps {
  datatable: [];
  rowsSelected: [];
  loading: boolean;
  onCheckedChange: (id: string, isChecked: boolean, stringData: string) => void;
  updateSelections: (selections: []) => void;
  onRowSelect: (e: any) => void;
  onRowUnselect: (e: any) => void;
  rowClick: boolean;
  setRowClick: (value: boolean) => void;
}

const PanelTableBase: React.FC<PanelTableBaseProps> = ({
  datatable,
  rowsSelected,
  loading,
  onCheckedChange,
  updateSelections,
  onRowSelect,
  onRowUnselect,
  rowClick,
  setRowClick,
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
          datatable={datatable}
          rowsSelected={rowsSelected}
          loading={loading}
          onCheckedChange={onCheckedChange}
          updateSelections={updateSelections}
          onRowSelect={onRowSelect}
          onRowUnselect={onRowUnselect}
          rowClick={rowClick}
          setRowClick={setRowClick}
        />
      )}
    </>
  );
};

export default PanelTableBase;
