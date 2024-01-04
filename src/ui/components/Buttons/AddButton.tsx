import React from "react";

interface AddButtonProps {
  identifier: string;
  title: string;
  content: string;
  buttonDisabled: boolean;
  onClick: (identifier: string, title: string, content: string) => void;
}

const AddButton: React.FC<AddButtonProps> = ({
  identifier,
  title,
  content,
  buttonDisabled,
  onClick,
}) => {
  if (buttonDisabled === false) {

    return (
      <button
        type="button"
        className="btn btn-md btn-info"
        onClick={() => onClick(identifier, title, content)}
      >
        <i className="fa fa-plus"></i> Add
      </button>
    );
  } else {
    return (
      <button type="button" className="btn btn-md btn-default" disabled>
        <i className="fa fa-plus"></i> Add (Please complete other parts)
      </button>
    );

  }
};

export default AddButton;
