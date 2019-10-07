import './ManageBalanceModal.less';

import React, { useState, useEffect } from 'react';
import UI from '../../../ui';
import * as utils from '../../../utils';
import * as balanceActions from '../../../actions/cabinet/balance';
import * as actions from '../../../actions';

export default props => {
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
        icon: currencyInfo.icon,
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
    if (amount && amount > 0) {
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
        <div className="ManageBalanceModal__row">
          <div className="ManageBalanceModal__icon" style={{backgroundImage: `url(${currentOption.icon})`}} />
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
            value={amount === 0 ? "" : amount}
            placeholder="0.00"
            onKeyPress={e => utils.__doubleInputOnKeyPressHandler(e, amount)}
            onTextChange={value => changeAmount(value)}
            error={touched && (!amount || amount <= 0)}
          />
          <UI.Button
            smallPadding
            type="outline"
            currency={currency}
            onClick={() => {
              changeAmount(currentOption.amount || "0" );
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
//
// {"type":"order_completed","body":{"order_id":2199786}}
// {"type":"orders_filled","body":[{"id":2199558,"action":"sell","type":"limit","primary_coin":"btc","secondary_coin":"usdt","amount":0.05,"filled":0.05,"price":8170.56405},{"id":2199563,"action":"sell","type":"limit","primary_coin":"btc","secondary_coin":"usdt","amount":0.051500000000000004,"filled":0.05,"price":8202.731625},{"id":2199786,"action":"buy","type":"limit","primary_coin":"btc","secondary_coin":"usdt","amount":0.1,"filled":0.1,"price":9000}]}