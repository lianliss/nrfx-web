import React from 'react';
import SVG from 'react-inlinesvg';
import UI from '../../../../../ui';

import * as utils from '../../../../../utils';

function Currency({ name, abbr, icon }) {
  return(
    <UI.Hover className="NewWalletModal__currency">
      <div className="NewWalletModal__currency__content">
        <div className="NewWalletModal__currency__type">
          <div className="NewWalletModal__currency__icon" style={{ backgroundImage: `url(${icon})` }} />
          <p className="NewWalletModal__currency__name">{utils.ucfirst(name)}</p>
        </div>
        <div>
          <p className="NewWalletModal__currency__code">{abbr.toUpperCase()}</p>
          <SVG src={require('../../../../../asset/cabinet/angle_right.svg')} />
        </div>
      </div>
    </UI.Hover>
  )
}

export default React.memo(Currency);