import React from "react";
import AddButton from "../../Buttons/AddButton";

interface PanelProps {
  title: string | null;
  content: string | null;
  identifier: string;
  podIndicator: string;
  addButtonDisabled: boolean;
  addData: (identifier: string, title: string, content: string) => void;
}

const EDITABLE = ["4", "5", "6", "7", "8", "9"];
const NOT_EDITABLE = ["1", "2", "3"];

/**
 * React panel active, the {content} is html directly rendered
 * @param param0
 * @returns
 */
const PanelNotCompleted: React.FC<PanelProps> = ({
  title,
  identifier,
  podIndicator,
  content,
  addButtonDisabled,
  addData,
}) => {
  if (EDITABLE.includes(identifier)) {
    return (
      <>
        <div className="panel panel-danger">
          <div className="panel-heading fill">
            <span className="panel-title" id="filter_one_title">
              {"Please add title"}
            </span>
            <div className="widget-menu pull-right mr10">
              <span className="label bg-primary mr10">{podIndicator}</span>
            </div>
          </div>

          <div className="panel-body">
            <div className="p2" id="filter_one_content">
              {"Please add content"}
            </div>
          </div>
          <div className="panel-footer">
            <div className="btn-group">
              <AddButton
                onClick={addData}
                identifier={identifier}
                title={title || ''}
                content={content || ''}
                buttonDisabled={addButtonDisabled}
              />
            </div>
          </div>
        </div>
      </>
    );
  } else if (NOT_EDITABLE.includes(identifier)) {
    const title = "Not Completed Yet";
    const content = "not completed yet";
    return (
      <>
        <div className="panel panel-danger">
          <div className="panel-heading fill">
            <span className="panel-title" id="filter_one_title">
              {title}
            </span>
            <div className="widget-menu pull-right mr10">
              <span className="label bg-primary mr10">{podIndicator}</span>
            </div>
          </div>

          <div className="panel-body">
            <div className="p2" id="filter_one_content">
              {content}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="panel panel-danger">
          <div className="panel-heading fill">
            <span className="panel-title" id="filter_one_title">
              {"Loading.."}
            </span>
            <div className="widget-menu pull-right mr10">
              <span className="label bg-primary mr10">{podIndicator}</span>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default PanelNotCompleted;
