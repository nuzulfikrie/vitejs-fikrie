import React, { useState, useRef } from 'react';
import { DataTable, DataTableSelectionChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import { Toast } from 'primereact/toast';
interface TableProps {
  datatable: [];
  loading: boolean;
  rowsSelected: [];
  onCheckedChange: (id: string, isChecked: boolean, stringData: string) => void;
  updateSelections: (selections: any[]) => void;
  onRowSelect: (e: any) => void;
  onRowUnselect: (e: any) => void;

  rowClick: boolean;
  setRowClick: (value: boolean) => void;
}

const Table: React.FC<TableProps> = ({
  datatable,
  loading,
  rowsSelected,
  updateSelections,
  onCheckedChange,
  onRowSelect,
  onRowUnselect,
  rowClick,
  setRowClick,
}) => {
  const stringDataTemplate = (rowData: any) => {
    return <div dangerouslySetInnerHTML={{ __html: rowData.string_data }} />;
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
        <Column field='is_checked' header='Checked' />

        <Column field='id' header='Col 1' />
        <Column field='journal_id' header='Col 2' />

        <Column field='string_data' header='Col 3' body={stringDataTemplate} />
      </DataTable>
    </div>
  );
};

export default Table;
