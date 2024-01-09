import React, { useState } from 'react';

const TextPanel = ({ text }) => {
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  return (
    <div className='text-panel'>
      <div className='text-content'>{text}</div>
      <button onClick={copyToClipboard} className='copy-button'>
        Copy Text
      </button>
      {copySuccess && <div className='copy-success-message'>{copySuccess}</div>}
    </div>
  );
};

export default TextPanel;
