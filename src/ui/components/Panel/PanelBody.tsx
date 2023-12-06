import React, { FC } from 'react';

interface PanelBodyProps {
  data: string;
}

const PanelBody: React.FC<PanelBodyProps> = (props) => {
  const { data } = props;

  return (
    <div className="panel-body">
      Panel content goes here ... {data}
    </div>
  );
};

export default PanelBody;
