import React from 'react';
import WalletsTotalBalance from '../WalletsTotalBalance/WalletsTotalBalance';

import './WalletsHeader.less';

function WalletsHeader() {
  return (
    <div className="WalletsHeader">
      <div className="WalletsHeader__col">
        <WalletsTotalBalance amount={1} totalType="up" total={1} />
      </div>
      <div className="WalletsHeader__col"></div>
    </div>
  );
}

export default WalletsHeader;
