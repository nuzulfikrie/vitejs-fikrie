import React, {
  useState,
  createContext,
  useContext,
  useRef,
  useEffect,
} from 'react';
import 'primeicons/primeicons.css'; // Essential for PrimeReact iconography
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme
import 'primereact/resources/primereact.css'; // Core CSS
import 'quill/dist/quill.snow.css'; // Quill Editor CSS
import { Editor } from 'primereact/editor';
import { get } from 'http';

// Create a context for the Editor
const EditorContext = createContext({
  retrieveEditorContent: () => '',
});

// Hook to use the Editor context
export const useEditorContext = () => useContext(EditorContext);

interface EditorBaseBlankProps {
  initialContent?: string;
  readibility?: boolean;
  onEditorChange?: (content: string) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}

const EditorBaseBlank: React.FC<EditorBaseBlankProps> = ({
  initialContent,
  readibility,
  onEditorChange,
  showSuccess,
  showError,
}) => {
  //initial state, if readibility is true, then increaseReadibility function will be called
  console.log(
    '###############################################  initialContent ###################################################',
  );

  console.log(initialContent);
  console.log(
    '################################ initialContent ##################################################################',
  );
  const [content, setContent] = useState(initialContent || '');
  const quillRef = useRef(null); // Reference to the Quill editor

  //function that will increase text readibility on quill editor
  const increaseReadibility = (): string => {
    //get content of editor
    const editorContent = retrieveEditorContent();
    // Define your readability rules here
    // Example: splitting long paragraphs, adding line breaks after punctuation, etc.
    const enhancedContent = editorContent.replace(
      /(<span class="pod_text"[^>]*>.*?<\/span>)/g,
      '$1<br><br>',
    );
    return enhancedContent;
  };
  // Function to retrieve the current content of the Editor
  const retrieveEditorContent = () => content;

  const handleEditorChange = (e: any) => {
    const newContent = e.htmlValue;
    setContent(newContent);

    console.log(
      '##################################################################################################',
    );

    console.log(newContent);
    console.log(
      '##################################################################################################',
    );
    if (onEditorChange) {
      onEditorChange(newContent);
    }
  };

  const copyToClipboard = () => {
    const text = retrieveEditorContent();
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Handle successful copy here, if needed
        showSuccess('Text copied to clipboard');

        console.log('Text copied to clipboard');
      })
      .catch((err) => {
        // Handle errors here, if needed
        showError('Could not copy text');
        console.error('Could not copy text: ', err);
      });
  };

  const improveReadibility = () => {
    const newContent = increaseReadibility();
    console.log('-- increaseReadibility --');
    console.log(newContent);
    console.log('-- increaseReadibility --');
    setContent(newContent);
  };

  const addLineBreak = () => {
    //add line break after each sentence end .
    const newContent = content.replace(/\.[^.]*?(?=\s|$)/g, '.<br><br>');
    setContent(newContent);
  };

  const resetContent = () => {
    setContent(initialContent || '');
  };

  useEffect(() => {
    if (readibility) {
      const newContent = increaseReadibility();
      setContent(newContent);
    }
  });

  // Custom toolbar options with Undo and Redo
  const headerTemplate = <span className='ql-formats'></span>;

  return (
    <>
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
      <button onClick={resetContent}>Reset Content</button>
      <button onClick={copyToClipboard}>Copy to Clipboard</button>
      <button onClick={improveReadibility}>Improve Readibility</button>
      <button onClick={addLineBreak}>Add Line Break</button>
    </>
  );
};

export default EditorBaseBlank;
