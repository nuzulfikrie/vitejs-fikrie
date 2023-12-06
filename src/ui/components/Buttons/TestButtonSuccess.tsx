import React from 'react';

interface TestButtonErrorProps {
    onClick: () => void;
}

const TestButtonSuccess = ({ onClick }: TestButtonErrorProps) => {
    return (
        <button className="btn btn-success" onClick={onClick}>
            Click me for error
        </button>
    );
};

export default TestButtonSuccess;