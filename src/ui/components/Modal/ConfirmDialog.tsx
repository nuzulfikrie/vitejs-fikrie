import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

interface ConfirmDialogProps {
  visible: boolean;
  onHide: () => void;
  message: string;
  content: JSX.Element;
  header: string;
  icon: string;
  accept: () => void;
  reject: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  visible,
  onHide,
  message,
  content,
  header,
  icon,
  accept,
  reject,
}) => {
  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={header}
      footer={
        <div>
          <Button label='Yes' icon='pi pi-check' onClick={accept} />
          <Button
            label='No'
            icon='pi pi-times'
            onClick={reject}
            className='p-button-secondary'
          />
        </div>
      }
    >
      <div className='p-d-flex p-ai-center'>
        <i className={`pi ${icon} p-mr-3`} style={{ fontSize: '2rem' }}></i>
        <span>{message}</span>
      </div>
      {content}
    </Dialog>
  );
};

export default ConfirmDialog;
