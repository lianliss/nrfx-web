import React from 'react';
import { useSelector } from 'react-redux';
import { useRoute } from 'react-router5';

// Components
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import { WalletIcon } from '../index';
import { NumberFormat, Button } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Utils
import { DAPP } from '../../../constants/pages';

// Styles
import './Referral.less';

function Referral() {
  const { router } = useRoute();
  const params = useSelector((state) => state.router.route.params);
  const { type } = params;

  // Redirect to DAPP page, if type !== exchange or farming.
  if (type !== 'exchange') {
    router.navigate(DAPP);
  }

  return <CabinetBlock className="Referral">{type}</CabinetBlock>;
}

export default Referral;
