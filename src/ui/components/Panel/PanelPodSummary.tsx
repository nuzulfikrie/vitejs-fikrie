import React from 'react';
import EditorBaseBlank from '../Editor/EditorBaseBlank';

interface PanelPodSummaryProps {
  summary: string;
  loading: boolean;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}

const PanelPodSummary: React.FC<PanelPodSummaryProps> = ({
  summary,
  loading,
  showSuccess,
  showError,
}) => {
  return (
    <div className='col-md-12'>
      {loading ? (
        <div className='panel panel-default'>
          <div className='panel-body'>
            <div className='container'>
              <div className='loading-spinner'></div>
            </div>
          </div>
        </div>
      ) : (
        <div className='panel panel-info'>
          <div className='panel-heading fill'>
            <span className='panel-title'>Summary</span>
          </div>
          <div className='panel-body'>
            <EditorBaseBlank
              initialContent={summary}
              readibility={false}
              showSuccess={showSuccess}
              showError={showError}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelPodSummary;
