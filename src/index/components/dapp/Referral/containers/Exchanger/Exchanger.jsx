import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import getFinePrice from 'src/utils/get-fine-price';

// Components
import Header from '../../components/Header/Header';
import Dashboard from '../../components/Dashboard/Dashboard';
import ReferralList from '../../components/ReferralList/ReferralList';
import Card from '../../components/Card/Card';
import FAQ from '../../components/FAQ/FAQ';

function Exchanger(params) {
  const {adaptive, friends, rewards} = params;
  const activeFriends = _.uniqBy(rewards, 'account');
  const rates = useSelector((state) => state.web3.rates);

  const getUsdPrice = (amount, currency) => {
    const rate = _.get(rates, currency.toLowerCase(), 0);
    return amount * rate;
  };

  const totalByCurrencies = {};
  let totalUsd = 0;
  rewards.map(r => {
    if (!totalByCurrencies[r.currency]) totalByCurrencies[r.currency] = 0;
    totalByCurrencies[r.currency] += Number(r.amount) || 0;
    totalUsd += getUsdPrice(Number(r.amount) || 0, r.currency);
  });

  return (
    <>
      <Header
        title="Invite your friends. Earn cryptocurrency together"
        subtitle="Earn up to 30% from friends’ commission on Fiat deposits and 5% from their NRFX token purchases through an Narfex Exchanger"
        link="https://narfex.org?ref=dd4e20hfj09nrtyasdasd"
        willGetNumber={100}
        friendsWillGetNumber={0}
        {...params}
      />
      <Dashboard>
        <Card
          firstIcon={{ src: 'icons/cabinet/team-icon.svg', background: '#fff' }}
          firstTitle="Active Friends / Total Friends"
          firstCount={`${activeFriends.length}/${friends.length}`}
          firstQuestion="Active Friends, Total Friends"
          secondIcon={{
            src: 'icons/narfex/white-icon.svg',
            background: 'var(--blue-light-gradient)',
          }}
          secondTitle="Total earned"
          secondCount={`${getFinePrice(totalUsd)} USD`}
          secondary
          {...params}
        />
        {Object.keys(totalByCurrencies).map(currency => {
          const amount = totalByCurrencies[currency];
          const usd = getUsdPrice(amount, currency);
          return <Card
            firstTitle={`Total ${currency} earned`}
            firstCount={`${getFinePrice(amount)} ${currency}`}
            secondTitle="Equivalently"
            secondCount={`${getFinePrice(usd)} USD`}
          />
        })}
      </Dashboard>
      <ReferralList
        title="Referral List"
        subtitle="All your referral friends in one place"
        getUsdPrice={getUsdPrice}
        {...params}
      />
      <FAQ adaptive={adaptive} />
    </>
  );
}

export default Exchanger;
