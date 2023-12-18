import * as React from "react";

import styles from "../../../assets/css/drawer.module.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css"; // core css
import PartA from "../InDrawerPanel/PartA";
import { Toast } from "primereact/toast";
import { useRef } from "react";

enum DrawerDirection {
  Left = "Left",
  Right = "Right",
}

type Props = {
  isOpen: boolean;
  loading: boolean;
  children: React.ReactNode;
  direction?: DrawerDirection;
  onClose: () => void;
  closeDrawer: () => void;
  handleDrawerLoading: (loading: boolean) => void;
  openDrawer: (
    operation: string,
    keyIdentifer: string,
    keyIdentifierSecond: string,
    userId: string,
    projectId: string
  ) => void;
  drawerOpen: boolean;
  operation: string;
  keyIdentifier: string;
  userId: string;
  projectId: string;
  keyIdentifierSecond: string;
};

const Drawer = ({
  isOpen,
  loading,
  children,
  direction = DrawerDirection.Right,
  onClose,
  closeDrawer,
  handleDrawerLoading,
  openDrawer,
  drawerOpen,
  operation,
  keyIdentifier,
  userId,
  projectId,
  keyIdentifierSecond,
}: Props) => {
  const toast = useRef<Toast>(null);

  const showSuccess = (message: string) => {

    if (toast.current){
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: message,
        life: 3000,
      });
    }

  };

  const showInfo = (message: string) => {
    if (toast.current) {
      toast.current.show({
        severity: "info",
        summary: "info",
        detail: message,
        life: 3000,
      });
    }
  };

  const showWarn = (message: string) => {
    if (toast.current) {
      toast.current.show({
        severity: "warn",
        summary: "warn",
        detail: message,
        life: 3000,
      });
    }
  };

  const showError = (message: string) => {
    if (toast.current) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: message,
        life: 3000,
      });
    }
  };

  const handleClick = () => {
    if (drawerOpen) {
      closeDrawer();
    } else {
      openDrawer("", "", "", "", "");
    }
  };

  const classNames = `${styles.Drawer} ${styles[direction]} ${
    isOpen ? styles.Open : ""
  }`;

  //if state loading true , children is just a  panel with loading animation
  if (operation === "partA") {
    if (loading === true) {
      return (
        <div className={classNames}>
          <button className="btn btn-system" onClick={handleClick}>
            Click me to {drawerOpen ? "close" : "open"} drawer
          </button>
          <div className="panel panel-default">
            <div className="panel-heading fill"></div>
            <div className="panel-footer">
              <div className="container">
                <div className="loading-spinner"></div>
              </div>
            </div>
            <div className="panel-footer"></div>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <Toast ref={toast} />

          <div className={classNames}>
            <button className="btn btn-system" onClick={handleClick}>
              Click me to {drawerOpen ? "close" : "open"} drawer
            </button>
            <div className={styles.Content}>
                <div className="panel-body">
              {
                <PartA
                    handleDrawerLoading={handleDrawerLoading}
                    subthemeId={keyIdentifier}
                    userId={userId}
                    projectId={projectId}
                    rqConstructKey={keyIdentifierSecond}
                    showSuccess={showSuccess}
                    showInfo={showInfo}
                    showError={showError}
                    showWarn={showWarn} 
                    dataSummary={""} 
                    dataPod={""} 
                    dataCompilation={""}                />
              }
              </div>
            </div>
            The operation is: {operation}
            key identifier is: {keyIdentifier}
            projectId is: {projectId}
            userId: {userId}
            key identifier second: {keyIdentifierSecond}
          </div>
        </>
      );
    }
  }
};

export { Drawer, DrawerDirection };
