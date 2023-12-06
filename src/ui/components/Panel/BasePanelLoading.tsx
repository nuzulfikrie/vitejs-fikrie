import "./../../../assets/css/loading.css";

const BasePanelLoading = () => {
    return (
        <div className="panel panel-default">
            <div className="panel-heading fill">
            </div>
            <div className="panel-footer">
                <div className="container">
                <div className="loading-spinner"></div>
                </div>
            </div>
            <div className="panel-footer">
            </div>
        </div>
    );
};

export default BasePanelLoading;
