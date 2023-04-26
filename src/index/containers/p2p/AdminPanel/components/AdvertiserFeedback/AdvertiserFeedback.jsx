import React from 'react';

import { Col, Row, NumberFormat } from 'ui';

import { classNames as cn } from 'utils';

import styles from './AdvertiserFeedback.module.less';

const AdvertiserFeedback = ({ adaptive }) => {
  return (
    <div className={styles.AdvertiserFeedback}>
      <Col gap={adaptive ? 5 : 0}>
        <p className={styles.AdvertiserFeedback__title}>Positive Feedback</p>
        <div className={styles.positiveFeedback}>
          <span className={styles.positiveFeedback__percent}>
            <NumberFormat number={98} percent />
          </span>
          <span className={styles.positiveFeedback__amount}>(1386)</span>
        </div>
      </Col>
      <Row
        gap={adaptive ? 10 : 16}
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Row gap={6} alignItems="flex-end">
          <span className={styles.AdvertiserFeedback__title}>Positive</span>
          <div className={cn(styles.AdvertiserFeedback__tip, 'green')}>
            <span>54</span>
          </div>
        </Row>
        <Row gap={6} alignItems="flex-end">
          <span className={styles.AdvertiserFeedback__title}>Negative</span>
          <div className={cn(styles.AdvertiserFeedback__tip, 'red')}>5</div>
        </Row>
      </Row>
    </div>
  );
};

export default AdvertiserFeedback;
