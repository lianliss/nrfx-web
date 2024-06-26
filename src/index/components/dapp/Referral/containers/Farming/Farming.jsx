import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import getFinePrice from 'src/utils/get-fine-price';
import { getLang } from 'utils';

// Components
import Header from '../../components/Header/Header';
import Dashboard from '../../components/Dashboard/Dashboard';
import ReferralList from '../../components/ReferralList/ReferralList';
import Card from '../../components/Card/Card';
import FAQ from '../../components/FAQ/FAQ';

function Farming(params) {
  const { adaptive, friends, rewards } = params;
  const activeFriends = _.uniqBy(rewards, 'account');
  const rates = useSelector((state) => state.web3.rates);

  const getUsdPrice = (amount, currency) => {
    const rate = _.get(rates, currency.toLowerCase(), 0);
    return amount * rate;
  };

  const totalByCurrencies = {};
  let totalUsd = 0;
  rewards.map((r) => {
    if (!totalByCurrencies[r.currency]) totalByCurrencies[r.currency] = 0;
    totalByCurrencies[r.currency] += Number(r.amount) || 0;
    totalUsd += getUsdPrice(Number(r.amount) || 0, r.currency);
  });

  return (
    <>
      <Header
        title="Invite your friends. Earn cryptocurrency together"
        subtitle="Earn up to 20% from friends’ swap commission on Narfex and 5% from their earnings on Farms & Launchpools"
        link="https://narfex.org?ref=dd4e20hfj09nrtyasdasd"
        willGetNumber={100}
        friendsWillGetNumber={0}
        adaptive={adaptive}
        {...params}
      />
      <Dashboard
        mainChild={
          <Card
            firstIcon={{
              src: 'icons/cabinet/team-icon.svg',
              background: '#fff',
            }}
            firstTitle={`${getLang('dapp_referral_active_friends')} / ${getLang(
              'dapp_referral_total_friends'
            )}`}
            firstCount={`${activeFriends.length}/${friends.length}`}
            firstQuestion={`${getLang(
              'dapp_referral_active_friends'
            )}, ${getLang('dapp_referral_total_friends')}`}
            secondIcon={{
              src: 'icons/narfex/white-icon.svg',
              background: 'var(--blue-light-gradient)',
            }}
            secondTitle={`${getLang('global_total')} ${getLang(
              'dapp_global_earned'
            ).toLowerCase()}`}
            secondCount={`${getFinePrice(totalUsd)} USD`}
            secondary
            {...params}
          />
        }
      >
        {Array(10)
          .fill({})
          .map((__, i) => {
            return (
              <Card
                firstTitle={'Total RUB earned'}
                firstCount={9}
                secondTitle={'Equivalently'}
                secondCount={`${getFinePrice(14444.139)} USD`}
                key={i}
              />
            );
          })}
        {Object.keys(totalByCurrencies).map((currency) => {
          const amount = totalByCurrencies[currency];
          const usd = getUsdPrice(amount, currency);
          return (
            <Card
              firstTitle={`${getLang('global_total')} ${currency} ${getLang(
                'dapp_global_earned'
              ).toLowerCase()}`}
              firstCount={`${getFinePrice(amount)} ${currency}`}
              secondTitle={getLang('dapp_global_equivalently')}
              secondCount={`${getFinePrice(usd)} USD`}
            />
          );
        })}
      </Dashboard>
      <ReferralList
        title="Farms Reward History"
        subtitle="All your Farms referral rewards are listed below"
        getUsdPrice={getUsdPrice}
        {...params}
      />
      <FAQ adaptive={adaptive} type="farming" />
    </>
  );
}

export default Farming;
