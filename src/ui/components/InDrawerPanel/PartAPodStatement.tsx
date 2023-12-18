import React, { useEffect, useRef, useState } from 'react';
import Editor from "../Editor/Editor";

interface PartAPodStatementProps {
    dataPartAPodStatement: string;
}

const PartAPodStatement: React.FC<PartAPodStatementProps> = ({ dataPartAPodStatement }) => {
    const editorInstance = useRef(null);
    const [editorData, setEditorData] = useState(dataPartAPodStatement);

    return (
        <>
        <div className="card">
            <div className="card-body">
                <div className="card-text">
                    <Editor data={editorData}/>
                </div>
            </div>
        </div>
        </>
    );
};

export default PartAPodStatement;
