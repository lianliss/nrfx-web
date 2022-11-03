import React from 'react';

// Styles
import './Overlay.less';

function Overlay({ children }) {
  return (
    <div className="DappUI__Overlay">
      <div className="DappUI__Overlay__bg" />
      <div className="DappUI__Overlay__container">{children}</div>
    </div>
  );
}

export default Overlay;
