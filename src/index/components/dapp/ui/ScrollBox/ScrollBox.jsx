import React from 'react';

// Utils
import { classNames as cn } from 'utils';

// Styles
import styles from './ScrollBox.module.less';

function ScrollBox({
  children,
  padding,
  maxHeight,
  height,
  style,
  customizedScroll = true,
  ...props
}) {
  return (
    <div
      className={cn(styles.scrollBox, { customizedScroll })}
      style={{ padding, maxHeight, height, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

export default ScrollBox;
