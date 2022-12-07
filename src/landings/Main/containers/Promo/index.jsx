import React from 'react';

// Components
import { Container } from 'ui';
import SVG from 'utils/svg-wrap';

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
      <Container className="MainLanding-promo__content">
        <h1>
          <span>Narfex</span>. Exchanger. Free transaction.
        </h1>
        <p>
          Exchange fiat and cryptocurrency without authorization and
          verification
        </p>
      </Container>
    </div>
  );
}

export default Promo;
