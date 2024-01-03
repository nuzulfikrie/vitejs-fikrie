import React from "react";

interface SaveButtonProps {
    item_id: string;
    onClick: (item_id: string, identifier: string, title: string, content: string) => void;
    identifier: string;
    title?: string;
    content?: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({ item_id= '',onClick,identifier,title= '',content ='' }) => {
    return (
            <button
                type="button"
                className="btn btn-md btn-system"
                onClick={() => onClick(item_id,identifier,title,content)}
            >
                <i className="fa fa-disk"></i> Save
            </button>
    );
};

export default SaveButton;