import * as React from 'react';


import styles from '../../../assets/css/drawer.module.css';
import PartA from '../InDrawerPanel/PartA';
import  { Alert } from '../InDrawerPanel/Alert';


enum DrawerDirection {
    Left = 'Left',
    Right = 'Right',
}

type Props = {
    isOpen: boolean;
    children: React.ReactNode;
    direction?: DrawerDirection;
    onClose: () => void;
    closeDrawer: () => void;
    openDrawer: (operation: string, keyIdentifer: string) => void;
    drawerOpen: boolean;
    operation: string;
    keyIdentifier: string;
    alertClassNameDrawer: string;
    alertMessageDrawer: string;
    showAlertDrawer: boolean;
    showAlertSuccessDrawer: (message: string) => void;
    showAlertErrorDrawer: (message: string) => void;
};


const Drawer = ({
    isOpen,
    children,
    direction = DrawerDirection.Right,
    onClose,
    closeDrawer,
    openDrawer,
    drawerOpen,
    operation,
    keyIdentifier,
    alertClassNameDrawer,
    alertMessageDrawer,
    showAlertDrawer,
    showAlertSuccessDrawer,
    showAlertErrorDrawer,
}: Props) => {


    const handleClick = () => {
        if (drawerOpen) {
            closeDrawer();
        } else {
            openDrawer(
                '',
                ''
            );
        }
    };

    const classNames = `${styles.Drawer} ${styles[direction]} ${isOpen ? styles.Open : ''
        }`;

    if (operation === 'partA') {
        return (
            <>


                <div className={classNames}>

                    <Alert message={alertMessageDrawer} className={alertClassNameDrawer} visible={showAlertDrawer} />
                    <button className="btn btn-danger" onClick={handleClick}>
                        Click me to {drawerOpen ? 'close' : 'open'} drawer
                    </button>


                    <div className={styles.Content}>{
                        <PartA subthemeId={keyIdentifier}
                            showAlertSuccessDrawer={showAlertSuccessDrawer}
                            showAlertErrorDrawer={showAlertErrorDrawer} />}
                            
                            </div>


                    The operation is: {operation}

                    key identifier is: {keyIdentifier}



                </div>
            </>
        );
    }

};

export { Drawer, DrawerDirection };
