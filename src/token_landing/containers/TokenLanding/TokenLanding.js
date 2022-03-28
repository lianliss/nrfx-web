import React from 'react';
import { Helmet } from 'react-helmet';

import * as utils from '../../../utils';
import COMPANY from '../../../index/constants/company';

// Blocks
import Statistics from '../../components/Statistics/Statistics';
import AboutUs from '../AboutUs/AboutUs';

// Constants
import { statisticsData } from '../../constants/statistics';

// Styles
import './TokenLanding.less';
import '../../constants/vars.less';

function TokenLanding({ adaptive }) {
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
    </div>
  );
}

export default TokenLanding;
