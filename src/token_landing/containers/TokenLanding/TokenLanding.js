import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import {getLang} from 'utils';
import COMPANY from '../../../index/constants/company';
import web3Backend from 'services/web3-backend';

// Adaptive
import { setAdaptive } from '../../../actions';
import { PHONE } from '../../../index/constants/breakpoints';

// Blocks
import Statistics from '../../components/Statistics/Statistics';
import AboutUs from '../AboutUs/AboutUs';
import Services from '../Services/Services';
import Information from '../Information/Information';

// Styles
import './TokenLanding.less';
import '../../constants/vars.less';
import Roadmap from '../Roadmap/Roadmap';
import Contacts from '../Contacts/Contacts';
import Functional from '../Functional/Functional';
import Tokenomics from '../Tokenomics/Tokenomics';
import NarfexToken from '../NarfexToken/NarfexToken';

function TokenLanding({ adaptive, setAdaptive, currentLang, routePath }) {
  const [price, setPrice] = React.useState(null);
  React.useEffect(() => {
    web3Backend.getTokenRate('nrfx').then(data => {
      setPrice(data.price);
    })
  }, []);
  React.useEffect(() => {
    // Landing adaptive Setter.
    window.addEventListener('resize', screenResize);
    screenResize();

    return function removeEvents() {
      window.removeEventListener('resize', screenResize);
    };
  }, []);

  // Check and set adaptive
  const screenResize = () => {
    if (document.body.offsetWidth <= PHONE) {
      setAdaptive(true);
    } else {
      setAdaptive(false);
    }
  };

  return (
    <div className="TokenLanding">
      <Helmet>
        <title>
          {[COMPANY.name, getLang('landing_promo_title', true)].join(
            ' - '
          )}
        </title>
        <meta
          name="description"
          content={getLang('landing_promo_description')}
        />
      </Helmet>
      <NarfexToken />
      <Statistics price={price} />
      <AboutUs />
      <Services />
      <Functional />
      <Tokenomics adaptive={adaptive} />
      <Roadmap />
      <Information
        adaptive={adaptive}
        code="0x3764Be118a1e09257851A3BD636D48DFeab5CAFE"
        currentLang={currentLang}
        routePath={routePath}
      />
      <Contacts currentLang={currentLang} />
    </div>
  );
}

TokenLanding.propTypes = {
  adaptive: PropTypes.bool,
  setAdaptive: PropTypes.func,
  currentLang: PropTypes.string,
  routePath: PropTypes.string,
};

TokenLanding.defaultProps = {
  adaptive: false,
  setAdaptive: () => {},
  currentLang: 'ru',
  routePath: '/',
};

export default connect(
  (state) => ({
    adaptive: state.default.adaptive,
    currentLang: state.default.currentLang,
    routePath: state.router.route.path,
  }),
  {
    setAdaptive,
  }
)(TokenLanding);
