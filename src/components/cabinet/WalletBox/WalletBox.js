import './WalletBox.less';

import React from 'react';
import SVG from 'react-inlinesvg';

import * as utils from '../../../utils';
import * as actions from '../../../actions';


function WalletBox({ currency, status, amount }) {
  const isGenerating = status === 'generating';
  const currencyInfo = actions.getCurrencyInfo(currency);

  const className = utils.classNames({
    WalletBox: true,
    WalletBox__inactive: isGenerating,
  });

  const getAmount = () => {
    if (isGenerating) {
      return 'Generating';
    } else if (amount > 0) {
      return utils.formatDouble(amount);
    } else {
      return 'None';
    }
  };

  return (
    <div className={className}>
      <div style={{ backgroundImage: `url(${currencyInfo.icon})` }} className="WalletBox__icon" />

      <div className="WalletBox__content Content_box">
        <h3>{utils.ucfirst(currencyInfo.name)}</h3>
        <p>{getAmount()}</p>
      </div>

      {isGenerating
        ? <SVG className="WalletBox__loader" src={require('../../../asset/cabinet/loading.svg')} />
        : null}
    </div>
  )
}

export default WalletBox;