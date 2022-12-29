import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Col, Row } from 'ui';
import BenefitCard from '../BenefitCard';

// Utils
import { classNames as cn } from 'utils';
import * as images from '../../constants/benefitImages';
import useAdaptive from 'src/hooks/adaptive';
import { DESKTOP } from 'src/index/constants/breakpoints';
import useIsInViewport from 'src/hooks/useIsInViewport';
import benefitCards from '../../constants/benefitCards';

// Styles
import './index.less';

function BenefitCards({ adaptive }) {
  const cardsRef = React.useRef(null);
  const isDesktop = useAdaptive(DESKTOP, false);
  const visible = useIsInViewport(cardsRef);
  const [displayedCardsNumber, setDisplayedCardsNumber] = React.useState(-1);

  React.useEffect(() => {
    if (!visible) return;

    cardShow();
  }, [visible]);

  const cardShow = () => {
    let number;

    setDisplayedCardsNumber((prev) => {
      number = prev + 1;
      return number;
    });

    return setTimeout(cardShow, 500);
  };

  const ImageComponent = ({ className, src, children }) => {
    return (
      <BenefitCard.BackgroundImage className={className}>
        {children ? children : <img src={src} />}
      </BenefitCard.BackgroundImage>
    );
  };

  const trustlessImageComponent = React.useMemo(
    () => (
      <ImageComponent
        className="trustless-background"
        src={isDesktop ? images.trustlessImageAdaptive : images.trustlessImage}
      />
    ),
    []
  );

  const usersImageComponent = React.useMemo(
    () => (
      <ImageComponent className="users-background" src={images.usersImage} />
    ),
    []
  );

  const ecosystemImageComponent = React.useMemo(
    () => (
      <ImageComponent
        className="ecosystem-background"
        src={images.ecosystemImage}
      />
    ),
    []
  );

  const transactionsImageComponent = React.useMemo(
    () => (
      <ImageComponent className="transactions-background">
        <span>999</span>
        <span>10,000</span>
        <span>1100</span>
      </ImageComponent>
    ),
    []
  );

  const currenciesImageComponent = React.useMemo(
    () => (
      <ImageComponent
        className="currencies-background"
        src={images.currenciesImage}
      />
    ),
    []
  );

  const communityImageComponent = React.useMemo(
    () => (
      <ImageComponent
        className="community-background"
        src={images.communityImage}
      />
    ),
    []
  );

  const imageComponents = {
    trustlessImageComponent,
    currenciesImageComponent,
    communityImageComponent,
    transactionsImageComponent,
    usersImageComponent,
    ecosystemImageComponent,
  };

  return (
    <Col
      className={cn('MainLanding-BenefitCards', { isDesktop })}
      alignItems="stretch"
      justifyContent="stretch"
    >
      <div className="MainLanding-BenefitCards__row" ref={cardsRef}>
        {benefitCards.slice(0, 3).map((benefit, index) => {
          return (
            <BenefitCard
              title={benefit.title}
              size={benefit.size}
              background={benefit.background}
              image={imageComponents[benefit.image]}
              visible={adaptive || displayedCardsNumber >= index}
              key={index}
            />
          );
        })}
      </div>
      <div className="MainLanding-BenefitCards__row">
        {benefitCards.slice(3, 6).map((benefit, index) => {
          return (
            <BenefitCard
              title={benefit.title}
              size={benefit.size}
              background={benefit.background}
              image={imageComponents[benefit.image]}
              visible={adaptive || displayedCardsNumber >= index + 3}
              key={index}
            />
          );
        })}
      </div>
    </Col>
  );
}

BenefitCards.propTypes = {
  adaptive: PropTypes.bool,
};

BenefitCards.defaultProps = {
  adaptive: false,
};

export default BenefitCards;
