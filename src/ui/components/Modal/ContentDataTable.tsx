import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';

type ContentDataTableProps = {
  journalMetadata: journalMetadata[];
};
type journalMetadata = {
  category: string;
  data: string;
};

const ContentDataTable = ({ journalMetadata }: ContentDataTableProps) => {
  console.log('#####################################');
  console.log(journalMetadata);
  console.log('#####################################');

  return (
    <>
      <Card>
        <p>Journal Details</p>
        <DataTable value={journalMetadata} tableStyle={{ minWidth: '50rem' }}>
          <Column field='category' header='Category'></Column>
          <Column field='data' header='Data'></Column>
        </DataTable>
      </Card>
    </>
  );
};

export default ContentDataTable;
