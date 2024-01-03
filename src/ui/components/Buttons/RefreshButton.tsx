import React from "react";

interface RefreshButtonProps {
    onClick: () => void;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ onClick }) => {
    return (
            <button
                type="button"
                className="btn btn-md btn-system"
                onClick={onClick}
            >
                <i className="fa fa-refresh"></i> Refresh
            </button>
    );
};

export default RefreshButton;