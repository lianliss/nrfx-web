import React from 'react';

// Components
import SVG from 'utils/svg-wrap';

// Styles
import './BackgroundBit.less';

function BackgroundBit({ src, rotate, ...styles }) {
  return (
    <div
      className="BackgroundBit"
      style={{ ...styles, transform: rotate && `rotate(${rotate}deg)` }}
    >
      <SVG src={src} />
    </div>
  );
}

export default BackgroundBit;
