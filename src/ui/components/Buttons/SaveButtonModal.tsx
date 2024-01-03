import React from "react";

interface SaveButtonProps {
    onClick: () => void;
}

const SaveButtonModal: React.FC<SaveButtonProps> = ({ onClick }) => {
    return (
        <button
            type="button"
            className="btn btn-md btn-system"
            onClick={onClick}
        >
            <i className="fa fa-disk"></i> Save
        </button>
    );
};

export default SaveButtonModal;