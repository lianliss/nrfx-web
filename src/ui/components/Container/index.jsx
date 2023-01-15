import React from 'react';

import { classNames as cn } from 'utils';

// Styles
import './index.less';

function Container({ children, maxWidth, padding, className }) {
  const maxWidthWithPadding = padding ? maxWidth + padding * 2 : maxWidth;

  return (
    <div
      className={cn('Container', className)}
      style={{
        maxWidth: maxWidthWithPadding,
        paddingLeft: padding,
        paddingRight: padding,
      }}
    >
      {children}
    </div>
  );
}

export default Container;
