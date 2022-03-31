import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import * as utils from '../../../utils';
import COMPANY from '../../../index/constants/company';

// Adaptive
import { setAdaptive } from '../../../actions';
import { PHONE } from '../../../index/constants/breakpoints';

// Blocks
import Statistics from '../../components/Statistics/Statistics';
import AboutUs from '../AboutUs/AboutUs';
import Services from '../Services/Services';
import Information from '../Information/Information';

// Constants
import { statisticsData } from '../../constants/statistics';

// Styles
import './TokenLanding.less';
import '../../constants/vars.less';
import Roadmap from '../Roadmap/Roadmap';
import Contacts from '../Contacts/Contacts';
import Functional from '../Functional/Functional';
import Tokenomics from '../Tokenomics/Tokenomics';

function TokenLanding({ adaptive, setAdaptive }) {
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
          {[COMPANY.name, utils.getLang('landing_promo_title', true)].join(
            ' - '
          )}
        </title>
        <meta
          name="description"
          content={utils.getLang('landing_promo_description')}
        />
      </Helmet>
      <Statistics data={statisticsData} />
      <AboutUs />
      <Services />
      <Functional />
      <Tokenomics adaptive={adaptive} />
      <Roadmap />
      <Information adaptive={adaptive} code="0x86c86ffdc0482d8d" />
      <Contacts />
    </div>
  );
}

export default connect((state) => ({ adaptive: state.default.adaptive }), {
  setAdaptive,
})(TokenLanding);
