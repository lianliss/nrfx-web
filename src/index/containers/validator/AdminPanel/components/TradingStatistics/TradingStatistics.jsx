import React from 'react';

// Components
import { AnswerPopup, FormattedText } from 'dapp';
import { NumberFormat } from 'ui';
import { BetweenSeparator } from 'src/index/components/p2p/components/UI';

// Utils
import regexes from 'src/index/constants/regexes';

// Styles
import styles from './TradingStatistics.module.less';

function TradingStatistics({
  title,
  content,
  description,
  buyNumber,
  sellNumber,
}) {
  return (
    <div className={styles.TradingStatistics}>
      <div className={styles.TradingStatistics__title}>
        <span>{title}</span>
        <AnswerPopup>{description}</AnswerPopup>
      </div>
      <div className={styles.TradingStatistics__body}>
        <div className={styles.TradingStatistics__number}>{content}</div>
        {(buyNumber || sellNumber) && (
          <BetweenSeparator className={styles.TradingStatistics__tradeVolume}>
            <span className="green-color">
              Buy <NumberFormat number={buyNumber} />
            </span>
            <span className="orange-red-color">
              Sell <NumberFormat number={sellNumber} />
            </span>
          </BetweenSeparator>
        )}
      </div>
    </div>
  );
}

export default TradingStatistics;
