import React from 'react';

// Components
import { Container, Col } from 'ui';
import SVG from 'utils/svg-wrap';
import SuggestiveBox from '../../components/SuggestiveBox';

// Utils
import { sizes } from '../../components/SuggestiveBox/constants/types';

// Styles
import './index.less';

function Promo({ adaptive }) {
  return (
    <div className="MainLanding-promo">
      <Container maxWidth={1352}>
        <div className="MainLanding-promo__bg">
          <img
            src={
              require('src/asset/backgrounds/main-landing-promo.svg').default
            }
            width="1417"
            height="858"
          />
        </div>
      </Container>
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
          icon={<SVG src={require('src/asset/icons/action/play-circle.svg')} />}
          title="How our exchanger works"
          subtitle="video instruction"
          size={sizes.large}
          border
        />
      </Container>
    </div>
  );
}

export default Promo;
