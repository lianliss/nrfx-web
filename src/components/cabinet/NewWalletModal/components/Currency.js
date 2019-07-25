import React from 'react';
import SVG from 'react-inlinesvg';

import UI from '../../../../ui';

function Currency() {
  return(
    <UI.Hover className="NewWalletModal__currency">
      <div className="NewWalletModal__currency__content">
        <div className="NewWalletModal__currency__type">
          <SVG src={require('../../../../asset/cabinet/crypto/BTC.svg')} />
          <p className="NewWalletModal__currency__name">Bitcoin</p>
        </div>
        <div>
          <p className="NewWalletModal__currency__code">BTC</p>
          <SVG src={require('../../../../asset/cabinet/angle_right.svg')} />
        </div>
      </div>
    </UI.Hover>
  )
}

export default React.memo(Currency);