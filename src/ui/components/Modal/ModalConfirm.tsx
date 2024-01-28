import React from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';

interface ModalConfirmProps {
    isConfirmDialogVisible: boolean;
    journalMetadata: any;
    setIsConfirmDialogVisible: (isConfirmDialogVisible: boolean) => void;
    ContentDataTable: any;
    confirmUseMetadata: (journalMetadata: any) => void;
}


const ModalConfirm: React.FC<ModalConfirmProps> = ({
    isConfirmDialogVisible,
    journalMetadata,
    setIsConfirmDialogVisible,
    ContentDataTable,
    confirmUseMetadata,
}) => {

    return ({
        isConfirmDialogVisible && (
            <ConfirmDialog
                visible={isConfirmDialogVisible}
                onHide={() => setIsConfirmDialogVisible(false)}
                message='Are you sure you want to proceed?'
                content={
                    journalMetadata && (
                        <ContentDataTable journalMetadata={journalMetadata} />
                    )
                }
                header='Confirmation'
                icon='pi pi-exclamation-triangle'
                accept={() => {
                    setIsConfirmDialogVisible(false);
                    confirmUseMetadata(journalMetadata);
                }}
                reject={() => setIsConfirmDialogVisible(false)}
            />
        )}
/>
};
export default ModalConfirm;
