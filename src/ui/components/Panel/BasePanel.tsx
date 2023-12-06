import React from "react";
import PanelBody  from "../Panel/PanelBody";
import PanelFooter from "../Panel/PanelFooter";

interface BasePanelProps {
  title: string;
  data: string; //parsed json data

};


const BasePanel: React.FC<BasePanelProps> = ({ title, data }) => {
  return (
    <div className="panel panel-system">
      <div className="panel-heading fill">
        <span className="panel-title">{title}</span>
      </div>
      <PanelBody data={data} />
      <PanelFooter/>
    </div>
  );
};

export default BasePanel;
