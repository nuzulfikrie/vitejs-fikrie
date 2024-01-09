import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

// Define the props interface
interface EditorBasicProps {
  htmlContent: string;
  increaseReadibility: boolean;
}

const EditorBasic: React.FC<EditorBasicProps> = ({
  htmlContent,
  increaseReadibility,
}) => {
  const quillRef = useRef<HTMLDivElement>(null);

  // Function to increase readability
  const increaseReadibilityFn = (content: string) => {
    const spanRegex = /(<span class="pod_text"[^>]*>.*?<\/span>)/g;
    return content.replace(spanRegex, '$1\n');
  };

  useEffect(() => {
    if (quillRef.current) {
      const quill = new Quill(quillRef.current, {
        theme: 'snow',
      });

      // Process content for readability if required
      const content = increaseReadibility
        ? increaseReadibilityFn(htmlContent)
        : htmlContent;

      quill.clipboard.dangerouslyPasteHTML(content);
    }
  }, [htmlContent, increaseReadibility]);

  return <div ref={quillRef}></div>;
};

export default EditorBasic;
