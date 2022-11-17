import React from 'react';

// Components
import WalletsTotalBalance from '../WalletsTotalBalance/WalletsTotalBalance';
import { Button, DynamicShadow } from 'src/ui';
import TokenSelectAction from '../../../Modals/TokenSelectAction/TokenSelectAction';
import SendTokens from '../../../Modals/SendTokens/SendTokens';
import SVG from 'utils/svg-wrap';

// Utils
import { openModal } from 'src/actions';
import * as PAGES from 'src/index/constants/pages';
import { getLang } from 'src/utils';
import router from 'src/router';
import wei from 'utils/wei';
import _ from 'lodash';

// Styles
import './WalletsHeader.less';

function WalletsHeader({ isFiat }) {
  const [isTokenSelect, setIsTokenSelect] = React.useState(false);
  const [isSendTokens, setIsSendTokens] = React.useState(false);
  const [coin, setCoin] = React.useState({});
  const [action, setAction] = React.useState(null);
  const coinsType = isFiat ? 'fiats' : 'tokens';

  const handlers = {
    buy: (coin) => router.navigate(PAGES.DAPP_EXCHANGE, { coin: coin.symbol }),
    send: () => setIsSendTokens(true),
    deposit: (fiat) => handleFiatSelect('refill', fiat),
    withdrawal: (fiat) => handleFiatSelect('withdrawal', fiat),
  };

  /**
   * Opens modal for withdrawal or refill.
   * @param type {string} - oneOf('withdrawal', 'refill').
   * @param fiat {tokenObject}
   * @return {void}
   */
  const handleFiatSelect = (type, fiat) => {
    openModal('deposit_balance', {
      currency: fiat.symbol,
      amount: '0',
      type,
    });
  };

  const handleTokenSelect = (coin) => {
    const selectHandler = handlers[action];
    setCoin(coin);

    if (_.isFunction(selectHandler)) {
      selectHandler(coin);
    }
  };

  const handleButtonClick = (newAction) => {
    setAction(newAction);
    setIsTokenSelect(true);
  };

  const TokenSelectComponent = (
    <TokenSelectAction
      onClose={() => setIsTokenSelect(false)}
      onSelected={handleTokenSelect}
      type={coinsType}
    />
  );

  const FiatButtons = () => (
    <>
      <Button
        type="secondary-light"
        style={{ minWidth: 230 }}
        onClick={() => handleButtonClick('withdrawal')}
        shadow
      >
        <SVG src={require('src/asset/icons/cabinet/buy.svg')} />
        {getLang('global_withdrawal')}
      </Button>
      <DynamicShadow>
        <Button
          type="lightBlue"
          style={{ minWidth: 230 }}
          onClick={() => handleButtonClick('deposit')}
        >
          <SVG
            src={require('src/asset/icons/cabinet/buy.svg')}
            className="white-icon"
          />
          {getLang('dapp_global_deposit')}
        </Button>
      </DynamicShadow>
    </>
  );

  const TokenButtons = () => (
    <>
      <Button type="secondary-light" onClick={() => handleButtonClick('buy')}>
        <SVG src={require('src/asset/icons/cabinet/buy.svg')} />
        {getLang('global_buy')}
      </Button>
      <Button type="secondary-light" onClick={() => openModal('receive_qr')}>
        <SVG src={require('src/asset/icons/cabinet/card-receive.svg')} />
        {getLang('global_receive')}
      </Button>
      <DynamicShadow>
        <Button type="lightBlue" onClick={() => handleButtonClick('send')}>
          <SVG src={require('src/asset/icons/cabinet/card-send.svg')} />
          {getLang('global_send')}
        </Button>
      </DynamicShadow>
    </>
  );

  return (
    <>
      <div className="WalletsHeader">
        <div className="WalletsHeader__col">
          <WalletsTotalBalance />
        </div>
        <div className="WalletsHeader__col">
          {isFiat ? <FiatButtons /> : <TokenButtons />}
        </div>
      </div>
      <div className="Modals">
        {isTokenSelect && TokenSelectComponent}
        {isSendTokens && (
          <SendTokens token={coin} onClose={() => setIsSendTokens(false)} />
        )}
      </div>
    </>
  );
}

export default React.memo(WalletsHeader);
