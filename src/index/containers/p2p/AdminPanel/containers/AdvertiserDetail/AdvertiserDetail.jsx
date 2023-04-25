import React from 'react';

import { SwitchTabs, Row, NumberFormat, Button, Col } from 'ui';
import CabinetTable, { TR, TD, Tip } from 'dapp/CabinetTable/CabinetTable';
import { PaymentItem } from 'src/index/components/p2p';
import { WalletIcon } from 'dapp';

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

const DesktopTR = ({
  coin,
  price,
  available,
  limits,
  payment,
  selectedCoin,
  onTrade,
}) => (
  <TR>
    <TD>
      <Row alignItems="center" gap={8}>
        <WalletIcon currency={coin} size={24} />
        <span>{coin?.symbol.toUpperCase()}</span>
      </Row>
    </TD>
    <TD>
      <Col>
        <span>
          <NumberFormat number={price} currency={coin.symbol} />
        </span>
      </Col>
    </TD>
    <TD>
      <Row>
        <div className={styles.limit_available}>
          <span className={styles.limit_available__title}>Available</span>
          <span className={styles.limit_available__value}>
            <NumberFormat number={available} currency={selectedCoin} />
          </span>
          <span className={styles.limit_available__title}>Limit</span>
          <span className={styles.limit_available__value}>
            {limits[0]} - {limits[1]}
          </span>
        </div>
      </Row>
    </TD>
    <TD>
      {payment && (
        <div className={styles.Payment}>
          <PaymentItem title={payment.title} color={payment.color} />
        </div>
      )}
    </TD>
    <TD>
      <Button size="extra_small" type="lightBlue" onClick={onTrade}>
        <span>Buy USDT</span>
      </Button>
    </TD>
  </TR>
);
const MobileTR = () => <div></div>;
const Table = ({ items }) => (
  <div className={styles.Table}>
    <CabinetTable
      header={
        <TR>
          <TD>Coin</TD>
          <TD>
            Price
            <Tip style={{ background: 'rgba(255, 93, 23, 0.6)' }}>
              lowest to highest
            </Tip>
          </TD>
          <TD>Limit/Available</TD>
          <TD>Payment</TD>
          <TD>
            Trade <Tip style={{ background: '#00B277' }}>0 Fee</Tip>
          </TD>
        </TR>
      }
      type="fullColumn"
    >
      {testItems.map((item, key) => (
        <DesktopTR
          {...item}
          selectedCoin="USDT"
          key={`${item.coin.symbol}-${key}`}
        />
      ))}
    </CabinetTable>
  </div>
);

const Switch = ({ selected, onChange, tabs }) => (
  <div className={styles.Switch}>
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
        <Table />
      </div>
    </div>
  );
};

export default AdvertiserDetail;
