import React from 'react';

// Components
import { Col, Row } from 'ui';
import BenefitCard from '../BenefitCard';

// Utils
import { getLang, classNames as cn } from 'utils';
import * as images from '../../constants/benefitImages';
import { backgrounds, sizes } from '../../constants/benefit';
import useAdaptive from 'src/hooks/adaptive';
import { DESKTOP } from 'src/index/constants/breakpoints';

// Styles
import './index.less';

function BenefitCards() {
  const isDesktop = useAdaptive(DESKTOP, false);

  const trustlessImageComponent = (
    <BenefitCard.BackgroundImage className="trustless-background">
      <img
        src={isDesktop ? images.trustlessImageAdaptive : images.trustlessImage}
      />
    </BenefitCard.BackgroundImage>
  );

  const currenciesImageComponent = (
    <BenefitCard.BackgroundImage className="currencies-background">
      <img src={images.currenciesImage} />
    </BenefitCard.BackgroundImage>
  );

  const communityImageComponent = (
    <BenefitCard.BackgroundImage className="community-background">
      <img src={images.communityImage} />
    </BenefitCard.BackgroundImage>
  );

  const transactionsImageComponent = (
    <BenefitCard.BackgroundImage className="transactions-background">
      <span>999</span>
      <span>10,000</span>
      <span>1100</span>
    </BenefitCard.BackgroundImage>
  );

  const usersImageComponent = (
    <BenefitCard.BackgroundImage className="users-background">
      <img src={images.usersImage} />
    </BenefitCard.BackgroundImage>
  );

  const ecosystemImageComponent = (
    <BenefitCard.BackgroundImage className="ecosystem-background">
      <img src={images.ecosystemImage} />
    </BenefitCard.BackgroundImage>
  );

  return (
    <Col
      className={cn('MainLanding-BenefitCards', { isDesktop })}
      alignItems="stretch"
      justifyContent="stretch"
    >
      <Row
        alignItems="stretch"
        justifyContent="stretch"
        className="MainLanding-BenefitCards__row"
        wrap={isDesktop}
      >
        <BenefitCard
          title="Trustless & Based on smart contracts"
          size={sizes.medium}
          background={backgrounds.blue}
          image={trustlessImageComponent}
        />
        <BenefitCard
          title="users"
          size={sizes.small}
          image={usersImageComponent}
          background={backgrounds.aliceBlue}
        />
        <BenefitCard
          title={getLang('main_landing_benefits_ecosystem')}
          size={sizes.medium}
          image={ecosystemImageComponent}
          background={backgrounds.aliceBlue}
        />
      </Row>
      <Row
        alignItems="stretch"
        justifyContent="stretch"
        className="MainLanding-BenefitCards__row"
        wrap={isDesktop}
      >
        <BenefitCard
          title="exchange transactions every day"
          size={sizes.large}
          image={transactionsImageComponent}
          background={backgrounds.aliceBlue}
        />
        <BenefitCard
          title="50+ fiat currencies"
          size={sizes.small}
          background={backgrounds.orange}
          image={currenciesImageComponent}
        />
        <BenefitCard
          title="Community driven (DAO)"
          size={sizes.small}
          image={communityImageComponent}
          background={backgrounds.aliceBlue}
        />
      </Row>
    </Col>
  );
}

export default BenefitCards;
