import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { defineConfig, loadEnv } from 'vite';

// Create a context
const EditorContext = createContext({
    retrieveEditorContent: () => '',
});

export const useEditorContext = () => useContext(EditorContext);

interface EditorBaseProps {
    initialContent?: string | null;
    onEditorChange?: (content: string) => void;
}
interface ImportEnv {
    readonly TinyMCE: string;
}
const EditorBase: React.FC<EditorBaseProps> = ({ initialContent,onEditorChange }) => {
    const editorRef = useRef<any>(null);
    const [content, setContent] = useState(initialContent || '');
    useEffect(() => {
        // Initialize TinyMCE editor
        if (editorRef.current) {
            if (editorRef.current && editorRef.current.editor) {
                editorRef.current.editor.load().then(() => {
                    console.log('Editor is ready!');
                });
            }
        }
    }, []);

    const handleEditorChange = (content: string, editor: any) => {
        console.log('Content:', content);
        setContent(content);
        onEditorChange(content);
    };
    const Config  = {
        API: import.meta.env.TINYMCE,
    };

    const retrieveEditorContent = () => {
        // Retrieve the editor content
        if (editorRef.current) {
            return editorRef.current.getContent();
        }
        return '';
    }

    //read api key from .env
    let API = 'amt4uz48wpu3es269rzjnpjnnf7h2mn0m1txydxcqost6s3k';


    return (
        <EditorContext.Provider value={{ retrieveEditorContent }}>
            <div>
                <Editor
                    apiKey={API}
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue={content}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={handleEditorChange}
                />
            </div>
        </EditorContext.Provider>
    );
};

export default EditorBase;
//``/`
// to use this component
//1 - with initial content 
//<EditorBase initialContent={initialContent} />
//2 without initial content
//<EditorBase />

//how to access the content from external component
//```js
//const { retrieveEditorContent } = useEditorContext();
//const content = retrieveEditorContent();

//```
