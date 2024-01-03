import '../../../css/loading.css';



/**
 * React panel active, the {content} is html directly rendered
 * @param param0 
 * @returns 
 */
const PanelLoading: React.FC = () => {
    return (
        <div className="panel panel-default">
            <div className="panel-heading fill">
                <span className="panel-title" id="filter_one_title">Loading..</span>

            </div>
            <div className="panel-body">
                <div className="container">
                    <div className="loading-spinner"></div>
                </div>
            </div>
        </div>
    );
};

export default PanelLoading;
