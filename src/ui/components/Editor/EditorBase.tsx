import React, { useState, createContext, useContext } from 'react';
import 'primeicons/primeicons.css'; // Essential for PrimeReact iconography
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme
import 'primereact/resources/primereact.css'; // Core CSS
import 'quill/dist/quill.snow.css'; // Quill Editor CSS
import { Editor } from 'primereact/editor';

// Create a context for the Editor
const EditorContext = createContext({
    retrieveEditorContent: () => '',
});

// Hook to use the Editor context
export const useEditorContext = () => useContext(EditorContext);

interface EditorBaseProps {
    initialContent?: string;
    onEditorChange?: (content: string) => void;
}

const EditorBase: React.FC<EditorBaseProps> = ({ initialContent, onEditorChange }) => {
    const [content, setContent] = useState(initialContent || '');

    // Handler for changes in the Editor content
    const handleEditorChange = (e: any) => {
        const newContent = e.htmlValue; // htmlValue contains the new HTML content

        console.log('##################################################################################################');

        console.log(newContent);
        console.log('##################################################################################################');

        setContent(newContent);
        if (onEditorChange) {
            onEditorChange(newContent);
        }
    };

    // Function to retrieve the current content of the Editor
    const retrieveEditorContent = () => content;

    // Custom toolbar options
    const headerTemplate = (
        <span className="ql-formats">
            <button className="ql-bold" aria-label="Bold"></button>
            <button className="ql-italic" aria-label="Italic"></button>
            <button className="ql-underline" aria-label="Underline"></button>
            <select className="ql-color" aria-label="Text Color"></select>
            <select className="ql-background" aria-label="Background Color"></select>
        </span>
    );

    return (
        <EditorContext.Provider value={{ retrieveEditorContent: () => '' }}>
            <div>
                <Editor
                    style={{ height: '500px' }} // Set the height of the editor
                    value={content}
                    onTextChange={handleEditorChange} // Attach the change handler
                    headerTemplate={headerTemplate} // Use custom toolbar options

                />
            </div>
        </EditorContext.Provider>
    );
};

export default EditorBase;
