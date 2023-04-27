import React from 'react';

import DexSwap from '../DexSwap/DexSwap';
import TradingViewWidget from 'dapp/TradingViewWidget/TradingViewWidget';
import { Row } from 'ui';

import styles from './ProDex.module.less';

const ProDex = () => {
  return (
    <div className={styles.ProDex}>
      <Row alignItems="stretch" gap={17}>
        <div className={styles.tradingViewWidget}>
          <TradingViewWidget />
        </div>
        <DexSwap />
      </Row>
    </div>
  );
};

export default ProDex;
