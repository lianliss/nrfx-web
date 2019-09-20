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
  constructor(props) {
    super(props);
  }

  state = {
    selectDepositType: 'static',
    amount: '',
    gaCode: '',
    errorGaCode: false
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
      <UI.Modal noSpacing isOpen={true} onClose={() => (this.props.close())}>
        <UI.ModalHeader>
          {utils.getLang('withdraw_Income')}
        </UI.ModalHeader>
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
                onTextChange={this.__amountDidChange}
                value={this.state.amount}
              />
              <p className="Form__helper__text">Available: {payment.available} {currency}</p>
            </div>
            <UI.Button type="outline" smallPadding onClick={this.__maxDidPress}>{utils.getLang('cabinet_withdrawalModal_max')}</UI.Button>
          </div>
          <div className="WithdrawalModal__row">
            <UI.Input
              type="number"
              autoComplete="off"
              indicator={<div className="OpenDepositModal__ga_icon" /> }
              value={this.state.gaCode}
              onChange={this.__handleGAChange}
              placeholder={utils.getLang('site__authModalGAPlaceholder')}
              onKeyPress={(e) => (e.key === 'Enter' && this.state.gaCode.length < 6) ? this.__handleSubmit() : null}
              error={this.state.errorGaCode}
              disabled={this.state.amount.length < 1}
            />
          </div>
          <div className="WithdrawalModal__button_wrap">
            <UI.Button style={{ width: '208px' }} disabled={!this.__formIsValid()}>
              {utils.getLang('general_withdraw')}
            </UI.Button>
          </div>
          <div className="WithdrawalModal__icon" style={{ backgroundImage: `url(${currencyInfo.icon})` }} />
        </div>
      </UI.Modal>
    )
  }

  __formIsValid = () => {
    return this.state.gaCode.length > 5 && this.state.amount.length > 0;
  };

  __amountDidChange = (amount) => {
    if (amount && !`${amount}`.match(/^\d{0,8}(\.\d{0,8}){0,1}$/)) {
      return false;
    }
    this.setState({amount})
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
      this.props.close();
    }).catch((info) => {
      switch (info.code) {
        case "ga_auth_code_incorrect": {
          return this.__inputError(this, 'errorGaCode');
        }
        default:
          alert(info.message);
          break;
      }
    });
  };
}

export default storeUtils.getWithState(
  CLASSES.WITHDRAWAL_COINS_MODAL,
  WithdrawalModal
);