import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SVG from 'utils/svg-wrap';
import { Button } from 'src/ui';

import { openModal } from 'src/actions';
import { getLang } from 'src/utils';
import web3Backend from 'services/web3-backend';
import { setWithdraw } from 'src/actions/dapp/withdraw';
import * as PAGES from 'src/index/constants/pages';
import router from 'src/router';
import _ from 'lodash';

function FiatButtons({ currency, disabled }) {
  const dispatch = useDispatch();
  const fiatSymbol = _.get(currency, 'symbol', '');
  const withdrawBanks = useSelector((state) =>
    _.get(state, 'dapp.withdraw.banks', {})
  );

  const currentWithdrawBanks = _.get(withdrawBanks, fiatSymbol, []);

  function withdrawal() {
    openModal('deposit_balance', {
      currency: fiatSymbol,
      amount: 0,
      type: 'withdrawal',
    });
  }

  React.useEffect(() => {
    web3Backend
      .getWithdrawBanks()
      .then((withdrawBanks) => {
        dispatch(
          setWithdraw({
            banks: withdrawBanks,
          })
        );
      })
      .catch((error) => {
        console.error('[getWithdrawBanks]', error);
      });
  }, []);

  return (
    <>
      <div className="col">
        <Button
          type="secondary-alice"
          onClick={() => openModal('deposit_balance')}
          disabled={disabled}
        >
          <SVG src={require('src/asset/icons/cabinet/sidebar/farm.svg')} />
          {getLang('dapp_global_deposit')}
        </Button>
        <Button
          type="secondary-alice"
          disabled={disabled || !currentWithdrawBanks.length}
          onClick={withdrawal}
        >
          <SVG src={require('src/asset/icons/cabinet/money-send.svg')} />
          <span>
            {getLang('global_withdrawal')}
            <br />
            {!currentWithdrawBanks.length && (
              <span className="coming-soon">
                ({getLang('global_comingSoon')})
              </span>
            )}
          </span>
        </Button>
      </div>
      <div className="col">
        <Button
          type="secondary-alice"
          onClick={() => {
            router.navigate(PAGES.DAPP_PRO_DEX, {
              coin: currency.symbol,
              currency: 'USDT',
            });
          }}
          disabled={disabled}
        >
          <SVG src={require('src/asset/icons/cabinet/buy.svg')} />
          {getLang('global_buy')}
        </Button>
        <Button
          type="secondary-alice"
          onClick={() => {
            router.navigate(PAGES.DAPP_PRO_DEX, {
              currency: currency.symbol,
              coin: 'NRFX',
            });
          }}
          disabled={disabled}
        >
          <SVG src={require('src/asset/icons/cabinet/card-tick.svg')} />
          {getLang('global_sell')}
        </Button>
      </div>
    </>
  );
}

export default FiatButtons;
