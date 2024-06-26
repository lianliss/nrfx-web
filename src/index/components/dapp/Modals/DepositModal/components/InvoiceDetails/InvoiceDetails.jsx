import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Web3Context } from 'services/web3Provider';
import {setInvoice} from "src/actions/dapp/wallet";

// Components
import DepositModal from '../../DepositModal';
import { Input, Button, Row } from 'src/ui';
import PhoneInput from 'react-phone-number-input/input';

// Utils
import { adaptiveSelector } from 'src/selectors';
import * as actions from 'src/actions';
import * as toast from 'src/actions/toasts';
import wait from 'src/utils/wait';
import { getLang } from 'src/utils';

// Styles
import './InvoiceDetails.less';

function InvoiceDetails(props) {
  const dispatch = useDispatch();
  const adaptive = useSelector(adaptiveSelector);
  const context = React.useContext(Web3Context);
  const { currency, amount } = props;
  const { accountAddress, isConnected, addInvoice, getInvoice, cancelInvoice } = context;
  const phoneInputRef = React.useRef(null);
  const invoice = useSelector(state => _.get(state, `dapp.invoices.${currency}`));

  const [phone, setPhone] = React.useState();
  const [name, setName] = React.useState();
  const [lastName, setLastName] = React.useState();
  const [isProcess, setIsProcess] = React.useState(false);

  const Label = ({ title, children }) => {
    return (
      <label className="DepositModal__WithdrawalDetails__label">
        <span>{title}</span>
        {children}
      </label>
    );
  };

  const onBack = () => {
    actions.openModal('deposit_choose_bank', {
      currency: currency.toUpperCase(),
      amount,
    });
  };

  const onConfirm = async () => {
    if (!isConnected) return;
    if (!_.get(phone, 'length', '')
      || !_.get(name, 'length', '')
      || !_.get(lastName, 'length', '')) {
      toast.error(getLang('dapp_modal_details_empty'));
      return;
    }

    setIsProcess(true);
    try {
      if (invoice) {
        try {
          await cancelInvoice(currency);
        } catch (error) {
          console.error('[onConfirm] cancelInvoice', error);
        }
      }
      await addInvoice(amount, currency, phone, name, lastName);
      const newInvoice = await getInvoice(currency);
      const invoiceObject = {};
      invoiceObject[currency] = newInvoice;
      dispatch(setInvoice(invoiceObject));
      toast.success('Invoice added');
      actions.openModal("swift_generated", {
        currency: currency,
      });
    } catch (error) {
      console.error('[onConfirm]', error);
      toast.error(error.message);
    }
    setIsProcess(false);
  };

  const phoneOnInputHandler = (e) => {
    setTimeout(() => {
      const valueLength = e.target.value.length;
      if (valueLength > 3) return;

      e.target.setSelectionRange(valueLength, valueLength);
    }, 50);
  };

  const setLatinValueToState = (text, setter) => {
    setter(text.replace(/[А-Яа-я0-9]+/, ''));
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
          {getLang('dapp_global_full_name')} (
          {getLang('dapp_only_latin_characters')})
        </span>
        <Input
          type="text"
          value={name}
          onChange={(e) => setLatinValueToState(e.target.value, setName)}
          placeholder={getLang('dapp_global_name')}
        />
        <Input
          type="text"
          value={lastName}
          onChange={(e) => setLatinValueToState(e.target.value, setLastName)}
          placeholder={getLang('dapp_global_last_name')}
        />
      </label>
      <Row className="DepositModal__WithdrawalDetails__buttons" wrap={adaptive}>
        <Button type="secondary-alice" onClick={onBack} shadow>
          {getLang('global_back')}
        </Button>
        <Button
          type="lightBlue"
          state={isProcess ? 'loading' : ''}
          onClick={onConfirm}
        >
          {getLang('global_confirm')}
        </Button>
      </Row>
    </DepositModal>
  );
}

export default InvoiceDetails;
