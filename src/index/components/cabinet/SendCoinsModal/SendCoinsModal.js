import './SendCoinsModal.less';

import React from 'react';

import UI from '../../../../ui';

import * as actions from '../../../../actions';
import * as walletsActions from '../../../../actions/cabinet/wallets';
import LoadingStatus from '../../cabinet/LoadingStatus/LoadingStatus';
import * as utils from '../../../../utils';
import * as storeUtils from "../../../storeUtils";
import * as CLASSES from "../../../constants/classes";

import SendCoinsConfirmModal from '../../cabinet/SendCoinsConfirmModal/SendCoinsConfirmModal';
import * as api from "../../../../services/api";


class SendCoinsModal extends React.Component {
  componentDidMount() {
    this.__load();
  }

  state = {
    errorAddress: false
  };

  get getSelectedWalletInfo() {
    return this.props.thisState.wallets.filter(wallet => wallet.currency === this.props.thisState.selectedWallet.value);
  }

  get wallet() {
    for (let i = 0; i < this.props.thisState.wallets.length; i++) {
      if (this.props.thisState.wallets[i].currency === this.props.thisState.currency) {
        return this.props.thisState.wallets[i];
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    const currencyInfo = this.props.thisState.currency ? actions.getCurrencyInfo(this.props.thisState.currency) : {};
    return (
      <UI.Modal isOpen={true} onClose={this.props.onClose} width={552}>
        <UI.ModalHeader>
          {utils.getLang('cabinet_sendCoinsModal_name')}
        </UI.ModalHeader>
        {this.__renderContent()}
      </UI.Modal>
    )
  }

  __renderContent() {
    if (this.props.thisState.loadingStatus) {
      return (
        <LoadingStatus
          inline
          status={this.props.thisState.loadingStatus}
        />
      )
    } else {
      const currencyInfo = actions.getCurrencyInfo(this.props.thisState.currency);
      this.options = this.props.thisState.wallets.filter(w => w.status !== 'pending');
      this.options = this.options.map(item => {
        const info = actions.getCurrencyInfo(item.currency);
        return {
          title: utils.ucfirst(info.name),
          note: `${utils.formatDouble(item.amount)} ${item.currency.toUpperCase()}`,
          value: item.currency
        }
      });

      if (!(this.options.length > 0)) {
        return <div style={{textAlign:'center'}}>
          {utils.getLang('cabinet_sendCoinsModal_available')}
        </div>;
      }

      let sendButtonDisabled = true;
      if (this.__checkItsReady()) {
        sendButtonDisabled = false;
      }

      return (
        <div className="SendCoinsModal">
          <div className="SendCoinsModal__wallet">
            <div className="SendCoinsModal__wallet__icon" style={{ backgroundImage: `url(${currencyInfo.icon})` }} />
            {this.options.length > 0 && <UI.Dropdown
              placeholder={this.props.thisState.selectedWallet}
              value={this.props.thisState.selectedWallet}
              options={this.options}
              onChange={item => {
                this.__setState({currency: item.value, selectedWallet: item, address: '' });
                this.__amountDidChange(0);
              }}
            />}
          </div>
          <div className="SendCoinsModal__row">
            <UI.Input
              value={this.props.thisState.address}
              placeholder={utils.getLang('cabinet__coinsAddressPlaceholder')}
              onTextChange={this.__addressChange}
              error={this.state.errorAddress}
            />
          </div>
          <div className="SendCoinsModal__row SendCoinsModal__amount">
            <UI.Input
              placeholder="0"
              indicator={this.props.thisState.currency.toUpperCase()}
              onTextChange={this.__amountDidChange}
              onKeyPress={e => utils.__doubleInputOnKeyPressHandler(e, this.props.thisState.amount)}
              value={this.props.thisState.amount || undefined}
              error={this.state.errorAmount}
            />
            <UI.Input
              placeholder="0"
              indicator="USD"
              onTextChange={this.__usdAmountDidChange}
              onKeyPress={e => utils.__doubleInputOnKeyPressHandler(e, this.props.thisState.amountUSD)}
              value={this.props.thisState.amountUSD || undefined}
            />
            <UI.Button
              smallPadding
              type="outline"
              currency={currencyInfo}
              onClick={this.__maxDidPress}
            >
              {utils.getLang('cabinet_sendCoinsModal_max')}
            </UI.Button>
          </div>
          <div className="SendCoinsModal__submit_wrap">
            <UI.Button
              currency={currencyInfo}
              onClick={this.__sendButtonHandler}
              disabled={sendButtonDisabled}
            >
              {utils.getLang("global_send")}
            </UI.Button>
          </div>
        </div>
      )
    }
  }

  __load = () => {
    this.__setState({ loadingStatus: 'loading' });

    walletsActions.getWallets().then(wallets => {
      this.__setState({ loadingStatus: '', wallets });
      let preset = 'Bitcoin';

      if (this.props.hasOwnProperty('preset')) {
        preset = this.options.filter(opt => opt.title === this.props.preset)[0];
        this.__setState({currency: preset.value, selectedWallet: preset });
      } else {
        if (this.props.thisState.currency !== null) {
          let currency = actions.getCurrencyInfo(this.props.thisState.currency);
          preset = utils.ucfirst(currency.name)
        }
        preset = this.options.filter(opt => opt.title === preset)[0];
        this.__setState({currency: preset.value, selectedWallet: preset});
      }
    }).catch(() => {
      this.__setState({ loadingStatus: 'failed' });
    });
  };

  __amountDidChange = (amount) => {
    if (amount && !`${amount}`.match(/^\d{0,8}(\.\d{0,8}){0,1}$/)) {
      return false;
    }

    this.__setState({ amount, amountUSD: utils.formatDouble(amount * this.wallet.to_usd, 2) });
  };

  __usdAmountDidChange = (amountUSD) => {
    if (amountUSD && !`${amountUSD}`.match(/^\d{0,15}(\.\d{0,2}){0,1}$/)) {
      return false;
    }

    this.__setState({ amountUSD, amount: utils.formatDouble(amountUSD / this.wallet.to_usd) });
  };

  __addressChange = (address) => {
    this.__setState({ address });
  };

  __maxDidPress = () => {
    const amount = this.wallet.amount;
    this.__setState({ amount: amount, amountUSD: utils.formatDouble(amount * this.wallet.to_usd).toFixed(2) });
  };

  __setState = (value, key = null) => {
    this.props.setStateByModalPage('send', value, key);
  };

  __checkItsReady() {
    return this.props.thisState.address.length > 0 &&
      this.props.thisState.address.length < 256 &&
      this.props.thisState.selectedWallet &&
      (this.props.thisState.amount > 0 || this.props.thisState.amountUSD > 0)
  }

  __openConfirmModal = () => {
    const params = {
      wallet_id: this.getSelectedWalletInfo[0].id,
      currency: this.props.thisState.currency,
      amount: this.props.thisState.amount,
      address: this.props.thisState.address
    };
    actions.openModal('send_confirm', params, params);
  };

  __sendButtonHandler = () => {
    if (!this.__checkItsReady()) return;
    if (
      this.props.thisState.amount >
      this.props.wallets.find(w => w.currency === this.props.thisState.currency).amount
    ) {
      this.props.toastPush(utils.getLang("cabinet_notEnoughFunds"), "error");
      this.setState({
        errorAmount: true
      }, () => {
        setTimeout(() => {
          this.setState({
            errorAmount: false
          });
        }, 1000)
      });
      return;
    }

    if (this.props.thisState.address.length < 15) {
      api.post('profile/check_login/', {login: this.props.thisState.address}).then((data) => {
        this.__openConfirmModal();
      }).catch((err) => {
        this.setState({
          errorAddress: true
        }, () => {
          setTimeout(() => {
            this.setState({
              errorAddress: false
            });
          }, 1000)
        })
      });
    } else {
      this.__openConfirmModal();
    }
  }
}

export default storeUtils.getWithState(
  CLASSES.SEND_COINS_MODAL,
  SendCoinsModal
);
