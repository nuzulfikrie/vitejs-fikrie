import PanelBody from "../Panel/PanelBody";
import './../../../assets/css/loading.css';

const BasePanel = () => {
    return (
        <div className="panel panel-system">
            <div className="panel-heading fill">
            </div>
            <div className="panel-footer">
                <div className="loading-spinner"></div>
            </div>
            <div className="panel-footer">
            </div>
        </div>
    );
};

export default BasePanel;
