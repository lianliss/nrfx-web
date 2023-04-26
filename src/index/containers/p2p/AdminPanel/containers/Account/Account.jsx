import React from 'react';

// Components
import { Row, NumberFormat } from 'ui';
import { UserProfile } from 'src/index/components/p2p';
import {
  TradingStatistics,
  Verify,
  Staking,
  AdvertiserFeedback,
} from '../../components';

// Styles
import styles from './Account.module.less';

function Account({ adaptive, user, type, isForeignProfile }) {
  const { name, role, verified } = user;
  const isValidator = role === 'validator';

  const BodyItem = ({ children }) => (
    <div className={styles.Account__body__item}>{children}</div>
  );

  const renderRightSide = () => {
    if (type === 'advertiser_detail') {
      return <AdvertiserFeedback adaptive={adaptive} />;
    }

    if (verified && isValidator) {
      return <Staking adaptive={adaptive} />;
    }

    return <Verify adaptive={adaptive} userRole={role} verified={verified} />;
  };

  return (
    <div className={styles.Account}>
      <Row
        justifyContent="space-between"
        className={styles.Account__header}
        wrap
      >
        <UserProfile
          name={name}
          isVerified={verified}
          isForeignProfile={isForeignProfile}
          adaptive={adaptive}
        />
        {renderRightSide()}
      </Row>
      <div className={styles.Account__body}>
        <BodyItem>
          <TradingStatistics
            title="All Trades"
            description="Total number of completed P2P orders (buy and sell included) in the past 30 days"
            content={
              <span>
                <NumberFormat number={6744} /> Time(s)
              </span>
            }
            buyNumber={4149}
            sellNumber={2545}
          />
        </BodyItem>
        <BodyItem>
          <TradingStatistics
            title="30d Trades"
            description="Total number of completed P2P orders (buy and sell included) in the past 30 days"
            content={
              <span>
                <NumberFormat number={367} /> Time(s)
              </span>
            }
          />
        </BodyItem>
        <BodyItem>
          <TradingStatistics
            title="30d Completion Rate"
            description="Total number of completed P2P orders (buy and sell included) in the past 30 days"
            content={
              <span>
                <NumberFormat number={97.35} /> %
              </span>
            }
          />
        </BodyItem>
        <BodyItem>
          <TradingStatistics
            title="Avg. Release Time"
            description="Total number of completed P2P orders (buy and sell included) in the past 30 days"
            content={
              <span>
                <NumberFormat number={27.32} /> Minute(s)
              </span>
            }
          />
        </BodyItem>
        <BodyItem>
          <TradingStatistics
            title="Avg. Pay Time"
            description="Total number of completed P2P orders (buy and sell included) in the past 30 days"
            content={
              <span>
                <NumberFormat number={4.1} /> Minute(s)
              </span>
            }
          />
        </BodyItem>
      </div>
    </div>
  );
}

export default Account;
