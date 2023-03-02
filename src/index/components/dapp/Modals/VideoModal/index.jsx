import React from 'react';
import { useSelector } from 'react-redux';

// Components
import { CabinetModal } from 'dapp';

// Utils
import { adaptiveSelector } from 'src/selectors';

// Styles
import './index.less';

function VideoModal({ title, link, ...props }) {
  const adaptive = useSelector(adaptiveSelector);

  return (
    <CabinetModal
      {...props}
      className="DappVideoModal"
      closeButton={!adaptive}
      closeOfRef={adaptive}
    >
      <h3>{title}</h3>
      {link ? (
        <iframe
          src={link}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <div>No video</div>
      )}
    </CabinetModal>
  );
}

export default VideoModal;