import React, { useEffect, useRef, useState } from "react";
import Editor from "../Editor/Editor";
interface PodSummaryProps {
  podSummaryText: string;
}

const PodSummary: React.FC<PodSummaryProps> = (props) => {
  let podSummaryText  = props.podSummaryText;
  const [editorData, setEditorData] = useState(podSummaryText);




  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="card-text">
            <Editor data={editorData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PodSummary;
