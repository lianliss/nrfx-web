import React from 'react';
import { useSelector } from 'react-redux';
import { useRoute } from 'react-router5';

// Components
import CabinetBlock from '../CabinetBlock/CabinetBlock';

// Utils
import { DAPP_REFERRAL } from '../../../constants/pages';

// Styles
import './Referral.less';
import ReferralList from './components/ReferralList/ReferralList';
import Dashboard from './components/Dashboard/Dashboard';
import FAQ from './components/FAQ/FAQ';
import Header from './components/Header/Header';

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
      <Header />
      <Dashboard />
      <ReferralList />
      <FAQ />
    </CabinetBlock>
  );
}

export default Referral;
