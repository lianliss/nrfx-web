import React from 'react';

import './WalletsList.less';

function WalletsList({ children }) {
  return <ul className="WalletsList">{children}</ul>;
}

export default WalletsList;
