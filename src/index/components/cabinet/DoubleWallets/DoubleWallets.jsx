import React from 'react';

// Components
import SVG from 'utils/svg-wrap';

// Styles
import './DoubleWallets.less';

function DoubleWallets() {
  return (
    <div className="DoubleWallets">
      <SVG src={require('src/asset/icons/wallets/bnb.svg')} />
      <SVG src={require('src/asset/icons/wallets/btc.svg')} />
      BNB-BTC
    </div>
  );
}

export default DoubleWallets;
