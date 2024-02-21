import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

type ContentDataTableProps = {

  journalMetadata: journalMetadata[];
  setChooseMetadata: (chooseMetadata: boolean) => void;
  setIsConfirmDialogVisible: (isConfirmDialogVisible: boolean) => void;
  setPanelALoading: (panelALoading: boolean) => void;
};
type journalMetadata = {
  category: string;
  data: string;
};

const ContentDataTable = ({
  journalMetadata,
  setChooseMetadata,
  setIsConfirmDialogVisible,
  setPanelALoading,
}: ContentDataTableProps) => {
  const reloadContentForm = () => {
    setIsConfirmDialogVisible(false);

    setPanelALoading(true);
    setTimeout(() => {
      setChooseMetadata(true);

      setPanelALoading(false);
    }, 3000);
  };

  return (
    <>
      <Card>
        <p>Journal Details ff</p>
        <DataTable value={journalMetadata} tableStyle={{ minWidth: '50rem' }}>
          <Column field='category' header='Category'></Column>
          <Column field='data' header='Data'></Column>
        </DataTable>
        <Button onClick={() => reloadContentForm()} label='Use Metadata' />
      </Card>
    </>
  );
};

export default ContentDataTable;
