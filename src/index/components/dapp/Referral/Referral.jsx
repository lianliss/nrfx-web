import React from 'react';
import { useSelector } from 'react-redux';
import { useRoute } from 'react-router5';

// Components
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import SVG from 'utils/svg-wrap';

// Utils
import { DAPP_REFERRAL } from '../../../constants/pages';

// Styles
import './Referral.less';
import ReferralList from './components/ReferralList/ReferralList';
import Dashboard from './components/Dashboard/Dashboard';
import FAQ from './components/FAQ/FAQ';
import Header from './components/Header/Header';

const exchangeDashboardItems = [
  {
    firstTitle: 'Active Friends / Total Friends',
    firstCount: '0/0',
    firstIcon: { src: 'asset/icons/cabinet/team-icon.svg', background: '#fff' },
    secondTitle: 'Total earned',
    secondCount: '0.0000 NRFX / 0.00 USD',
    secondIcon: {
      src: 'asset/icons/narfex/white-icon.svg',
      background: 'var(--blue-light-gradient)',
    },
    secondary: true,
  },
];

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
        <Header />
        <Dashboard items={exchangeDashboardItems} />
        <ReferralList />
        <FAQ />
      </div>
    </CabinetBlock>
  );
}

export default Referral;
