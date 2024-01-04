import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import EditorBase from "../Editor/EditorBase";
import SaveButtonModal from "../Buttons/SaveButtonModal";
import CloseButton from "../Buttons/CloseButton";
import { useEditorContext } from "../Editor/EditorBase";
import TextInputInModal from "./TextInputInModal";
import DOMPurify from "dompurify";

interface MaximizableModalProps {
  modalVisible: boolean;
  onEditorChange: (content: string) => void;
  handleTitleChange: (title: string) => void;
  getEditorContent: () => string;
  item_id: string;
  identifier: string;
  title: string;
  content: string;
  setModalVisible: (modalVisible: boolean) => void;
  saveData: (
  ) => void;


  close: () => void;
}

const MaximizableModal: React.FC<MaximizableModalProps> = ({
  modalVisible,
  onEditorChange,
  handleTitleChange,
  item_id,
  identifier,
  title,
  content,
  setModalVisible,
  saveData,
  close
}) => {

  const dirtyTitle = title;
  const clean = DOMPurify.sanitize(dirtyTitle, { ALLOWED_TAGS: [] });
  //for title , strip all tags, retain only text

  const handleSaveClick = () => {
    // Now use editorContent for saving
    saveData();
  };
  return (
    <>
      <div className="card flex justify-content-center">
        <Dialog
          header="Edit title and content here"
          visible={modalVisible}
          maximizable
          style={{ width: "50vw" }}
          onHide={() => setModalVisible(false)}
        >
          {/* field named title use primereact component */}
          <div className="card">
            < TextInputInModal initialState={clean} handleTitleChange={handleTitleChange} />
          </div>

          {/* editor */}
          <div className="card">
            <label htmlFor="Content">Content</label>

            <EditorBase initialContent={content} onEditorChange={onEditorChange}  />
          </div>
          <SaveButtonModal
            onClick={handleSaveClick}
           
          />
          <CloseButton onClick={close} />
        </Dialog>
      </div>
    </>
  );
};

export default MaximizableModal;

function retrieveEditorContent() {
  throw new Error("Function not implemented.");
}
// guide, how to embed this in App
// and set visibility via props
// ```
// import React, { useState } from 'react';
// import { Dialog } from 'primereact/dialog';
//
// const MaximizableModal = () => {
//     const [modalVisible, setModalVisible] = useState(false);
//
//     return (
//         <Dialog
//             header="Header"
//             visible={modalVisible}
//             maximizable
//             style={{ width: '50vw' }}
//             onHide={() => setModalVisible(false)}
//         >
//             <p className="m-0">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
//                 consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
//                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//             </p>
//         </Dialog>
//     );
// };
//
// export default MaximizableModal;
// ```
// //```
// import React from "react";
// import "./assets/skin/default_skin/css/theme.min.css";
// import { STEP_SETTING } from "./constants/step_constants";
// import BasePanel from "./ui/components/Panel/BasePanel";
// import { Toast } from "primereact/toast";
// import React from "react";
// import constants  from "./constants/constants";
// import { dataFetcher } from "./features/dataFetcher";
// import dataLibrary from "./features/dataLibrary";
// import MaximizableModal from './ui/components/Modal/MaximizableModal';
//
// function App() {
// /** other code */

// /** state for modal visibility */
// const [modalVisible, setModalVisible] = useState(false);

// /** other code */
// /** function to toggle modal visibility */
// const toggleModal = () => {
//     setModalVisible(!modalVisible);
// };

// /** to embed the modal component and pass state via props. do this */
// <MaximizableModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
