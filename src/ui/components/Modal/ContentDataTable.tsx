import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

type ContentDataTableProps = {
  journalMetadata: journalMetadata[];
  setChooseMetadata: (chooseMetadata: boolean) => void;
  setLoading: (loading: boolean) => void;
  setIsConfirmDialogVisible: (isConfirmDialogVisible: boolean) => void;
};
type journalMetadata = {
  category: string;
  data: string;
};

const ContentDataTable = ({
  journalMetadata,
  setChooseMetadata,
  setLoading,
  setIsConfirmDialogVisible,
}: ContentDataTableProps) => {


  const reloadContentForm = () => {
    console.log('reloadContentForm');
    setLoading(true); // Assuming you want to show loading before the 3-second delay

    setTimeout(() => {
      setChooseMetadata(true);
      setIsConfirmDialogVisible(false);
      setLoading(false);
    }, 3000); // 3000 milliseconds = 3 seconds

    return;
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
