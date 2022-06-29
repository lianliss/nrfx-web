import React from 'react';
import { useRoute } from 'react-router5';

// Components
import { SwitchTabs } from 'src/ui';
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import SVG from 'utils/svg-wrap';
import Exchanger from './containers/Exchanger/Exchanger';
import Farming from './containers/Farming/Farming';
import Preview from './containers/Preview/Preview';

// Utils
import {
  DAPP_REFERRAL,
  DAPP_REFERRAL_EXCHANGER,
  DAPP_REFERRAL_FARMING,
} from 'src/index/constants/pages';

// Styles
import './Referral.less';

function Referral() {
  const { route, router } = useRoute();
  const routeName = route.name;

  if (routeName === DAPP_REFERRAL) {
    return <Preview />;
  }

  return (
    <CabinetBlock className="Referral">
      <div className="Referral__bg">
        <SVG
          src={require('src/asset/backgrounds/cabinet-swap/center-of-screen-fix.svg')}
        />
      </div>
      <div className="Referral__container">
        <SwitchTabs
          selected={routeName}
          onChange={(value) => {
            router.navigate(value);
          }}
          tabs={[
            { value: DAPP_REFERRAL_EXCHANGER, label: 'Referral Exchanger' },
            { value: DAPP_REFERRAL_FARMING, label: 'Referral Farming' },
          ]}
          type="light-blue"
          size="large"
        />
        {routeName === DAPP_REFERRAL_EXCHANGER && <Exchanger />}
        {routeName === DAPP_REFERRAL_FARMING && <Farming />}
      </div>
    </CabinetBlock>
  );
}

export default Referral;
