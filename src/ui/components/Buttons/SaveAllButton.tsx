import React from "react";

interface SaveAllButtonProps {
    onClick: () => void;
}

const SaveAllButton: React.FC<SaveAllButtonProps> = ({ onClick }) => {
    return (
            <button
                type="button"
                className="btn btn-md btn-system"
                onClick={onClick}
            >
                <i className="fa fa-disk"></i> Save All
            </button>
    );
};

export default SaveAllButton;