import React from 'react';

import { SwitchTabs } from 'ui';
import { AdvertiserDetailTable } from '../../components';
import { Pagination } from 'src/index/components/p2p/components/UI/';

import { p2pMode } from 'src/index/constants/dapp/types';
import KNOWN_FIATS from 'src/index/constants/knownFiats';
import { testPayments } from '../../../Orders/components/Filters/testItems';

import styles from './AdvertiserDetail.module.less';

const testItems = [
  {
    coin: KNOWN_FIATS[0],
    price: 15333.33,
    available: 1000,
    limits: [25, 135],
    payment: testPayments[0],
  },
  {
    coin: KNOWN_FIATS[0],
    price: 15333.33,
    available: 1000,
    limits: [25, 135],
    payment: testPayments[0],
  },
  {
    coin: KNOWN_FIATS[0],
    price: 15333.33,
    available: 1000,
    limits: [25, 135],
    payment: testPayments[0],
  },
  {
    coin: KNOWN_FIATS[0],
    price: 15333.33,
    available: 1000,
    limits: [25, 135],
    payment: testPayments[0],
  },
  {
    coin: KNOWN_FIATS[0],
    price: 15333.33,
    available: 1000,
    limits: [25, 135],
    payment: testPayments[0],
  },
];

const Switch = ({ selected, onChange, tabs }) => (
  <div className={styles.switchContainer}>
    <SwitchTabs
      selected={selected}
      type="secondary-alice"
      onChange={onChange}
      tabs={tabs}
    />
  </div>
);

const AdvertiserDetail = ({ adaptive }) => {
  const [selectedPage, setSelectedPage] = React.useState('online-ads');

  const pages = [
    { label: 'Online Ads', value: 'online-ads' },
    { label: 'Feedback(59)', value: 'feedback' },
  ];

  return (
    <div className={styles.AdvertiserDetail__wrapper}>
      {adaptive && (
        <Switch
          selected={selectedPage}
          onChange={setSelectedPage}
          tabs={pages}
        />
      )}
      <div className={styles.AdvertiserDetail}>
        {!adaptive && (
          <Switch
            selected={selectedPage}
            onChange={setSelectedPage}
            tabs={pages}
          />
        )}
        <h2>Buy from the user</h2>
        <AdvertiserDetailTable
          mode={p2pMode.buy}
          adaptive={adaptive}
          items={testItems}
        />
        <h2>Sell to the user</h2>
        <AdvertiserDetailTable
          mode={p2pMode.sell}
          adaptive={adaptive}
          items={testItems}
        />
        <Pagination />
      </div>
    </div>
  );
};

export default AdvertiserDetail;
