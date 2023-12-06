import React from 'react';

interface AlertProps {
  message: string;
  className: string;
  visible: boolean;
}
//added close button x icon
//base alert default state is message null, class null, visible false

const BaseAlert = ({ message, className,visible }: AlertProps) => {
  if (!visible) {
    return null;
  }
  return (
    <div className={`alert ${className}`} role="alert" style={{ textAlign: 'center' }}> 
        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
      {message}
    </div>
  );
};

export default BaseAlert;


