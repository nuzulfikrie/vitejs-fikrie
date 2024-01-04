import React from "react";
import DeleteButton from "../../Buttons/DeleteButton";
import EditButton from "../../Buttons/EditButton";
import AddButton from "../../Buttons/AddButton";
import DOMPurify from "dompurify";

interface PanelActiveProps {
  key: string;
  item_id: string;
  identifier: string;
  title: string;
  content: string;
  podIndicator: string;
  deleteDataClick: (
    item_id: string,
    identifier: string,
    content: string
  ) => void;
  editDataClick: (
    item_id: string,
    identifier: string,
    title: string,
    content: string
  ) => void;
  addData: (identifier: string, title: string, content: string) => void;
}

const EDITABLE = ["4", "5", "6", "7", "8", "9"];
const NOT_EDITABLE = ["1", "2", "3"];

const identifierIdTitleSetter = (identifier: string) => {
  switch (identifier) {
  case "1":
    return "filter_one_title";
  case "2":
    return "filter_two_title";
  case "3":
    return "filter_three_title";
  case "4":
    return "filter_four_title";
  case "5":
    return "filter_five_title";
  case "6":
    return "filter_six_title";
  case "7":
    return "filter_seven_title";
  case "8":
    return "filter_eight_title";
  case "9":
    return "filter_nine_title";
  default:
    return "filter_one_title";
  }

};

const PanelActive: React.FunctionComponent<PanelActiveProps> = ({
  key,
  item_id,
  identifier,
  title,
  content,
  podIndicator,
  deleteDataClick,
  editDataClick,
  addData,
}) => {
  const dirty = content;
  const clean = DOMPurify.sanitize(dirty);
  if (EDITABLE.includes(identifier)) {
    if (content !== "" || content !== null) {
      let idIdentifier = identifierIdTitleSetter(identifier);
      return (
        <div className="panel panel-dark overflow-auto">
          <div className="panel-heading fill">
            <span className="panel-title" id={idIdentifier}>
              {title}
            </span>
            <div className="widget-menu pull-right mr10">
              <span className="label bg-primary mr10">{podIndicator}</span>
            </div>
          </div>
          <div className="panel-body">
            <div className="p2" id={item_id}>
              <div dangerouslySetInnerHTML={{ __html: clean }} />
            </div>
          </div>
          <div className="panel-footer">
            <div className="btn-group">
              <EditButton
                onClick={editDataClick}
                item_id={item_id}
                identifier={identifier}
                title={title}
                content={clean}
              />
              <DeleteButton
                onClick={deleteDataClick}
                item_id={item_id}
                identifier={identifier}
                content={clean}
              />
            </div>
          </div>
        </div>
      );
    } else if (content === "" || content === null) {
      let idIdentifier = identifierIdTitleSetter(identifier);
      return (
        <div className="panel panel-dark overflow-auto">
          <div className="panel-heading fill">
            <span className="panel-title" id={idIdentifier}>
              {title}
            </span>
            <div className="widget-menu pull-right mr10">
              <span className="label bg-primary mr10">{podIndicator}</span>
            </div>
          </div>
          <div className="panel-footer">
            <div className="btn-group">
              <AddButton
                onClick={addData}
                title={""}
                content={""}
                identifier={identifier}
                buttonEnabled={false}
              />
            </div>
          </div>
        </div>
      );
    }
  } else if (NOT_EDITABLE.includes(identifier)) {
    let idIdentifier = identifierIdTitleSetter(identifier);

    return (
      <div className="panel panel-dark overflow-auto">
        <div className="panel-heading fill">
          <span className="panel-title" id={idIdentifier}>
            {title}
          </span>
          <div className="widget-menu pull-right mr10">
            <span className="label bg-primary mr10">{podIndicator}</span>
          </div>
        </div>
        <div className="panel-body">
          <div className="p2" id={key}>
            <div dangerouslySetInnerHTML={{ __html: clean }} />
          </div>
        </div>
        <div className="panel-footer"></div>
      </div>
    );
  } else {
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
  }
};

export default PanelActive;
