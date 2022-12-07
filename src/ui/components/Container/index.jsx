import React from 'react';

import { classNames as cn } from 'utils';

// Styles
import './index.less';

function Container({ children, maxWidth, className }) {
  return (
    <div className={cn('Container', className)} style={{ maxWidth }}>
      {children}
    </div>
  );
}

export default Container;
