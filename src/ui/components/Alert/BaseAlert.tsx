import React from 'react';

interface AlertProps {
  message: string;
  className: string;
}
//add close button x icon
const BaseAlert = ({ message, className }: AlertProps) => {
  return (
    <div className={`alert ${className}`} role="alert" style={{ textAlign: 'center' }}> 
        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
      {message}
    </div>
  );
};

export default BaseAlert;