import React from 'react';

// Components
import { Container, Col } from 'ui';
import SVG from 'utils/svg-wrap';
import SuggestiveBox from '../../components/SuggestiveBox';

// Utils
import { sizes } from '../../components/SuggestiveBox/constants/types';
import { classNames as cn } from 'utils';

// Styles
import './index.less';

function Promo({ adaptive, isLoaded, setIsLoaded }) {
  const promoBg = require('src/asset/backgrounds/main-landing-promo.svg');

  return (
    <div className="MainLanding-promo">
      <div className="MainLanding-promo__bg">
        <div className={cn('loading', { disabled: isLoaded })}>
          <SVG
            src={require('src/asset/backgrounds/main-landing-promo-loading.svg')}
            flex
          />
        </div>
        {/* <img
            src={
              require('src/asset/backgrounds/main-landing-promo.svg').default
            }
            width="1417"
            height="858"
            onLoad={() => setIsLoaded(true)}
            className={cn({ loaded: isLoaded })}
          /> */}
        <SVG
          src={promoBg}
          handleLoaded={setIsLoaded}
          className={isLoaded ? 'loaded' : ''}
          flex
        />
      </div>
      {isLoaded && (
        <Container
          className="MainLanding-promo__content"
          maxWidth={1262}
          padding={adaptive ? 23 : 62}
        >
          <Col>
            <h1>
              <span>Narfex</span>. Exchanger. Free transaction.
            </h1>
            <p>
              Exchange fiat and cryptocurrency without authorization and
              verification
            </p>
          </Col>
          <SuggestiveBox
            icon={
              <SVG src={require('src/asset/icons/action/play-circle.svg')} />
            }
            title="How our exchanger works"
            subtitle="video instruction"
            size={sizes.large}
            border
          />
        </Container>
      )}
    </div>
  );
}

export default Promo;
