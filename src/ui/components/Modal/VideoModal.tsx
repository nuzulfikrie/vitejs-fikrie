import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';

interface VideoModalProps {
  videoData?: string | undefined | null;
  modalVideoVisible: boolean;
  setModalVideoVisible: (modalVideoVisible: boolean) => void;
}
const putvideo = (videoData?: string) => {
  return <div dangerouslySetInnerHTML={{ __html: videoData }} />;
};
const VideoModal: React.FC<VideoModalProps> = ({
  videoData,
  modalVideoVisible,
  setModalVideoVisible,
}: VideoModalProps) => {
  const [dataAlreadyLoaded, setDataAlreadyLoaded] = useState(false);

  if (videoData && !dataAlreadyLoaded) {
    setDataAlreadyLoaded(true);
  }
  //dangerously set inner html for videodata

  if (videoData === null || videoData === undefined) {
    return;
  } else {
    return (
      <Dialog
        header='Video Instructions'
        visible={modalVideoVisible}
        style={{ width: '50vw' }}
        onHide={() => setModalVideoVisible(false)}
      >
        {putvideo(videoData)}
      </Dialog>
    );
  }
};

export default VideoModal;
