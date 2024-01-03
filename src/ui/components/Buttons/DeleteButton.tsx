import React from "react";

interface DeleteButtonProps {
  onClick: (item_id:string,identifier:string, content:string) => void;
  item_id: string;
  identifier: string;
  content: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, item_id,identifier,content }) => {
  return (
      <button
        type="button"
        className="btn btn-md btn-danger"
        data-id={item_id}
        onClick={() => onClick(item_id,identifier,content)}
      >
        <i className="fa fa-trash"></i> Delete
      </button>
  );
};

export default DeleteButton;