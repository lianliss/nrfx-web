import React from 'react';
import { useSelector } from 'react-redux';
import { Web3Context } from 'services/web3Provider';

// Components
import DepositModal from '../../DepositModal';
import { Input, Button, Row } from 'src/ui';

// Utils
import { adaptiveSelector } from 'src/selectors';
import * as actions from 'src/actions';
import * as toast from "src/actions/toasts";
import wait from 'src/utils/wait';

// Styles
import './InvoiceDetails.less';

function InvoiceDetails(props) {
  const adaptive = useSelector(adaptiveSelector);
  const context = React.useContext(Web3Context);
  const {currency, amount} = props;
  const {accountAddress, isConnected, addInvoice, getInvoicePDF} = context;

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
    setIsProcess(true);
    try {
      await addInvoice(amount, currency, phone, name, lastName);
      await wait(1000);
      await getInvoicePDF();
      toast.success('Invoice added');
      await wait(4000);
      props.onClose();
    } catch (error) {
      console.error('[onConfirm]', error);
      toast.error(error.message);
    }
    setIsProcess(false);
  };

  return (
    <DepositModal
      {...props}
      className="DepositModal__WithdrawalDetails"
      closeOfRef
    >
      <h3 className="DepositModal__WithdrawalDetails__title">
        Specify the details
      </h3>
      <label className="DepositModal__WithdrawalDetails__label">
        <span>Phone number</span>
        <Input type="text" value={phone}
               onChange={e => setPhone(e.target.value)}
               placeholder="+7 (xxx) xxx-xxxx" />
      </label>
      <label className="DepositModal__WithdrawalDetails__label">
        <span>Full name (only latin characters)</span>
        <Input type="text" value={name}
               onChange={e => setName(e.target.value)}
               placeholder="Name" />
        <Input type="text" value={lastName}
               onChange={e => setLastName(e.target.value)}
               placeholder="Last name" />
      </label>
      <Row className="DepositModal__WithdrawalDetails__buttons" wrap={adaptive}>
        <Button type="secondary-alice" onClick={onBack} shadow>
          Back
        </Button>
        <Button type="lightBlue"
                state={isProcess ? 'loading' : ''}
                onClick={onConfirm}>
          Сonfirm
        </Button>
      </Row>
    </DepositModal>
  );
}

export default InvoiceDetails;
