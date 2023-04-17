import React from 'react';

// Components
import { Button, SwitchTabs } from 'ui';
import { PaymentMethodsTable } from '../../components';

// Styles
import styles from './PaymentMethods.module.less';

const Switch = ({ selected, onChange }) => (
  <div className={styles.switchContainer}>
    <SwitchTabs
      selected={selected}
      onChange={onChange}
      isAnimated
      type="secondary-alice"
      tabs={[
        { value: 'methods', label: 'P2P Payment Methods' },
        { value: 'ads', label: 'My ads' },
        { value: 'feedback', label: 'Feedback (0)' },
        { value: 'blacklist', label: 'Blacklist' },
      ]}
    />
  </div>
);

function PaymentMethods({ adaptive }) {
  const [selected, setSelected] = React.useState('methods');

  return (
    <>
      {adaptive && <Switch selected={selected} onChange={setSelected} />}
      <div className={styles.PaymentMethods}>
        {!adaptive && <Switch selected={selected} onChange={setSelected} />}
        <h2 className={styles.PaymentMethods__title}>P2P Payment Methods</h2>
        <div className={styles.PaymentMethods__subtitle__wrapper}>
          <p className={styles.PaymentMethods__subtitle}>
            P2P payment methods: When you sell cryptocurrencies, the payment
            method added will be displayed to buyer as options to accept
            payment, please ensure that the account owner’s name is consistent
            with your verified name on Binance. You can add up to 20 payment
            methods.
          </p>
          <Button type="secondary-light" size={adaptive ? 'big' : 'moderate'}>
            <span className="light-blue-gradient-color">
              Add a payment method
            </span>
          </Button>
        </div>
        <PaymentMethodsTable adaptive={adaptive} />
      </div>
    </>
  );
}

export default PaymentMethods;
