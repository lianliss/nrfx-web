import './ReceiveCoinsModal.less';

import React from 'react';
import UI from '../../../../ui';
import SVG from 'react-inlinesvg';
import QRCode from 'qrcode.react';

import * as actions from '../../../../actions';
import * as walletsActions from '../../../../actions/cabinet/wallets';
import LoadingStatus from '../../cabinet/LoadingStatus/LoadingStatus';
import * as utils from '../../../../utils';
import copyText from 'clipboard-copy';

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
      <UI.Modal isOpen={true} onClose={this.props.onClose} width={480}>
        <UI.ModalHeader>
          {utils.getLang('cabinet_receiveCoinsModal_name')} { utils.ucfirst(currencyInfo.name)}
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

      let options = this.state.wallets.filter(w => w.status !== 'pending');
      options = options.map(item => {
        const info = actions.getCurrencyInfo(item.currency);
        return {
          title: utils.ucfirst(info.name),
          note: `${utils.formatDouble(item.amount)} ${item.currency.toUpperCase()}`,
          value: item.currency
        }
      });

      if (!(options.length > 0)) {
        return <div style={{textAlign:'center'}}>
          {utils.getLang('cabinet_sendCoinsModal_available')}
        </div>;
      }

      let wallet = this.wallet;
      let placeholder = options[0];
      if (Object.keys(this.state.dropDownCurrentItem).length > 0) {
        placeholder = this.state.dropDownCurrentItem;
      } else {
        let preset = null;
        if (this.props.hasOwnProperty('preset')) {
          preset = options.filter((opt) => opt.title === this.props.preset)[0];
          setTimeout(() => {
            this.setState({ currency: preset.value, isCopied: false, dropDownCurrentItem: preset });
          }, 0)
        }
      }

      return (
        <div className="ReceiveCoinsModal">
          <div className="SendCoinsModal__wallet">
            <div className="SendCoinsModal__wallet__icon" style={{ backgroundImage: `url(${currencyInfo.icon})` }} />
            {options.length > 0 &&
              <UI.Dropdown
                value={placeholder}
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
          <div className="ReceiveCoinsModal__warning">
            {utils.getLang('cabinet_receiveCoinsModal_onlySend')} {utils.ucfirst(currencyInfo.name)} {this.state.currency.toUpperCase()}
            {' ' + utils.getLang('cabinet_receiveCoinsModal_toThisAddress')}
          </div>
          <div className="SendCoinsModal__row">
            <UI.Input
              value={wallet.address}
              onClick={this.__copy}
              indicatorWidth={34}
              indicator={
                <SVG src={require('../../../../asset/24px/copy.svg')} className="ReceiveCoinsModal__copy_btn" />
              }
              readOnly
            />
          </div>
          <div className="SendCoinsModal__row ReceiveCoinsModal__button_wrap">
            <div className="ReceiveCoinsModal__button">
              {this.state.isCopied && <SVG src={require('../../../../asset/16px/check.svg')} className="ReceiveCoinsModal__copied_icon" />}
              <UI.Button
                currency={this.state.currency}
                onClick={() => {
                  if (this.state.isCopied) {
                    this.props.close();
                  } else {
                    this.__copy();
                  }
                }}>{this.state.isCopied ? utils.getLang('global_close') : utils.getLang('cabinet_copyWalletAddress')}</UI.Button>
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
    copyText(this.wallet.address).then(() => {
      this.setState({ isCopied: true });
    });
  };
}
