import './WalletBox.less';

import React from 'react';
import SVG from 'react-inlinesvg';

import * as utils from '../../../utils';
import * as actions from '../../../actions';
import * as currencies from '../../../utils/currencies';

class WalletBox extends React.Component {
  constructor(props) {
    super(props);

    this.isGenerating = props.status === 'generating';
    this.currencyInfo = actions.getCurrencyInfo(props.currency);
  }

  render() {
    let selected = false;
    if (this.props.hasOwnProperty('walletSelected')) {
      if (this.props.walletSelected !== null) {
        if (this.props.walletSelected.currency === this.currencyInfo.abbr) {
          selected = true;
        }
      }
    }

    this.className = utils.classNames({
      WalletBox: true,
      WalletBox__inactive: this.isGenerating,
      WalletBox__selected: selected
    });

    return (
      <div className={this.className} onClick={() => {this.props.onClick()}}>
        <div style={{ backgroundImage: `url(${this.currencyInfo.icon})` }} className="WalletBox__icon" />

        <div
          className="WalletBox__content Content_box"
          style={selected ? {background: currencies.getGradientByCurrency(this.currencyInfo.abbr)} : {}}
        >
          {selected
            ? <SVG className="WalletBox__close" src={require('./asset/close.svg')} /> : ''
          }
          <h3>{utils.ucfirst(this.currencyInfo.name)}</h3>
          <p>{this.__getAmount()}</p>
        </div>

        {this.isGenerating
          ? <SVG className="WalletBox__loader" src={require('../../../asset/cabinet/loading.svg')} />
          : null}
      </div>
    )
  }

  __getAmount = () => {
    if (this.isGenerating) {
      return 'Generating';
    } else if (this.props.amount > 0) {
      return utils.formatDouble(this.props.amount, 1000000) + ' ' + this.props.currency.toUpperCase();
    } else {
      return 'None';
    }
  };
}

WalletBox.defaultProps = {
  onClick: () => {}
};

export default WalletBox;