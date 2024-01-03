import React from "react";

interface CloseButtonProps {
    onClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
    return (
        <button
            type="button"
            className="btn btn-md btn-default"
            onClick={onClick}
        >
            <i className="fa fa-close"></i> Close
        </button>
    );
};

export default CloseButton;