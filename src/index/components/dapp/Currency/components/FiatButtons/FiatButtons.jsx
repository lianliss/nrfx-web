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

function FiatButtons({ currency }) {
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
          type="lightBlue"
          shadow
          onClick={() => openModal('deposit_balance')}
        >
          <SVG
            src={require('src/asset/icons/cabinet/buy.svg')}
            className="white-icon"
          />
          {getLang('dapp_global_deposit')}
        </Button>
        <Button
          type="secondary-light"
          shadow
          disabled={!currentWithdrawBanks.length}
          onClick={withdrawal}
        >
          {getLang('global_withdrawal')}
          {!currentWithdrawBanks.length && (
            <>
              <br />
              (coming soon)
            </>
          )}
        </Button>
      </div>
      <div className="col">
        <Button
          type="secondary-light"
          shadow
          onClick={() => {
            router.navigate(PAGES.DAPP_EXCHANGE, {
              coin: currency.symbol,
            });
          }}
        >
          <SVG src={require('src/asset/icons/cabinet/buy.svg')} />
          {getLang('global_buy')}
        </Button>
        <Button
          type="secondary-light"
          shadow
          onClick={() => {
            router.navigate(PAGES.DAPP_EXCHANGE, {
              currency: currency.symbol,
            });
          }}
        >
          <SVG src={require('src/asset/icons/cabinet/buy.svg')} />
          {getLang('global_sell')}
        </Button>
      </div>
    </>
  );
}

export default FiatButtons;
