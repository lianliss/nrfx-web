import React from 'react';
import { useDispatch } from 'react-redux';

// Components
import { Button } from 'ui';
import SVG from 'utils/svg-wrap';
import FiatButtons from '../FiatButtons/FiatButtons';

// Utils
import { isFiat, getLang } from 'utils';
import { setSwap } from 'src/actions/dapp/swap';
import router from 'src/router';
import * as PAGES from 'src/index/constants/pages';
import { openModal } from 'actions';

function Buttons({ disabled, paramsCurrency, currency }) {
  if (isFiat(paramsCurrency)) {
    return <FiatButtons disabled={disabled} currency={currency} />;
  }
  const dispatch = useDispatch();

  return (
    <>
      <div className="col">
        <Button
          type="secondary-alice"
          onClick={() => {
            dispatch(setSwap(currency));
            router.navigate(PAGES.DAPP_SWAP);
          }}
          disabled={disabled}
        >
          <SVG src={require('src/asset/icons/cabinet/trade.svg')} />
          {getLang('dapp_global_trade')}
        </Button>
        <Button
          type="secondary-alice"
          onClick={() => {
            router.navigate(PAGES.DAPP_EXCHANGE, {
              coin: currency.symbol,
            });
          }}
          disabled={disabled}
        >
          <SVG src={require('src/asset/icons/cabinet/buy.svg')} />
          {getLang('global_buy')}
        </Button>
      </div>
      <div className="col">
        <Button
          type="secondary-alice"
          onClick={() => openModal('receive_qr')}
          disabled={disabled}
        >
          <SVG src={require('src/asset/icons/cabinet/card-receive-2.svg')} />
          {getLang('global_receive')}
        </Button>
        <Button
          type="secondary-alice"
          onClick={() => openModal('send_tokens', {}, { token: currency })}
          disabled={disabled}
        >
          <SVG src={require('src/asset/icons/cabinet/wallet-with-coin.svg')} />
          {getLang('global_send')}
        </Button>
      </div>
    </>
  );
}

export default React.memo(Buttons);
