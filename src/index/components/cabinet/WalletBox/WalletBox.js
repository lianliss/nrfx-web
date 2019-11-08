import './WalletBox.less';

import React from 'react';
import SVG from 'react-inlinesvg';

import * as utils from '../../../../utils';
import * as actions from '../../../../actions';
import * as currencies from '../../../../utils/currencies';
import * as modalGroupActions from '../../../../actions/modalGroup';

class WalletBox extends React.Component {
  constructor(props) {
    super(props);

    this.isGenerating = props.status === 'pending';
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
      <div className={this.className} onClick={this.isGenerating ? () => {} : this.__onClick}>
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
          ? <SVG className="WalletBox__loader" src={require('../../../../asset/cabinet/loading.svg')} />
          : null}
      </div>
    )
  }

  __getAmount = () => {
    if (this.isGenerating) {
      return utils.getLang('cabinet_walletBox_generating');
    } else if (this.props.amount > 0 || this.props.skipEmptyLabel) {
      return utils.formatDouble(this.props.amount, 6) + ' ' + this.props.currency.toUpperCase();
    } else {
      return utils.getLang('cabinet_walletTransactionModal_receive');
    }
  };

  __onClick = () => {
    if (this.props.amount > 0 || this.props.skipEmptyLabel) {
      return this.props.onClick && this.props.onClick();
    } else {
      return actions.openModal('receive', {
        preset: utils.ucfirst(this.currencyInfo.name)
      });
    }
  };
}

WalletBox.defaultProps = {
  onClick: () => {}
};

export default WalletBox;