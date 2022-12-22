import React from 'react';

// Components
import { Container, Col } from 'ui';
import SVG from 'utils/svg-wrap';
import SuggestiveBox from '../../components/SuggestiveBox';
import ShowIn from '../../components/ShowIn';

// Utils
import { sizes } from '../../components/SuggestiveBox/constants/types';
import { classNames as cn } from 'utils';
import useIsInViewport from 'src/hooks/useIsInViewport';

// Styles
import './index.less';

function Promo({ adaptive, isLoaded, setIsLoaded }) {
  const titleRef = React.useRef(null);
  const titleViewport = useIsInViewport(titleRef, 70);
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
        <SVG
          src={promoBg}
          handleLoaded={setIsLoaded}
          className={cn({ loaded: isLoaded })}
          flex
        />
      </div>
      {isLoaded && (
        <Container
          className="MainLanding-promo__content"
          maxWidth={1262}
          padding={adaptive ? 23 : 62}
        >
          <ShowIn viewport={titleViewport} animation="slideRight">
            <Col>
              <h1 ref={titleRef}>
                <span>Narfex</span>. Exchanger. Free transaction.
                <br />
              </h1>
              <p>
                Exchange fiat and cryptocurrency without authorization and
                verification
              </p>
            </Col>
          </ShowIn>
          <ShowIn
            className="MainLanding-SuggestiveBox__showIn"
            animation="slideLeft"
          >
            <SuggestiveBox
              icon={
                <SVG src={require('src/asset/icons/action/play-circle.svg')} />
              }
              title="How our exchanger works"
              subtitle="video instruction"
              size={sizes.large}
              border
            />
          </ShowIn>
        </Container>
      )}
    </div>
  );
}

export default Promo;
