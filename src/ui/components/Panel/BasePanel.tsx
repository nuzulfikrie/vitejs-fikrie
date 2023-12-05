import PanelBody  from "../Panel/PanelBody";
import  './../../../assets'

const BasePanel = () => {
  return (
    <div className="panel panel-system">
      <div className="panel-heading fill">
        <span className="title">Panel Heading</span>
      </div>
      <PanelBody/>
      <div className="panel-footer">
        Panel Footer
      </div>
    </div>
  );
};

export default BasePanel;
