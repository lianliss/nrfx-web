import React from 'react';
import { useSelector } from 'react-redux';

// Components
import DepositModal from '../../DepositModal';
import { Input, Button, Row } from 'src/ui';
import PhoneInput from 'react-phone-number-input/input';
import * as actions from 'src/actions';

// Utils
import { adaptiveSelector } from 'src/selectors';
import { getLang } from 'src/utils';
import {Web3Context} from 'src/services/web3Provider';
import * as toasts from 'src/actions/toasts';
import ibanFiats from 'src/index/constants/ibanFiats';

// Styles
import './WithdrawalDetails.less';

function WithdrawalDetails(props) {
  const context = React.useContext(Web3Context);
  const {addWithdrawal, isConnected, connectWallet} = context;
  const adaptive = useSelector(adaptiveSelector);
  const {currency, amount, bank} = props;
  const [phone, setPhone] = React.useState('');
  const [accountNumber, setAccountNumber] = React.useState('');
  const [name, setName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const phoneInputRef = React.useRef(null);

  const backHandler = () => {
    actions.openModal('deposit_choose_bank', {
      currency,
      amount,
      type: 'withdrawal',
    });
  };

  const confirmHandler = () => {
    if (!_.get(phone, 'length', '')
      || !_.get(accountNumber, 'length', '')
      || !_.get(name, 'length', '')
      || !_.get(lastName, 'length', '')) {
      toasts.error(getLang('dapp_modal_details_empty'));
      return;
    }

    const accountHolder = `${name} ${lastName}`;
    addWithdrawal({
      accountHolder,
      accountNumber,
      currency,
      bank,
      amount,
      phone,
    });
    actions.openModal('deposit_withdrawal_transfer', {}, {});
  };

  const setLatinValueToState = (text, setter) => {
    setter(text.replace(/[А-Яа-я0-9]+/, ''));
  };

  const isWithdrawAvailable = !!accountNumber.length && !!name.length && !!lastName.length;
  const withdrawalAccountText = ibanFiats.includes(currency)
    ? 'IBAN'
    : getLang('dapp_global_card_number').toLowerCase();

  const phoneOnInputHandler = (e) => {
    setTimeout(() => {
      const valueLength = e.target.value.length;
      if (valueLength > 3) return;

      e.target.setSelectionRange(valueLength, valueLength);
    }, 50);
  };

  React.useEffect(() => {
    if (!phoneInputRef) return;
    if (!adaptive) return;

    phoneInputRef.current.addEventListener('input', phoneOnInputHandler);

    return () => {
      phoneInputRef.current.removeEventListener('input', phoneOnInputHandler);
    };
  }, [adaptive]);

  return (
    <DepositModal
      {...props}
      className="DepositModal__WithdrawalDetails"
      closeOfRef
    >
      <h3 className="DepositModal__WithdrawalDetails__title">
        {getLang('dapp_specify_the_details')}
      </h3>
      <label className="DepositModal__WithdrawalDetails__label">
        <span>{getLang('dapp_global_phone_number')}</span>
        <PhoneInput
          value={phone}
          onChange={setPhone}
          className="Input"
          placeholder="+7 (xxx) xxx-xxxx"
          ref={phoneInputRef}
        />
      </label>
      <label className="DepositModal__WithdrawalDetails__label">
        <span>
          {getLang('dapp_global_account')} ({withdrawalAccountText})
        </span>
        <Input type="text"
               value={accountNumber}
               onChange={e => setAccountNumber(e.target.value)}
               placeholder="0000 0000 0000 0000" />
      </label>
      <label className="DepositModal__WithdrawalDetails__label">
        <span>
          <span>
            {getLang('dapp_global_full_name')} (
            {getLang('dapp_only_latin_characters')})
        </span>
        </span>
        <Input type="text"
               value={name}
               onChange={e => setLatinValueToState(e.target.value, setName)}
               placeholder={getLang('dapp_global_name')} />
        <Input type="text"
               value={lastName}
               onChange={e => setLatinValueToState(e.target.value, setLastName)}
               placeholder={getLang('dapp_global_last_name')} />
      </label>
      <Row className="DepositModal__WithdrawalDetails__buttons" wrap={adaptive}>
        <Button type="secondary-alice" shadow onClick={backHandler}>
          {getLang('global_back')}
        </Button>
        {isConnected
          ? <Button type="lightBlue"
                               disabled={!isWithdrawAvailable}
                               onClick={confirmHandler}>
            {getLang('global_withdrawal')}
          </Button>
          : <Button type="lightBlue"
                            disabled={!isWithdrawAvailable}
                            onClick={connectWallet}>
            {getLang('dapp_global_connect_wallet')}
          </Button>}
      </Row>
    </DepositModal>
  );
}

export default WithdrawalDetails;
