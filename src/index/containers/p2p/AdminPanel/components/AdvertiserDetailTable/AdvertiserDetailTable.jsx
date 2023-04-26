import React from 'react';
import PropTypes from 'prop-types';

import { Row } from 'ui';
import { DesktopTR, MobileTR } from './components';
import CabinetTable, { TR, TD, Tip } from 'dapp/CabinetTable/CabinetTable';

import styles from './AdvertiserDetailTable.module.less';

const Header = () => (
  <TR>
    <TD>Coin</TD>
    <TD>
      <Row alignItems="center">
        Price
        <Tip style={{ background: 'rgba(255, 93, 23, 0.6)' }}>
          lowest to highest
        </Tip>
      </Row>
    </TD>
    <TD>Limit/Available</TD>
    <TD>Payment</TD>
    <TD>
      <Row alignItems="center">
        Trade <Tip style={{ background: '#00B277' }}>0 Fee</Tip>
      </Row>
    </TD>
  </TR>
);

const AdvertiserDetailTable = ({ items, adaptive }) => {
  const AdaptiveTR = adaptive ? MobileTR : DesktopTR;

  return (
    <div className={styles.AdvertiserDetailTable}>
      <CabinetTable header={<Header />} type="fullColumn">
        {items.map((item, key) => (
          <AdaptiveTR
            {...item}
            selectedCoin="USDT"
            key={`${item.coin.symbol}-${key}`}
          />
        ))}
      </CabinetTable>
    </div>
  );
};

AdvertiserDetailTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      coin: PropTypes.object,
      price: PropTypes.number,
      available: PropTypes.number,
      limits: PropTypes.arrayOf(PropTypes.number),
      payment: PropTypes.shape({
        title: PropTypes.string,
        color: PropTypes.string,
      }),
      selectedCoin: PropTypes.string,
      onTrade: PropTypes.func,
    })
  ),
};

export default AdvertiserDetailTable;
