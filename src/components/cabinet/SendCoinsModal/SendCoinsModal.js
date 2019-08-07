import './SendCoinsModal.less';

import React from 'react';
import UI from '../../../ui';

import * as actions from '../../../actions';
import * as walletsActions from '../../../actions/cabinet/wallets';
import LoadingStatus from '../../../components/cabinet/LoadingStatus/LoadingStatus';
import * as utils from '../../../utils';

export default class SendCoinsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedWallet: false,
      currency: 'btc',
      loadingStatus: 'loading',
      wallets: [],
      amount: 0,
      amountUSD: 0,
      address: ''
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
      <UI.Modal isOpen={true} onClose={() => this.props.close()} width={552}>
        <UI.ModalHeader>
          Send {utils.ucfirst(currencyInfo.name)}
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

      let sendButtonDisabled = true;
      if (this.__checkItsReady()) {
        sendButtonDisabled = false;
      }

      return (
        <div className="SendCoinsModal">
          <div className="SendCoinsModal__wallet">
            <div className="SendCoinsModal__wallet__icon" style={{ backgroundImage: `url(${currencyInfo.icon})` }} />
            {options.length > 0 && <UI.Dropdown
              placeholder={options[0]}
              value={this.state.selectedWallet}
              options={options}
              onChange={(item) => this.setState({ currency: item.value, amount: 0, amountUSD: 0, selectedWallet: item })}
            />}
          </div>
          <div className="SendCoinsModal__row">
            <UI.Input
              value={this.state.address}
              placeholder="Enter BitcoinBot Login or Wallet Address"
              onTextChange={this.__addressChange}
            />
          </div>
          <div className="SendCoinsModal__row SendCoinsModal__amount">
            <UI.Input
              placeholder="0"
              indicator={this.state.currency.toUpperCase()}
              onTextChange={this.__amountDidChange}
              value={this.state.amount || ''}
            />
            <UI.Input
              placeholder="0"
              indicator="USD"
              onTextChange={this.__usdAmountDidChange}
              value={this.state.amountUSD}
            />
            <UI.Button smallPadding type="outline" onClick={this.__maxDidPress}>Max</UI.Button>
          </div>
          <div className="SendCoinsModal__submit_wrap">
            <UI.Button
              onClick={this.__sendButtonHandler}
              disabled={sendButtonDisabled}
            >
              Send
            </UI.Button>
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

  __amountDidChange = (amount) => {
    if (amount && !`${amount}`.match(/^\d{0,8}(\.\d{0,8}){0,1}$/)) {
      return false;
    }

    this.setState({ amount, amountUSD: utils.formatDouble(amount * this.wallet.to_usd) });
  };

  __usdAmountDidChange = (amountUSD) => {
    if (amountUSD && !`${amountUSD}`.match(/^\d{0,15}(\.\d{0,15}){0,1}$/)) {
      return false;
    }

    this.setState({ amountUSD, amount: utils.formatDouble(amountUSD / this.wallet.to_usd) });
  };

  __addressChange = (address) => {
    this.setState({ address });
  };

  __maxDidPress = () => {
    const amount = this.wallet.amount;
    this.setState({ amount: amount, amountUSD: utils.formatDouble(amount * this.wallet.to_usd) });
  };

  __checkItsReady() {
    return this.state.address.length > 0 &&
      this.state.selectedWallet &&
      this.state.amount > 0 &&
      this.state.amountUSD > 0;
  }

  __sendButtonHandler = () => {
    if (!this.__checkItsReady()) return;

    this.props.openModalPage('confirm', {
      currency: this.state.currency,
      amount: this.state.amount,
      address: this.state.address
    });
    return;

    this.props.openModalPage('receive');
    return;
    const params = {
      //wallet_id: this.state.selectedWallet.id,
      address: this.state.address,
      amount: this.state.amount,
      //ga_code: ""
    };
  }
}
