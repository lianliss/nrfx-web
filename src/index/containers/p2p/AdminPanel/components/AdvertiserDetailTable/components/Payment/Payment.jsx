import React from 'react';
import { PaymentItem } from 'src/index/components/p2p';

import styles from '../../AdvertiserDetailTable.module.less';

const Payment = ({ payment }) => (
  <div className={styles.Payment}>
    <PaymentItem title={payment.title} color={payment.color} />
  </div>
);

export default Payment;
