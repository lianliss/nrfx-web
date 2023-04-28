import React from 'react';

import DexSwap from '../DexSwap/DexSwap';
import TradingViewWidget from 'dapp/TradingViewWidget/TradingViewWidget';
import { Row } from 'ui';
import HistoryTable from './components/HistoryTable/HistoryTable';

import styles from './ProDex.module.less';
import KNOWN_FIATS from '../../../constants/knownFiats';

const ProDex = () => {
  return (
    <div className={styles.ProDex}>
      <Row alignItems="stretch" gap={17}>
        <div className={styles.tradingViewWidget}>
          <TradingViewWidget />
        </div>
        <DexSwap />
      </Row>
      <div className={styles.tradeHistory__wrapper}>
        <h2>Trade history</h2>
        <HistoryTable
          coin="USD"
          items={[
            {
              currency: {
                source_token: KNOWN_FIATS[0],
                target_token: KNOWN_FIATS[1],
                source_amount: 0.56666,
                target_amount: 1600000,
              },
              coinRate: 143.7,
              time: '15 sec',
              tx_hash: 'test',
            },
            {
              currency: {
                source_token: KNOWN_FIATS[0],
                target_token: KNOWN_FIATS[1],
                source_amount: 0.56666,
                target_amount: 1600000,
              },
              coinRate: 143.7,
              time: '15 sec',
              tx_hash: 'tes2t',
            },
            {
              currency: {
                source_token: KNOWN_FIATS[0],
                target_token: KNOWN_FIATS[1],
                source_amount: 0.56666,
                target_amount: 1600000,
              },
              coinRate: 143.7,
              time: '15 sec',
              tx_hash: 'te3st',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ProDex;
