import React from 'react';

// Styles
import './Overlay.less';

function Overlay({ children, backdropFilter, background }) {
  return (
    <div className="DappUI__Overlay">
      <div
        className="DappUI__Overlay__bg"
        style={{ backdropFilter, background }}
      />
      <div className="DappUI__Overlay__container">{children}</div>
    </div>
  );
}

export default Overlay;
