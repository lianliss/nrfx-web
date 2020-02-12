import './Badge.less';

import React from 'react';

function Badge({ count, children }) {
  return (
    <div className="Badge">
      {children}
      <span className="Badge__count">{count}</span>
    </div>
  )
}

export default Badge;
