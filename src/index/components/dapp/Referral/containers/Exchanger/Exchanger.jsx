import React from 'react';

// Components
import Header from '../../components/Header/Header';
import Dashboard from '../../components/Dashboard/Dashboard';
import ReferralList from '../../components/ReferralList/ReferralList';
import Card from '../../components/Card/Card';
import FAQ from '../../components/FAQ/FAQ';

function Exchanger() {
  return (
    <>
      <Header
        title="Invite your friends. Earn cryptocurrency together"
        subtitle="Earn up to 30% from friends’ commission on Fiat deposits and 5% from their NRFX token purchases through an Narfex Exchanger"
        link="https://narfex.org?ref=dd4e20hfj09nrtyasdasd"
        willGetNumber={100}
        friendsWillGetNumber={0}
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
          firstTitle="Total NRFX buyers friends"
          firstCount="0"
          secondTitle="Total NRFX earned"
          secondCount="0.0000 NRFX"
        />
        <Card
          firstTitle="Total Fiat deposit friends "
          firstCount="0"
          secondTitle="Total Fiat earned"
          secondCount="0.00 USD"
        />
      </Dashboard>
      <ReferralList
        title="Referral List"
        subtitle="All your referral friends in one place"
      />
      <FAQ />
    </>
  );
}

export default Exchanger;
