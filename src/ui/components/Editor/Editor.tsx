import React, { useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
interface EditorProps {
    data: string;
}

const Editor: React.FC<EditorProps> = ({ data, onChange }) => {
    const editorInstance = useRef<ClassicEditor | null>(null);

    const editorConfiguration = {
        toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'blockQuote',
            'insertTable',
            'undo',
            'redo'
        ]
    };

    useEffect(() => {
        editorInstance.current?.setData(data);
    }, [data]);
if(data){
    
    return (
        <CKEditor
            editor={ClassicEditor}
            data={data}
            onReady={editor => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
            }}
            onChange={(event) => {
                console.log(event);
            }}
            onBlur={(event, editor) => {
                console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
                console.log('Focus.', editor);
            }}
        />
    );
}
   
};

export default Editor;