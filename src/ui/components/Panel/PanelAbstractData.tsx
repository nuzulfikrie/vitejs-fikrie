import { Card } from 'primereact/card';
import React from 'react';
import { Skeleton } from 'primereact/skeleton';

interface Props {
  // Define your component props here
  panelVisible: boolean;
  dataLoading: boolean;
  dataAbstract: any;
  dataDoi: string;
}

const PanelAbstractData: React.FC<Props> = ({
  panelVisible,
  dataLoading,
  dataAbstract,
  dataDoi,
}) => {
  // Implement your component logic here
  let title = 'Abstract' + (dataDoi ? ' - ' + dataDoi : '');
  if (!panelVisible) {
    return;
  }
  if (dataLoading) {
    return (
      <Card title={title}>
        <Skeleton shape='rectangle' width='100%' height='100px' />
      </Card>
    );
  } else {
    return <Card title={title}>{dataAbstract.data.data.abstract}</Card>;
  }
};

export default PanelAbstractData;
