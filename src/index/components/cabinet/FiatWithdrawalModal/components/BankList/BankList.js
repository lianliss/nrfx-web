import './BankList.less'

import React from 'react';
import SVG from 'react-inlinesvg';

export default props => {
  return (
    <div className="BankList">
      <div className="BankList__item">
        <div className="BankList__item__title">Bank Negara Indonesia</div>
        <div className="BankList__item__logo">
          <SVG src={require('src/asset/banks/bni.svg')} />
        </div>
        <div className="BankList__item__arrow">
          <SVG src={require('src/asset/24px/angle-right.svg')} />
        </div>
      </div>
    </div>
  );
}
