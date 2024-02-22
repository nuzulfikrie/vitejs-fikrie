import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import AddJournal from "../src/pages/AddJournal";
import JournalList from "../src/pages/JournalList";
import EditJournal from "../src/pages/EditJournal";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
const App = () => {
  const NavigationButtons = () => {
    const navigate = useNavigate();

    return (
      <div>
        <Button
          label="List Journal"
          icon="pi pi-list"
          style={{ marginRight: ".25em", color: "white" }}
          onClick={() => navigate("/pages/JournalList")}
          className="p-mr-2"
        />
        <Button
          label="Add Journal"
          icon="pi pi-plus"
          style={{ marginRight: ".25em", color: "white" }}
          onClick={() => navigate("/pages/addJournal")}
        />
      </div>
    );
  };

  return (
    <BrowserRouter>
      <div>
        <nav>
          <NavigationButtons />
        </nav>

        <Routes>
          <Route path="/pages/JournalList" element={<JournalList />} />

          <Route path="/pages/addJournal" element={<AddJournal />} />
          <Route
            path="/pages/editJournal/:journalId"
            element={<EditJournal journalId={0} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
