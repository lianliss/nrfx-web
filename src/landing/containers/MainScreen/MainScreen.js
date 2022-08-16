import React from 'react';
import Welcome from './components/Welcome/Welcome';
import Promo from './components/Promo/Promo';
import Swap from './components/Swap/Swap';
import Exchange from './components/Exchange/Exchange';
import Advantages from './components/Advantages/Advantages';
import Application from './components/Application/Application';
import Roadmap from 'src/landing/containers/Company/components/Roadmap/Roadmap';
import Lang from '../../../components/Lang/Lang';
import COMPANY from '../../../index/constants/company';
import * as utils from '../../../utils';
import { Helmet } from 'react-helmet';
import ADVANTAGES_ITEMS from '../../constants/advantages';
import * as pages from '../../../index/constants/pages';
import router from "src/router";

export default () => {
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
      <Promo
        title={<Lang name="landing_promo_title" />}
        description={<Lang name="landing_promo_description" />}
        actionButtonText={<Lang name="landing_promo_actionButton" />}
        image={require('./components/Promo/assets/promo.svg').default}
        label={<Lang name="landing_promo_nrfx_label" />}
        labelDescription={<Lang name="landing_promo_nrfx_description" />}
        labelLink={<Lang name="global_buy" />}
        actionPage={pages.DAPP}
      />
      <Swap />
      <Exchange />
      <Advantages
        accent
        titleLang="landing_advantages_title"
        items={ADVANTAGES_ITEMS}
      />
      <Application />
      <Roadmap current={5} />
      <Welcome
        actionButtonLang="site_launch_app"
        action={() => router.navigate(pages.DAPP)}
      />
    </div>
  );
};
