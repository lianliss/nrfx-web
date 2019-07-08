import './WalletBox.less';

import React from 'react';
import SVG from 'react-inlinesvg';

import { classNames } from '../../../utils';


function WalletBox({ crypto, children, isGenerating }) {
  const className = classNames({
    WalletBox: true,
    WalletBox__inactive: !!isGenerating,
  });

  return (
    <div className={className}>
      <img src={crypto.icon} alt="Crypto" className="WalletBox__icon" />

      <div className="WalletBox__content Content_box">
        <h3>{crypto.name}</h3>
        <p>{isGenerating ? 'Generating' : 'subtitle'}</p>
      </div>

      {isGenerating
        ? <SVG className="WalletBox__loader" src={require('../../../asset/cabinet/loading.svg')} alt="Loading" />
        : null}
    </div>
  )
}

export default WalletBox;