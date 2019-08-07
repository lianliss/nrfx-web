import './ReceiveCoinsModal.less';

import React from 'react';
import UI from '../../../ui';
import SVG from 'react-inlinesvg';
import QRCode from 'qrcode.react';

import * as actions from '../../../actions';
import * as walletsActions from '../../../actions/cabinet/wallets';
import LoadingStatus from '../../../components/cabinet/LoadingStatus/LoadingStatus';
import * as utils from '../../../utils';

export default class ReceiveCoinsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: 'btc',
      loadingStatus: 'loading',
      wallets: [],
      isCopied: false,
      dropDownCurrentItem: {}
    };
  }

  componentDidMount() {
    this.__load();
  }

  get wallet() {
    for (let i = 0; i < this.state.wallets.length; i++) {
      if (this.state.wallets[i].currency === this.state.currency) {
        return this.state.wallets[i];
      }
    }
  }

  render() {
    const currencyInfo = this.state.currency ? actions.getCurrencyInfo(this.state.currency) : {};
    return (
      <UI.Modal isOpen={true} onClose={() => {this.props.close()}} width={480}>
        <UI.ModalHeader>
          Receive {utils.ucfirst(currencyInfo.name)}
        </UI.ModalHeader>
        {this.__renderContent()}
      </UI.Modal>
    )
  }

  __renderContent() {
    if (this.state.loadingStatus) {
      return (
        <LoadingStatus
          inline
          status={this.state.loadingStatus}
        />
      )
    } else {
      const currencyInfo = actions.getCurrencyInfo(this.state.currency);

      const options = this.state.wallets.map((item) => {
        const info = actions.getCurrencyInfo(item.currency);
        return {
          title: utils.ucfirst(info.name),
          note: `${utils.formatDouble(item.amount)} ${item.currency.toUpperCase()}`,
          value: item.currency
        }
      });

      let wallet = this.wallet;

      return (
        <div className="ReceiveCoinsModal">
          <div className="SendCoinsModal__wallet">
            <div className="SendCoinsModal__wallet__icon" style={{ backgroundImage: `url(${currencyInfo.icon})` }} />
            {options.length > 0 &&
              <UI.Dropdown
                placeholder={
                  Object.keys(this.state.dropDownCurrentItem).length == 0 ? options[0] : this.state.dropDownCurrentItem
                }
                options={options}
                onChange={(item) => {
                  this.setState({ currency: item.value, isCopied: false, dropDownCurrentItem: item })
                }}
              />
            }
          </div>
          <div className="SendCoinsModal__row ReceiveCoinsModal__qrcode">
            <QRCode value={wallet.address} size={192} />
          </div>
          <div className="ReceiveCoinsModal__warning">Only send {utils.ucfirst(currencyInfo.name)} ({this.state.currency.toUpperCase()})  to this address</div>
          <div className="SendCoinsModal__row">
            <UI.Input
              value={wallet.address}
              onClick={this.__copy}
              indicator={
                <SVG src={require('../../../asset/24px/copy.svg')} className="ReceiveCoinsModal__copy_btn" />
              }
              readOnly
            />
          </div>
          <div className="SendCoinsModal__row ReceiveCoinsModal__button_wrap">
            <div className="ReceiveCoinsModal__button">
              {this.state.isCopied && <SVG src={require('../../../asset/16px/check.svg')} className="ReceiveCoinsModal__copied_icon" />}
              <UI.Button onClick={() => {
                if (this.state.isCopied) {
                  window.history.back();
                } else {
                  this.__copy();
                }
              }}>{this.state.isCopied ? 'Close': 'Copy Wallet Address'}</UI.Button>
            </div>
          </div>
        </div>
      )
    }
  }

  __load = () => {
    this.setState({ loadingStatus: 'loading' });
    walletsActions.getWallets().then((wallets) => {
      this.setState({ loadingStatus: '', wallets });
    }).catch(() => {
      this.setState({ loadingStatus: 'failed' });
    });
  };

  __copy = () => {
    utils.copyText(this.wallet.address);
    this.setState({ isCopied: true });
  };
}
