import React from 'react';

import { classNames as cn } from 'utils';

function Column({ children, className }) {
  return (
    <div className={cn('ValidatorTradeForm-col', className)}>{children}</div>
  );
}

export default Column;
