import React from 'react';
import '../../css/loading.css';

interface PanelTableBaseProps {
    data: any;
    title: string;
    loading: boolean;
}

const PanelTableBase: React.FC<PanelTableBaseProps> = ({ data, title, loading }) => {
    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                <span className="panel-title">
                    {loading ? "Loading.." : title}
                </span>
            </div>
            {loading ? (<div className="panel-body">
                <div className="container">
                    <div className="loading-spinner"></div>
                </div>
            </div>) : (<div className="panel-body">
                {/* Panel content goes here */}
            </div>)

            }

        </div>
    );
};

export default PanelTableBase;
