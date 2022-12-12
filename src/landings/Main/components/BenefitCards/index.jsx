import React from 'react';

// Components
import { Col, Row } from 'ui';
import BenefitCard from '../BenefitCard';

// Utils
import { getLang } from 'utils';
import ecosystemImage from 'src/asset/backgrounds/main-landing/benefit-ecosysytem.svg';
import trustlessImage from 'src/asset/backgrounds/main-landing/benefit-trustless.svg';
import currenciesImage from 'src/asset/backgrounds/main-landing/benefit-currencies.svg';
import communityImage from 'src/asset/backgrounds/main-landing/benefit-community.svg';
import usersImage from 'src/asset/backgrounds/main-landing/benefit-users.svg';
import { sizes } from '../BenefitCard/types';

// Styles
import './index.less';

function BenefitCards() {
  const isTablet = true;
  const isMobile = false;
  const isAdaptive = isTablet || isMobile;

  const horizontalCenterStyle = {
    left: '50%',
    transform: 'translateX(-50%)',
  };

  const currenciesImageComponent = (
    <BenefitCard.BackgroundImage style={{ ...horizontalCenterStyle, top: 70 }}>
      <img
        src={currenciesImage}
        style={{
          filter: 'drop-shadow(0px 4px 50px rgba(0, 0, 0, 0.25))',
        }}
      />
    </BenefitCard.BackgroundImage>
  );

  const communityImageComponent = (
    <BenefitCard.BackgroundImage style={{ ...horizontalCenterStyle, top: 70 }}>
      <img
        src={communityImage}
        style={{
          filter: 'drop-shadow(0px 4px 50px rgba(57, 57, 57, 0.16))',
        }}
      />
    </BenefitCard.BackgroundImage>
  );

  const transactionsImageComponent = (
    <BenefitCard.BackgroundImage style={{ ...horizontalCenterStyle, top: 43 }}>
      <Row className="transactions-every-day-image">
        <span>999</span>
        <span>10,000</span>
        <span>1100</span>
      </Row>
    </BenefitCard.BackgroundImage>
  );

  const usersImageComponent = (
    <BenefitCard.BackgroundImage style={{ ...horizontalCenterStyle, top: 31 }}>
      <img src={usersImage} />
    </BenefitCard.BackgroundImage>
  );

  return (
    <Col
      className="MainLanding-BenefitCards"
      alignItems="stretch"
      justifyContent="stretch"
    >
      <Row
        alignItems="stretch"
        justifyContent="stretch"
        className="MainLanding-BenefitCards__row"
        wrap={isAdaptive}
      >
        <BenefitCard
          title="Trustless & Based on smart contracts"
          size={sizes.medium}
          background="blue"
          image={
            <BenefitCard.BackgroundImage
              style={{ left: 0, top: 0, width: '100%' }}
            >
              <img src={trustlessImage} style={{ minWidth: '100%' }} />
            </BenefitCard.BackgroundImage>
          }
        />
        <BenefitCard
          title="users"
          size={sizes.small}
          image={usersImageComponent}
        />
        <BenefitCard
          title={getLang('main_landing_benefits_ecosystem')}
          size={sizes.medium}
          image={
            <BenefitCard.BackgroundImage
              style={
                isAdaptive
                  ? { right: -113, top: -101 }
                  : { left: 163, top: -244 }
              }
            >
              <img
                src={ecosystemImage}
                width={isAdaptive && 311.26}
                height={isAdaptive && 381.59}
              />
            </BenefitCard.BackgroundImage>
          }
        />
      </Row>
      <Row
        alignItems="stretch"
        justifyContent="stretch"
        className="MainLanding-BenefitCards__row"
        wrap={isAdaptive}
      >
        <BenefitCard
          title="exchange transactions every day"
          size={sizes.large}
          image={transactionsImageComponent}
        />
        <BenefitCard
          title="50+ fiat currencies"
          size={sizes.small}
          background="orange"
          image={currenciesImageComponent}
        />
        <BenefitCard
          title="Community driven (DAO)"
          size={sizes.small}
          image={communityImageComponent}
        />
      </Row>
    </Col>
  );
}

export default BenefitCards;
