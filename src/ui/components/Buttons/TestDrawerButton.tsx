import React from 'react';

interface TestDrawerButtonProps {
    closeDrawer: () => void;
    openDrawer: (operation:string,keyIdentifer:string) => void;
    drawerOpen: boolean;
}

const TestDrawerButton = ({ closeDrawer, openDrawer, drawerOpen }: TestDrawerButtonProps) => {
    const handleClick = () => {
        if (drawerOpen) {
            closeDrawer();
        } else {
            openDrawer('test','test');
        }
    };

    return (
        <button className="btn btn-default" onClick={handleClick}>
            Click me to {drawerOpen ? 'close' : 'open'} drawer
        </button>
    );
};

export default TestDrawerButton;