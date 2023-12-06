import React from 'react';

interface TestButtonErrorProps {
    onClick: () => void;
}

const TestButtonError = ({ onClick }: TestButtonErrorProps) => {
    return (
        <button className="btn btn-warning" onClick={onClick}>
            Click me for error
        </button>
    );
};

export default TestButtonError;