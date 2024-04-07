import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddJournalPage from "../src/pages/AddJournalPage";
import JournalList from "../src/pages/JournalList";
import EditJournalPage from "./pages/EditJournalPage";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { PanelNoConnection } from "./ui/components/Panel/PanelNoConnection";
import { PanelHasConnection } from "./ui/components/Panel/PanelHasConnection";
import { PanelLoading } from "./ui/components/Panel/PanelLoading";
import URL_LINKS from "./constants/urls";
import { fetchData } from "./services/dataService";

const App = () => {
  const linkRef = useRef();
  const projectId = localStorage.getItem("course_id");
  const userId = localStorage.getItem("user_id");
  const toast = useRef<Toast>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [hasInternet, setHasInternet] = useState(false);

  const [subthemeOptions, setSubthemeOptions] = useState([]);
  const [data, setData] = useState([]);
  const [journalColors, setJournalColors] = useState([]);
  const [limit, setLimit] = useState(0);
  const [canAdd, setCanAdd] = useState(true);

  useEffect(() => {
    //check if has internet
    checkIfConnected();
    loadMainData();
    // Navigate to the journal list page when the component mounts (i.e., on initial load)
    if (linkRef.current) {
      linkRef.current.click();
    }

    //if loading true . renavigator to "/"
    //if loading true . renavigator to "/"
    if (isLoading) {
      setTimeout(() => {
        window.location.href = "/";
      }, 5000);
    }
  }, []);

  const NavigationButtons = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const labelAddButton = "Add Journal Upto " + limit + " journals";

    //detect if page at JournalList
    if (location.pathname === "/stepsix/JournalList") {
      // Code to be executed when the current page is JournalList
      var PageIsJournal = true;
    } else {
      // Code to be executed when the current page is not JournalList
      var PageIsJournal = false;
    }

    //detect if page at addJournal
    if (location.pathname === "/stepsix/addJournal") {
      // Code to be executed when the current page is addJournal
      var PageIsAdd = true;
    } else {
      // Code to be executed when the current page is not addJournal
      var PageIsAdd = false;
    }

    //detect if page at editJournal
    if (location.pathname === "/stepsix/editJournal") {
      // Code to be executed when the current page is editJournal
      var editJournal = true;
    } else {
      // Code to be executed when the current page is not editJournal
      var editJournal = false;
    }

    return (
      <div>
        <Link
          ref={linkRef}
          to="/stepsix/JournalList"
          style={{ display: "none" }}
        >
          Navigate
        </Link>
        {/** Show the navigation buttons only if the current page is not the JournalList page */}
        {PageIsJournal === true ? (
          <Button
            label="Home"
            icon="pi pi-home"
            style={{ marginRight: ".25em", color: "white" }}
            className="p-mr-2"
            disabled={true}
          />
        ) : (
          <Button
            label="Home"
            icon="pi pi-home"
            style={{ marginRight: ".25em", color: "white" }}
            onClick={() => navigate("/stepsix/JournalList")}
            className="p-mr-2"
          />
        )}


        {/** Show the navigation buttons only if the current page is not the JournalList page */}

        { (PageIsAdd === true && canAdd === true)? (
                <Button
                label={labelAddButton}
                icon="pi pi-plus"
                style={{ marginRight: ".25em", color: "white" }}
                disabled= {true}
              />
            ) :(PageIsAdd === true && canAdd === false) ? (    <Button
              label="You cannot add journal anymore. Limit reached. "
              icon="pi pi-plus"
              style={{ marginRight: ".25em", color: "white" }}
              onClick={() =>
                showError("You have reached the limit of journals you can add")
              }
            />) : (PageIsAdd === false && canAdd === true)? (      <Button
              label={labelAddButton}
              icon="pi pi-plus"
              style={{ marginRight: ".25em", color: "white" }}
              onClick={() => navigate("/stepsix/addJournal")}
            />): (
            <Button
              label="Add Journal"
              icon="pi pi-plus"
              style={{ marginRight: ".25em", color: "white" }}
              disabled={true}
            />)  }






      </div>
    );
  };

  {
    /** core functions */
  }
  const checkIfConnected = () => {
    const isOnline = window.navigator.onLine;
    setHasInternet(isOnline);
  };

  const loadMainData = async () => {
    setIsLoading(true);
    try {
      if (!projectId || !userId) {
        showError("Project ID or User ID is missing");
        return;
      }

      const linkFetch1 =
        URL_LINKS.STEP_SIX_DATA.value + projectId + "/" + userId;

      const dataResponse = await fetchData(linkFetch1, {
        method: "GET", // or 'POST'
        credentials: "include", // This is important for cookies to be sent and received
      });

      setData(dataResponse);
      setSubthemeOptions(dataResponse.data.subthemes);

      setLimit(dataResponse.data.balance);
      setJournalColors(dataResponse.data.journal_color);
      if (dataResponse.data.balance === 0) {
        setCanAdd(false);
      } else {
        setCanAdd(true);
      }
    } catch (error: any) {
      console.log("Error:", error.message);
      showError(error.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  {
    /** core functions */
  }

  {
    /* modal */
  }

  const showSuccess = (message: string) => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };

  const showInfo = (message: string) => {
    toast.current?.show({
      severity: "info",
      summary: "Info",
      detail: message,
      life: 3000,
    });
  };

  const showWarn = (message: string) => {
    (toast.current as Toast)?.show({
      severity: "warn",
      summary: "Warning",
      detail: message,
      life: 3000,
    });
  };

  const showError = (message: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 3000,
    });
  };

  {
    /* modal */
  }

  if (hasInternet === false) {
    <PanelNoConnection />;
  } else {
    //blink for 3 second show has connection
    <PanelHasConnection />;
  }

  return (
    <BrowserRouter>
      <Toast ref={toast} />

      <div>
        <nav>
          <NavigationButtons />
        </nav>
        {isLoading && <PanelLoading />}{" "}
        {/* Show loading indicator when loading */}
        {!hasInternet && <PanelNoConnection />} {/* Show no connection panel */}
        {hasInternet && <PanelHasConnection />}{" "}
        {/* Show has connection panel */}
        <Routes>
          <Route path="/stepsix/JournalList" element={<JournalList />} />
          <Route
            path="/stepsix/addJournal"
            element={
              <AddJournalPage
                toast={toast}
                showSuccess={showSuccess}
                showInfo={showInfo}
                showWarn={showWarn}
                showError={showError}
                projectId={projectId}
                userId={userId}
                subthemeOptions={subthemeOptions}
                journalColors={journalColors}
              />
            }
          />
          <Route
            path="/stepsix/editJournal/:journalId"
            element={
              <EditJournalPage
                journalId={0}
                toast={toast}
                showSuccess={showSuccess}
                showInfo={showInfo}
                showWarn={showWarn}
                showError={showError}
                projectId={projectId}
                userId={userId}
                subthemeOptions={subthemeOptions}
                journalColors={journalColors}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
export default App;
