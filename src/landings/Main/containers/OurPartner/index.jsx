import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Container } from 'ui';
import SVG from 'utils/svg-wrap';

// Utils
import { getLogo } from '../../../utils/getters';
import { getLang } from 'utils';

// Styles
import './index.less';

function OurPartner({ adaptive }) {
  const partners = ['gate-io', 'kucoin', 'binance', 'lbank', 'bybit'];

  return (
    <div className="MainLanding-our-partner">
      <Container maxWidth={1262} padding={adaptive ? 15 : 71}>
        <h2>{getLang('main_landing_our_partner_title')}</h2>
      </Container>
      <Container
        maxWidth={1356}
        padding={adaptive ? 15 : 43}
        className="MainLanding-our-partner__list"
      >
        {partners.map((partner, key) => {
          const logo = getLogo(partner);

          if (!logo) return null;

          return <SVG src={logo} key={key} />;
        })}
      </Container>
    </div>
  );
}

OurPartner.propTypes = {
  adaptive: PropTypes.bool,
};

OurPartner.defaultProps = {
  adaptive: false,
};

export default OurPartner;
