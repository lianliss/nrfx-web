import './ManageBalanceModal.less';

import React from 'react';
import UI from '../../../ui';

import * as utils from '../../../utils';
import * as storeUtils from '../../../storeUtils';
import * as CLASSES from '../../../constants/classes';
import * as balanceActions from '../../../actions/cabinet/balance';
import * as actions from '../../../actions';
import ModalState from '../ModalState/ModalState';

class ManageBalanceModal extends React.Component {
  constructor(props) {
    super(props);

    this.isWithdrawalOnly = !!props.withdrawal;
    this.category = props.category || 'exchange';

    this.state = {
      amount: null,
      type: this.isWithdrawalOnly ? 'withdraw' : 'deposit',
      wallets: [],
      balances: [],
      selectedId: null,
      loadingStatus: 'loading',
      touched: false,
      isFormSending: false,
    };
  }

  get currency() {
    return this.currentOption.currency;
  }

  componentDidMount() {
    this.__load();
  }

  __load() {
    this.setState({ loadingStatus: 'loading' });
    balanceActions.getBalance(this.category).then((res) => {
      if (this.props.currency) {
        let items;
        if (this.state.type === 'deposit') {
          items = res.wallets;
        } else {
          items = res.balances;
        }

        for (let item of items) {
          if (item.currency === this.props.currency) {
            this.setState({ selectedId: item.id });
            break;
          }
        }
      }

      this.setState({ loadingStatus: '', ...res });
    }).catch((err) => this.setState({ loadingStatus: err.error_name }))
  }

  get options() {
    let items;
    if (this.state.type === 'deposit') {
      items = this.state.wallets;
    } else {
      items = this.state.balances;
    }

    return items.map((item) => {
      const currencyInfo = actions.getCurrencyInfo(item.currency);
      return {
        value: item.id,
        title: utils.ucfirst(currencyInfo.name),
        amount: item.amount,
        currency: item.currency,
        note: utils.formatDouble(item.amount) + ' ' + item.currency.toUpperCase()
      };
    });
  }

  __amountDidChange = (amount) => {
    if (isNaN(amount)) {
      return;
    }

    this.setState({ amount });
  };

  get currentOption() {
    for (let option of this.options) {
      if (option.value === this.state.selectedId) {
        return option;
      }
    }

    return this.options[0];
  }

  __maxDidPress = () => {
    this.setState({ amount: this.currentOption.amount || 0 });
  };

  render() {
    if (this.state.loadingStatus) {
      return (
        <ModalState status={this.state.loadingStatus} onRetry={this.__load} />
      );
    }

    return (
      <UI.Modal isOpen={true} onClose={this.props.onClose}>
        <UI.ModalHeader>{utils.getLang('cabinet_manageBalance_title')}</UI.ModalHeader>
        <div className="ManageBalanceModal">
          <div className="ManageBalanceModal__row">
            {!this.isWithdrawalOnly && <UI.SwitchTabs
              currency={this.currency}
              selected={this.state.type}
              onChange={(type) => this.setState({ type })}
              tabs={[
                { value: 'deposit', label: utils.getLang('cabinet_manageBalance_add') },
                { value: 'withdraw', label: utils.getLang('cabinet_manageBalance_withdraw') },
              ]}
            />}
          </div>
          <div className="EManageBalanceModal__row">
            <UI.Dropdown
              value={this.currentOption}
              placeholder=""
              options={this.options}
              onChange={item => this.setState({ selectedId: item.value })}
            />
          </div>
          <div className="ManageBalanceModal__row ManageBalanceModal__input_button">
            <UI.Input
              type="number"
              value={this.state.amount === null ? '' : this.state.amount}
              placeholder="0.00"
              onKeyPress={e => utils.__doubleInputOnKeyPressHandler(e, amount)}
              onTextChange={this.__amountDidChange}
              error={this.state.touched && (!this.state.amount || this.state.amount <= 0 )}
            />
            <UI.Button
              smallPadding
              type="outline"
              currency={this.currency}
              onClick={this.__maxDidPress}
            >
              {utils.getLang('cabinet_sendCoinsModal_max')}
            </UI.Button>
          </div>
          <div className="ManageBalanceModal__submit_wrap">
            <UI.Button
              currency={this.currency}
              onClick={this.__handleSubmit}
              state={this.state.isFormSending ? 'loading' : ''}
            >
              { this.state.type === 'deposit' ? utils.getLang('cabinet_manageBalance_add_button') : utils.getLang('cabinet_manageBalance_withdraw_button') }
            </UI.Button>
          </div>
        </div>
      </UI.Modal>
    )
  }

  __handleSubmit = () => {
    this.setState({ touched: true });
    if (this.state.amount > 0) {
      this.setState({ isFormSending: true });
      balanceActions[this.state.type]({
        from: this.currentOption.value,
        amount: this.state.amount,
        currency: this.currency,
      })
        .then(() => this.props.onClose())
        .catch(() => this.setState({ isFormSending: false }));
    }
  };
}

export default storeUtils.getWithState(
  CLASSES.EXCHANGE_BALANCE_MODAL,
  ManageBalanceModal
);
