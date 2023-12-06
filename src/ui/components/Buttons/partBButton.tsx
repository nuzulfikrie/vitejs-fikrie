import React, { useState } from 'react';

const PartBButton = () => {
    //button name
    
    const [buttonName, setButtonName] = useState('Info');
    const [isEnabled, setIsEnabled] = useState(true);

    const handleClick = () => {
        // Handle button click event here
    };

    return (
        <button
            type="button"
            className={`btn btn-lg btn-info btn-block ${isEnabled ? '' : 'disabled'}`}
            onClick={handleClick}
            disabled={!isEnabled}
        >
            Info
        </button>
    );
};

export default PartBButton;
