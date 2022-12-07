import React from 'react';

// Components
import { Container, Col } from 'ui';
import SVG from 'utils/svg-wrap';
import SuggestiveBox from '../../components/SuggestiveBox';

// Styles
import './index.less';

function Promo() {
  return (
    <div className="MainLanding-promo">
      <Container maxWidth={1352}>
        <div className="MainLanding-promo__bg">
          <SVG src={require('src/asset/backgrounds/main-landing-promo.svg')} />
        </div>
      </Container>
      <Container className="MainLanding-promo__content" maxWidth={1262} padding={62}>
        <Col>
          <h1>
            <span>Narfex</span>. Exchanger. Free transaction.
          </h1>
          <p>
            Exchange fiat and cryptocurrency without authorization and
            verification
          </p>
        </Col>
        <SuggestiveBox />
      </Container>
    </div>
  );
}

export default Promo;
