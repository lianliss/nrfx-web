import './WithdrawalModal.less';

import React from 'react';
import UI from '../../../ui';

import * as actions from '../../../actions';
import * as CLASSES from "../../../constants/classes";
import * as storeUtils from "../../../storeUtils";
import router from "../../../router";
import * as utils from "../../../utils";
import * as investmentsActions from "../../../actions/cabinet/investments";

class WithdrawalModal extends React.Component {
  state = {
    selectDepositType: 'static',
    amount: '',
    gaCode: '',
    errorGaCode: false,
    success: false
  };

  getPayment = () => {
    return this.props.payments.filter(item => item.currency.toUpperCase() === this.props.currency)[0];
  };

  load = () => {
    switch (router.getState().params.section) {
      default:
        this.props.loadWallets();
        !this.props.loaded && this.props.loadInvestments();
        break;
    }
  };

  componentDidMount() {
    this.load();
  }

  render() {
    if (this.props.wallets.length < 1 || this.props.payments.length < 1) {
      return utils.getLang('cabinet_modal_loadingText');
    }

    if (!this.props.hasOwnProperty('currency')) {
      return utils.getLang('cabinet_modal_loadingErrorText');
    }

    const payment = this.getPayment();
    const currency = this.props.currency.toUpperCase();
    const currencyInfo = actions.getCurrencyInfo(currency);
    let wallet = this.props.wallets.filter(w => w.currency === currency.toLowerCase());
    if (!(wallet.length > 0)) {
      return 'Error';
    }
    this.wallet = wallet[0];

    return (
      <UI.Modal className="WithdrawalModal__wrapper" noSpacing isOpen={true} onClose={() => (this.props.close())}>
        <UI.ModalHeader>
          {utils.getLang('withdraw_Income')}
        </UI.ModalHeader>
        { !this.state.success ? (
          <div className="WithdrawalModal">
            <div className="WithdrawalModal__info_row">
              <div className="WithdrawalModal__info_row__title">{utils.getLang('cabinet_withdrawalModal_beAware')}</div>
              <div className="WithdrawalModal__info_row__caption">{utils.getLang('cabinet_withdrawalModal_eachRequestText')}</div>
            </div>
            <div className="WithdrawalModal__info_row">
              <div className="WithdrawalModal__info_row__title">{utils.getLang('cabinet_withdrawalModal_attention')}</div>
              <div className="WithdrawalModal__info_row__caption">{utils.getLang('cabinet_withdrawalModal_moreThanText')}</div>
            </div>
            <div className="WithdrawalModal__row WithdrawalModal__row_amount">
              <div className="WithdrawalModal__row_amount__input">
                <UI.Input
                  autoFocus
                  placeholder="0"
                  indicator={this.props.currency.toUpperCase()}
                  onKeyPress={e => utils.__doubleInputOnKeyPressHandler(e, this.state.amount)}
                  onTextChange={amount => {
                    this.setState({amount});
                  }}
                  value={this.state.amount}
                  error={this.state.amount > payment.available}
                />
                <p className="Form__helper__text">{utils.getLang("global_available")}: {utils.formatDouble(payment.available)} {currency}</p>
              </div>
              <UI.Button
                currency={currencyInfo.abbr}
                type="outline"
                smallPadding
                onClick={this.__maxDidPress}
              >{utils.getLang('cabinet_withdrawalModal_max')}</UI.Button>
            </div>
            <div className="WithdrawalModal__row">
              <UI.Input
                type="number"
                autoComplete="off"
                indicator={<div className="OpenDepositModal__ga_icon" /> }
                value={this.state.gaCode}
                onChange={this.__handleGAChange}
                placeholder={utils.getLang('site__authModalGAPlaceholder')}
                onKeyPress={this.__onKeyPressHandler}
                error={this.state.errorGaCode}
                disabled={this.state.amount.length < 1}
              />
            </div>
            <div className="WithdrawalModal__button_wrap">
              <UI.Button
                currency={currencyInfo.abbr}
                style={{ width: '208px' }}
                onClick={this.__handleSubmit}
                disabled={!this.__formIsValid()}
              >
                {utils.getLang('general_withdraw')}
              </UI.Button>
            </div>
            <div className="WithdrawalModal__icon" style={{ backgroundImage: `url(${currencyInfo.icon})` }} />
          </div>
        ) : (
          <div className="WithdrawalModal success">
            <div
              className="WithdrawalModal__success_icon"
              style={{backgroundImage: `url(${require('../../../asset/120/success.svg')})`}}
            />
            <h4>{utils.getLang('cabinet_withdrawalModal_successTitle')}</h4>
            <p>{utils.getLang('cabinet_withdrawalModal_successText')}</p>
            <UI.Button style={{ width: '208px' }} onClick={this.props.close}>
              {utils.getLang('global_ok')}
            </UI.Button>
          </div>
        )}
      </UI.Modal>
    )
  }

  __onKeyPressHandler = e => {
    utils.InputNumberOnKeyPressHandler(e);
    if (e.key === 'Enter' && this.state.gaCode.length < 6) {
      this.__handleSubmit();
    }
  };

  __formIsValid = () => {
    return this.state.gaCode.length === 6 && this.state.amount > 0;
  };

  __maxDidPress = () => {
    const payment = this.getPayment();
    this.setState({ amount: payment.available });
  };

  __handleGAChange = (e) => {
    const val = e.target.value;

    if (val.length <= 6) {
      this.setState({gaCode: val}, () => {
        if (val.length === 6) {
          this.__handleSubmit();
        }
      });
    }
  };

  __buildParams() {
    return {
      wallet_id: this.wallet.id,
      amount: this.state.amount,
      ga_code: this.state.gaCode
    };
  }

  __inputError(node, stateField) {
    node.setState({
      [stateField]: true
    }, () => {
      setTimeout(() => {
        node.setState({
          [stateField]: false
        });
      }, 1000)
    });
  }

  __handleSubmit = () => {
    if (!this.__formIsValid()) return;
    investmentsActions.withdrawAdd(this.__buildParams()).then((info) => {
      this.setState({ success: true });
    }).catch((info) => {
      switch (info.code) {
        case "ga_auth_code_incorrect": {
          this.props.toastPush(utils.getLang("incorrect_code"), "error");
          return this.__inputError(this, 'errorGaCode');
        }
        default:
          this.props.toastPush(info.message, "error");
          break;
      }
    });
  };
}

export default storeUtils.getWithState(
  CLASSES.WITHDRAWAL_COINS_MODAL,
  WithdrawalModal
);