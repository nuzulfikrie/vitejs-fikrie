import React from 'react';

interface TestButtonHideProps {
    onClick: () => void;
}

const TestHideButton = ({ onClick }: TestButtonHideProps) => {
    return (
        <button className="btn btn-default" onClick={onClick}>
            Click me to hide
        </button>
    );
};

export default TestHideButton;