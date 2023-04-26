import React from 'react';
import { NumberFormat } from 'ui';

import styles from '../../AdvertiserDetailTable.module.less';

const LimitAndAvailable = ({ available, limits, selectedCoin }) => (
  <div className={styles.limit_available}>
    <div className={styles.limit_available__row}>
      <span className={styles.limit_available__title}>Available</span>
      <span className={styles.limit_available__value}>
        <NumberFormat number={available} currency={selectedCoin} />
      </span>
    </div>
    <div className={styles.limit_available__row}>
      <span className={styles.limit_available__title}>Limit</span>
      <span className={styles.limit_available__value}>
        {limits[0]} - {limits[1]}
      </span>
    </div>
  </div>
);

export default LimitAndAvailable;
