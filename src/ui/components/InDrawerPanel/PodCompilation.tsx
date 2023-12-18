import React, { useEffect, useRef, useState } from 'react';
import Editor from "../Editor/Editor";


interface PodCompilationProps {
    dataCompilation: string;
}

const PodCompilation: React.FC<PodCompilationProps> = ({ dataCompilation }) => {
    const [editorData, setEditorData] = useState(dataCompilation);


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

export default PodCompilation;
