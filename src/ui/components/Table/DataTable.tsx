import React, { useState, useRef } from 'react';
import { DataTable, DataTableSelectionChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import { Toast } from 'primereact/toast';
import EditDatatableButton from '../Buttons/EditDatatableButton';
import RemoveDatatableButton from '../Buttons/RemoveDatatableButton';
interface TableProps {
  rqConstruct: string;
  datatable: [];
  loading: boolean;
  rowsSelected: [];
  onCheckedChange: (id: string, isChecked: boolean, stringData: string) => void;
  updateSelections: (selections: any[]) => void;
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

const Table: React.FC<TableProps> = ({
  rqConstruct,
  datatable,
  loading,
  rowsSelected,
  updateSelections,
  onCheckedChange,
  onRowSelect,
  onRowUnselect,
  rowClick,
  setRowClick,
  editDatatableClick,
  removeDatatableClick,
  expandedRows,
  setExpandedRows,
}) => {
  const stringDataTemplate = (rowData: any) => {
    return <div dangerouslySetInnerHTML={{ __html: rowData.string_data }} />;
  };

  const bodyEditRemove = (rowData: any) => {
    //contains edit and remove button , use id as identifier
    return (
      <div className='flex justify-content-center align-items-center gap-2'>
        <EditDatatableButton
          onClick={editDatatableClick}
          journal_id={rowData.journal_id}
        />
        <RemoveDatatableButton
          onClick={removeDatatableClick}
          journal_id={rowData.journal_id}
          rqConstruct={rqConstruct}
          id={rowData.id}
        />
      </div>
    );
  };
  const rowExpansionTemplate = (data: any) => {
    console.log('--- rowExpansionTemplate --');
    console.log(data);
    return <div className='p-3'></div>;
  };

  const allowExpansion = (rowData: any) => {
    return true;
  };
  return (
    <div className='card'>
      <div className='flex justify-content-center align-items-center mb-4 gap-2'>
        <InputSwitch
          inputId='input-rowclick'
          checked={rowClick}
          onChange={(e: InputSwitchChangeEvent) => setRowClick(e.value!)}
        />
        <label htmlFor='input-rowclick'>Row Click</label>
      </div>
      <DataTable
        value={datatable}
        loading={loading}
        selectionMode={rowClick ? undefined : 'multiple'}
        selection={rowsSelected}
        onSelectionChange={(e: any) => updateSelections(e.value)}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.value)}
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey='id'
        onRowSelect={onRowSelect}
        onRowUnselect={onRowUnselect}
        metaKeySelection={false}
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column
          selectionMode='multiple'
          headerStyle={{ width: '3rem' }}
        ></Column>
        <Column expander={allowExpansion} style={{ width: '5rem' }} />

        <Column
          field='string_data'
          header='Journal Details'
          body={stringDataTemplate}
        />

        <Column header='Action' body={bodyEditRemove} />
      </DataTable>
    </div>
  );
};

export default Table;
