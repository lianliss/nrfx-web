import React from 'react';

// Components
import { Container, Col } from 'ui';
import SVG from 'utils/svg-wrap';
import SuggestiveBox from '../../components/SuggestiveBox';
import ShowIn from '../../components/ShowIn';
import FormattedText from 'dapp/FormattedText/FormattedText';

// Utils
import { sizes } from '../../components/SuggestiveBox/constants/types';
import { classNames as cn, getLang } from 'utils';
import useIsInViewport from 'src/hooks/useIsInViewport';
import regexes from 'src/index/constants/regexes';

// Styles
import './index.less';

function Promo({ adaptive, isLoaded, setIsLoaded }) {
  const titleRef = React.useRef(null);
  const titleViewport = useIsInViewport(titleRef, 70);
  const promoBg = adaptive
    ? require('src/asset/backgrounds/main-landing/promo-adaptive.svg')
    : require('src/asset/backgrounds/main-landing/promo.svg');

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
          padding={adaptive ? 22 : 62}
        >
          <ShowIn
            viewport={titleViewport}
            animation="slideRight"
            scrollRemainderPercent={100}
          >
            <Col>
              <div ref={titleRef}>
                <FormattedText
                  text={getLang('main_landing_title')}
                  className="blue"
                  regularExpression={regexes.betweenCharacters}
                  tag="h1"
                />
              </div>
              <p>{getLang('main_landing_description')}</p>
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
              title={getLang('main_landing_video_button_title')}
              subtitle={getLang('main_landing_video_button_subtitle')}
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
