import React from 'react';

// Components
import { Button, SwitchTabs } from 'ui';
import { AdsFilters, AdsTable, PaymentMethodsTable } from '../../components';

// Styles
import styles from './TableLayout.module.less';

const Switch = ({ selected, onChange }) => (
  <div className={styles.switchContainer}>
    <SwitchTabs
      selected={selected}
      onChange={onChange}
      isAnimated
      type="secondary-alice"
      tabs={[
        { value: 'methods', label: 'P2P Payment Methods' },
        { value: 'my-ads', label: 'My ads' },
        { value: 'feedback', label: 'Feedback (0)' },
        { value: 'blacklist', label: 'Blacklist' },
      ]}
    />
  </div>
);

function TableLayout({ adaptive }) {
  const [selected, setSelected] = React.useState('my-ads');

  const TitleBlock = ({ title, subtitle, onAction, actionText }) => (
    <>
      <h2 className={styles.TableLayout__title}>{title}</h2>
      <div className={styles.TableLayout__subtitle__wrapper}>
        <p className={styles.TableLayout__subtitle}>{subtitle}</p>
        <Button
          type="secondary-light"
          size={adaptive ? 'big' : 'moderate'}
          onClick={onAction}
          className={styles.actionButton}
        >
          <span className="light-blue-gradient-color">{actionText}</span>
        </Button>
      </div>
    </>
  );

  return (
    <>
      {adaptive && <Switch selected={selected} onChange={setSelected} />}
      <div className={styles.TableLayout}>
        <div className={styles.TableLayout__header}>
          {!adaptive && <Switch selected={selected} onChange={setSelected} />}
          {selected === 'methods' && (
            <TitleBlock
              title="P2P Payment Methods"
              subtitle={
                'P2P payment methods: When you sell cryptocurrencies,' +
                'the payment method added will be displayed to buyer as options to' +
                'accept payment, please ensure that the account owner’s name is consistent' +
                ' with your verified name on Binance. You can add up to 20 ' +
                'payment methods.'
              }
              actionText="Add a payment method"
              onAction={() => {}}
            />
          )}
          {selected === 'my-ads' && (
            <TitleBlock
              title="My Ads"
              subtitle={
                'P2P payment methods: When you sell cryptocurrencies,' +
                'the payment method added will be displayed to buyer as options to' +
                'accept payment, please ensure that the account owner’s name is consistent' +
                ' with your verified name on Binance. You can add up to 20 ' +
                'payment methods.'
              }
              actionText="Post new Ad"
              onAction={() => {}}
            />
          )}
          {selected === 'my-ads' && <AdsFilters adaptive={adaptive} />}
        </div>
        {selected === 'methods' && <PaymentMethodsTable adaptive={adaptive} />}
        {selected === 'my-ads' && <AdsTable adaptive={adaptive} />}
      </div>
    </>
  );
}

export default TableLayout;
