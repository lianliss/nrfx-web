import React from 'react';
import PropTypes from 'prop-types';

import './VideoModal.less';

function VideoModal({ type, link, handleClose }) {  
  return (
    <div className={'VideoModal ' + `VideoModal-${type}`}>
      <div className="VideoModal__bg" />
      <div className="VideoModal__container">
        <iframe
          src={link}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="VideoModal__close" onClick={handleClose}>
        ✖
      </div>
    </div>
  );
}

VideoModal.propTypes = {
  type: PropTypes.oneOf('video', 'shorts'),
  link: PropTypes.string,
  handleClose: PropTypes.func,
};

VideoModal.defaultProps = {
  type: 'video',
  link: '/',
  handleClose: () => {},
};

export default VideoModal;
