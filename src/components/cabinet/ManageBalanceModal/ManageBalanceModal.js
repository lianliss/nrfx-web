import './ManageBalanceModal.less';

import React, { useState, useEffect } from 'react';
import UI from '../../../ui';
import * as utils from '../../../utils';
import * as storeUtils from '../../../storeUtils';
import * as CLASSES from '../../../constants/classes';
import * as balanceActions from '../../../actions/cabinet/balance';
import * as actions from '../../../actions';

const ManageBalanceModal = props => {
  const [ type, changeType ] = useState("deposit");
  const [ amount, changeAmount ] = useState(0);
  const [ id, changeId ] = useState();
  const [ touched, touch ] = useState(false);
  const [ balance, changeBalance ] = useState({
    balances: [],
    wallets: []
  });


  const getOptions = items => {
    return items.map( item => {
      const currencyInfo = actions.getCurrencyInfo(item.currency);
      return {
        value: item.id,
        title: utils.ucfirst(currencyInfo.name),
        amount: item.amount,
        currency: item.currency,
        note: utils.formatDouble(item.amount) + " " + item.currency.toUpperCase()
      }
    });
  };

  const options = getOptions(type === "deposit" ? balance.wallets : balance.balances);
  const currentOption = options.find( item => item.value === id) || options[0] || {};
  const { currency } = currentOption;

  useEffect(() => {
    balanceActions.getBalance('exchange').then((res) => {
      changeBalance(res);
    })
  }, []);

  const __handleSubmit = () => {
    touch(true);
    if (amount) {
      balanceActions[type]({
        from: currentOption.value,
        amount,
        currency
      }).then(() => {
        props.onClose();
      })
    }
  }

  return (
    <UI.Modal isOpen={true} onClose={props.onClose}>
      <UI.ModalHeader>Manage Exchange Balance</UI.ModalHeader>
      <div className="ManageBalanceModal">
        <div className="ManageBalanceModal__row">
          <UI.SwitchTabs
            currency={currency}
            selected={type}
            onChange={changeType}
            tabs={[
              { value: 'deposit', label: 'Add' },
              { value: 'withdraw', label: 'Withdraw' }
            ]}
          />
        </div>
        <div className="EManageBalanceModal__row">
          <UI.Dropdown
            value={currentOption}
            placeholder=""
            options={options}
            onChange={item => changeId(item.value)}
          />
        </div>
        <div className="ManageBalanceModal__row ManageBalanceModal__input_button">
          <UI.Input
            type="number"
            value={amount > 0 ? amount : ""}
            placeholder="0.00"
            onTextChange={value => changeAmount(parseFloat(value))}
            error={touched && !amount}
          />
          <UI.Button
            smallPadding
            type="outline"
            currency={currency}
            onClick={() => {
              changeAmount(currentOption.amount || 0 );
            }}
          >
            {utils.getLang('cabinet_sendCoinsModal_max')}
          </UI.Button>
        </div>
        <div className="ManageBalanceModal__submit_wrap">
          <UI.Button
            currency={currency}
            onClick={__handleSubmit}
            disabled={false}
          >
            { type === "deposit" ? "Add From Wallets" : "Withdraw to Wallets" }
          </UI.Button>
        </div>
      </div>
    </UI.Modal>
  )
}

export default storeUtils.getWithState(
  CLASSES.EXCHANGE_BALANCE_MODAL,
  ManageBalanceModal
);
