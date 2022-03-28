import React from 'react';
import { Helmet } from 'react-helmet';

import * as utils from '../../../utils';
import COMPANY from '../../../index/constants/company';
import Statistics from '../../components/Statistics/Statistics';

// Constants
import { statisticsData } from '../../constants/statistics';

function TokenLanding({ adaptive }) {
  return (
    <div>
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
    </div>
  );
}

export default TokenLanding;
