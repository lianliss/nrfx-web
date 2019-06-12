import './Col.less';

import React from 'react';


function Col({ xs = 12, sm = 12, md = 4, lg = 3, className, children }) {
  return (
    <div className={`col col-xs-${xs} col-sm-${sm} col-md-${md} col-lg-${lg} ${className}`}>
      {children}
    </div>
  )
}

export default React.memo(Col);