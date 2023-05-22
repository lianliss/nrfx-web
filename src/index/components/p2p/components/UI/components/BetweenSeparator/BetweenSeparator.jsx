import React from 'react';
import { classNames as cn } from 'utils';

// Styles
import styles from './BetweenSeparator.module.less';

function BetweenSeparator({ children, className }) {
  return (
    <div className={cn(styles.BetweenSeparator, className)}>{children}</div>
  );
}

export default BetweenSeparator;
