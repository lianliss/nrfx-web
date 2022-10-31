import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import getFinePrice from 'src/utils/get-fine-price';
import { getLang } from 'utils';
import KNOWN_FIATS from 'src/index/constants/knownFiats';

// Components
import Header from '../../components/Header/Header';
import Dashboard from '../../components/Dashboard/Dashboard';
import ReferralList from '../../components/ReferralList/ReferralList';
import Card from '../../components/Card/Card';
import FAQ from '../../components/FAQ/FAQ';

function Exchanger(params) {
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
        title={getLang('dapp_referral_exchanger_title')}
        subtitle={getLang('dapp_referral_exchanger_subtitle')}
        link="https://narfex.org?ref=dd4e20hfj09nrtyasdasd"
        willGetNumber={30}
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
            firstCount={`${_.get(activeFriends, 'length', 0)}/${_.get(
              friends,
              'length',
              0
            )}`}
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
        {KNOWN_FIATS.map(({ symbol }) => {
          const amount = totalByCurrencies[symbol] || 0;
          const usd = getUsdPrice(amount, symbol);
          return (
            <Card
              firstTitle={`${getLang('global_total')} ${symbol} ${getLang(
                'dapp_global_earned'
              ).toLowerCase()}`}
              firstCount={`${getFinePrice(amount)} ${symbol}`}
              secondTitle={getLang('dapp_global_equivalently')}
              secondCount={`${getFinePrice(usd)} USD`}
            />
          );
        })}
      </Dashboard>
      <ReferralList
        title={getLang('dapp_referral_list_title')}
        subtitle={getLang('dapp_referral_list_subtitle')}
        getUsdPrice={getUsdPrice}
        {...params}
      />
      <FAQ adaptive={adaptive} type="exchanger" />
    </>
  );
}

export default Exchanger;
