import React from 'react';

import * as utils from '../../../../utils/index';
import * as actions from '../../../../actions/index';

export default currency => {
  const currencyInfo = actions.getCurrencyInfo(currency.name);

  return (
    <div className="EmptyWalletBox">
      <div style={{ backgroundImage: `url(${currencyInfo.icon})` }} className="EmptyWalletBox__icon" />

      <div className="EmptyWalletBox__content Content_box">
        <h3>{utils.ucfirst(currencyInfo.name)}</h3>
        <p>Buy {utils.ucfirst(currencyInfo.name)}</p>
      </div>
    </div>
  )
}