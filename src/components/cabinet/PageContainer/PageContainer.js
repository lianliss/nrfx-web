import './PageContainer.less';

import React from 'react';

function PageContainer({ children }) {
  return (
    <div className="PageContainer">
      {children}
    </div>
  )
}

export default PageContainer;
