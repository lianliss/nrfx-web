import React from 'react';

// Components
import { Row, Col, Button } from 'ui';
import { Message } from 'dapp';
import SVG from 'utils/svg-wrap';
import { Select } from 'dapp';
import { PaymentItem, FormInput } from 'src/index/components/p2p';

// Utils
import warnIcon from 'src/asset/icons/status/warn-orange.svg';
import { classNames as cn } from 'utils';

// Styles
import styles from './Form.module.less';

function Form({ payment, adaptive, onCancel, onConfirm, getFiatsArray }) {
  const buttonSize = adaptive ? 'big' : 'moderate';
  const [currency, setCurrency] = React.useState(payment.currencies.split(',')[0]);
  const currencies = payment.currencies.split(',').map(c => ({value: c, label: c}));
  const [holder, setHolder] = React.useState('');
  const [accountNumber, setAccountNumber] = React.useState('');

  return (
    <div className={styles.form}>
      <h2>Set my payment method</h2>
      <Message
        style={{ padding: adaptive ? '18px 20px' : '18px 29px' }}
        disableClosing
        border
      >
        <Row>
          <SVG src={warnIcon} className={styles.warnIcon} flex />
          <p>
            <span className="black-gunmetal-color">Tips:</span> The added
            payment method will be shown to the buyer during the transaction to
            accept fiat transfers. Please ensure that the information is
            correct, real, and matches your KYC information on Binance.
          </p>
        </Row>
      </Message>
      <PaymentItem
        title={payment.title}
        className={styles.paymentItem}
        size="large"
      />
      <Col gap={adaptive ? 15 : 20}>
        <Select
          value={currency}
          onChange={setCurrency}
          options={currencies}
          type="simple"
          indicatorIcon={require('src/asset/icons/arrows/form-dropdown.svg')}
        />
        <FormInput
          value={holder}
          onChange={setHolder}
          label="Full name"
          placeholder="Please enter your full name"
        />
        <FormInput
          value={accountNumber}
          onChange={setAccountNumber}
          label="Account Number"
          placeholder="Please enter your bank account number"
        />
      </Col>
      <p className={cn(styles.warning, 'cool-gray-color')}>
        <span className="black-gunmetal-color">Tips:</span> The added payment
        method will be shown to the buyer during the transaction to accept fiat
        transfers. Please ensure that the information is correct, real, and
        matches your KYC information on Binance.
      </p>
      <div className={styles.buttons}>
        <Button type="secondary-light" size={buttonSize} onClick={onCancel}>
          <span className="light-blue-gradient-color">Cancel</span>
        </Button>
        <Button type="lightBlue" size={buttonSize} onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default Form;
