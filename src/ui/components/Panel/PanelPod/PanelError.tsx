import React from 'react';

interface PanelErrorProps {
    key:string;
    title: string;
    content: string
    podIndicator: string
}



/**
 * React panel active, the {content} is html directly rendered
 * @param param0 
 * @returns 
 */
const PanelError: React.FC<PanelErrorProps> = ({key, title = 'Error', podIndicator = '', content = 'error' }) => {
    return (
        <div className="panel panel-danger">
            <div className="panel-heading fill">
                <span className="panel-title" id="filter_one_title">{title}</span>
                <div className="widget-menu pull-right mr10">
                    <span className="label bg-primary mr10">{podIndicator}</span>
                </div>

            </div>
            <div className="panel-body">
                <div className="p2" id={key}>{content}</div>
            </div>
        </div>
    );
};

export default PanelError;
