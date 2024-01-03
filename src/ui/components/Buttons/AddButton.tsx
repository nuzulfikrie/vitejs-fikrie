import React from "react";

interface AddButtonProps {
  identifier: string;
  title: string;
  content: string;
  buttonEnabled: boolean;
  onClick: (identifier: string, title: string, content: string) => void;
}

const AddButton: React.FC<AddButtonProps> = ({
  identifier,
  title,
  content,
  buttonEnabled = false,
  onClick,
}) => {
  if (buttonEnabled === false) {
    return (
      <button type="button" className="btn btn-md btn-default" disabled>
        <i className="fa fa-plus"></i> Add (Please complete other parts)
      </button>
    );
  } else {
    return (
      <button
        type="button"
        className="btn btn-md btn-info"
        onClick={() => onClick(identifier, title, content)}
      >
        <i className="fa fa-plus"></i> Add
      </button>
    );
  }
};

export default AddButton;
