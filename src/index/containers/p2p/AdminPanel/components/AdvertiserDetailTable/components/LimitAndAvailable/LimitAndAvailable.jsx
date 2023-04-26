import React from 'react';
import { NumberFormat } from 'ui';

import styles from '../../AdvertiserDetailTable.module.less';

const LimitAndAvailable = ({ available, limits, selectedCoin }) => (
  <div className={styles.limitAndAvailable}>
    <div className={styles.limitAndAvailable__row}>
      <span className={styles.limitAndAvailable__title}>Available</span>
      <span className={styles.limitAndAvailable__value}>
        <NumberFormat number={available} currency={selectedCoin} />
      </span>
    </div>
    <div className={styles.limitAndAvailable__row}>
      <span className={styles.limitAndAvailable__title}>Limit</span>
      <div className={styles.limitAndAvailable__value}>
        <span>{limits[0]}</span>
        &nbsp;<span>-</span>&nbsp;
        <span>{limits[1]}</span>
      </div>
    </div>
  </div>
);

export default LimitAndAvailable;
