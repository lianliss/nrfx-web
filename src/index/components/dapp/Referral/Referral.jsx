import React from 'react';
import { useSelector } from 'react-redux';
import { useRoute } from 'react-router5';

// Components
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import SVG from 'utils/svg-wrap';
import Exchanger from './containers/Exchanger/Exchanger';

// Utils
import {
  DAPP_REFERRAL,
  DAPP_REFERRAL_EXCHANGER,
  DAPP_REFERRAL_FARMING,
} from '../../../constants/pages';

// Styles
import './Referral.less';
import Farming from './containers/Farming/Farming';

function Referral() {
  const { route, router } = useRoute();
  const routeName = route.name;

  return (
    <CabinetBlock className="Referral">
      <div className="Referral__bg">
        <SVG
          src={require('src/asset/backgrounds/cabinet-swap/center-of-screen-fix.svg')}
        />
      </div>
      <div className="Referral__container">
        {routeName === DAPP_REFERRAL && <Exchanger />}
        {routeName === DAPP_REFERRAL_EXCHANGER && <Exchanger />}
        {routeName === DAPP_REFERRAL_FARMING && <Farming />}
      </div>
    </CabinetBlock>
  );
}

export default Referral;
