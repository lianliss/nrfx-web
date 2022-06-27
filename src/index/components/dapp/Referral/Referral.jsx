import React from 'react';
import { useSelector } from 'react-redux';
import { useRoute } from 'react-router5';

// Components
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import SVG from 'utils/svg-wrap';
import Exchange from './containers/Exchange/Exchange';

// Utils
import { DAPP_REFERRAL } from '../../../constants/pages';

// Styles
import './Referral.less';

function Referral() {
  const { router } = useRoute();
  const params = useSelector((state) => state.router.route.params);
  const type = params.type || null;

  // Redirect to DAPP page, if type !== exchange or farming.
  if (type !== 'exchange') {
    router.navigate(DAPP_REFERRAL, { type: 'exchange' });
  }

  return (
    <CabinetBlock className="Referral">
      <div className="Referral__bg">
        <SVG
          src={require('src/asset/backgrounds/cabinet-swap/center-of-screen-fix.svg')}
        />
      </div>
      <div className="Referral__container">
        {type === 'exchange' && <Exchange />}
      </div>
    </CabinetBlock>
  );
}

export default Referral;
