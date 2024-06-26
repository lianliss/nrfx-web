import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import NRFX_logo from 'src/asset/NRFX_logo.svg';

import { getLang } from 'utils';
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
import { roadmapItems } from '../../constants/roadmap';

function TokenLanding({ adaptive, setAdaptive, currentLang, routePath }) {
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
        <title>{getLang('token_landing_title', true)}</title>
        <meta
          name="description"
          content={getLang('token_landing_description')}
        />
        <link rel="icon" type="image/svg" href={NRFX_logo} sizes="16x16" />
      </Helmet>
      <NarfexToken />
      <Statistics />
      <AboutUs />
      <Services />
      <Functional />
      <Tokenomics adaptive={adaptive} />
      <Roadmap
        title={getLang('token_landing_roadmap_title')}
        items={roadmapItems}
      />
      <Information
        adaptive={adaptive}
        code="0xCc17e34794B6c160a0F61B58CF30AA6a2a268625"
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
