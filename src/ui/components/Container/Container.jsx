import React from 'react';

// Styles
import './Container.less';

function Container({ children, maxWidth }) {
  return (
    <div className="Container" style={{ maxWidth }}>
      {children}
    </div>
  );
}

export default Container;
