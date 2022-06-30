import React from 'react';

// Components
import Header from '../../components/Header/Header';
import Dashboard from '../../components/Dashboard/Dashboard';
import ReferralList from '../../components/ReferralList/ReferralList';
import Card from '../../components/Card/Card';
import FAQ from '../../components/FAQ/FAQ';

function Farming({ adaptive }) {
  return (
    <>
      <Header
        title="Invite your friends. Earn cryptocurrency together"
        subtitle="Earn up to 20% from friends’ swap commission on Narfex and 5% from their earnings on Farms & Launchpools"
        link="https://narfex.org?ref=dd4e20hfj09nrtyasdasd"
        willGetNumber={100}
        friendsWillGetNumber={0}
        adaptive={adaptive}
      />
      <Dashboard>
        <Card
          firstIcon={{ src: 'icons/cabinet/team-icon.svg', background: '#fff' }}
          firstTitle="Active Friends / Total Friends"
          firstCount="0/0"
          firstQuestion="Active Friends, Total Friends"
          secondIcon={{
            src: 'icons/narfex/white-icon.svg',
            background: 'var(--blue-light-gradient)',
          }}
          secondTitle="Total earned"
          secondCount="0.0000 NRFX / 0.00 USD"
          secondary
        />
        <Card
          firstTitle="Total Farm friends"
          firstCount="0"
          secondTitle="Total Farm earned"
          secondCount="0.0000 NRFX"
        />
      </Dashboard>
      <ReferralList
        title="Farms Reward History"
        subtitle="All your Farms referral rewards are listed below"
      />
      <FAQ />
    </>
  );
}

export default Farming;
