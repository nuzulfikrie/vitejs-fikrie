import React from "react";

interface EditButtonProps {
    onClick: (item_id: string, identifier: string,title:string, content:string) => void;
    item_id: string;
    identifier: string;
    title:string,
    content: string;
}
const EditButton: React.FC<EditButtonProps> = ({ onClick, item_id,identifier,title,content }) => {
    return (
            <button
                type="button"
                className="btn btn-md btn-warning"
                data-id={item_id}
                onClick={() => onClick(item_id,identifier,title,content)}
            >
                <i className="fa fa-pen"></i> Edit {item_id}
            </button>
    );
};

export default EditButton;