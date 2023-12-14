// this file is for alert in drawer panel
//
// Path: src/ui/components/InDrawerPanel/Alert.tsx

import React from 'react';
interface AlertProps{
    message: string;
    className: string;
    visible: boolean;
}

const Alert: React.FC<AlertProps> = ({message,className,visible}) => {

    if (visible === false) {
        return null;
    }
    return (
        <div className={`alert ${className}`} role="alert" style={{ textAlign: 'center' }}>
            <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
            {message}
        </div>
    );
};

export {Alert};