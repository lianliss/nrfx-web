import React from 'react';

import { classNames as cn } from 'utils';

import './WalletsList.less';

function WalletsList({ children, className }) {
  return <div className={cn('WalletsList', className)}>{children}</div>;
}

export default WalletsList;
