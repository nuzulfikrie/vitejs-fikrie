import React from "react";

interface ResetButtonProps {
    onClick: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onClick }) => {
    return (
            <button
                type="button"
                className="btn btn-md btn-danger"
                onClick={onClick}
            >
                <i className="fa fa-undo"></i> Reset
            </button>
    );
};

export default ResetButton;