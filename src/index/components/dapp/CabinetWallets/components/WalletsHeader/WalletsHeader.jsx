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
    tokens: {
      buy: (coin) => {
        router.navigate(PAGES.DAPP_EXCHANGE, { coin: coin.symbol });
      },
      send: () => {
        setIsSendTokens(true);
      },
    },
    fiats: {},
  };

  const handleTokenSelect = (coin) => {
    const selectHandler = handlers[coinsType][action];
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
    />
  );

  return (
    <div className="WalletsHeader">
      <div className="WalletsHeader__col">
        <WalletsTotalBalance amount={1} totalType="up" total={1} />
      </div>
      <div className="WalletsHeader__col">
        {isFiat ? (
          <DynamicShadow>
            <Button type="lightBlue" style={{ minWidth: 265 }}>
              <SVG
                src={require('src/asset/icons/cabinet/buy.svg')}
                className="white-icon"
              />
              {getLang('dapp_global_deposit')}
            </Button>
          </DynamicShadow>
        ) : (
          <>
            <Button
              type="secondary-light"
              onClick={() => handleButtonClick('buy')}
            >
              <SVG src={require('src/asset/icons/cabinet/buy.svg')} />
              {getLang('global_buy')}
            </Button>
            <Button
              type="secondary-light"
              onClick={() => openModal('receive_qr')}
            >
              <SVG src={require('src/asset/icons/cabinet/card-receive.svg')} />
              {getLang('global_receive')}
            </Button>
            <DynamicShadow>
              <Button
                type="lightBlue"
                onClick={() => handleButtonClick('send')}
              >
                <SVG src={require('src/asset/icons/cabinet/card-send.svg')} />
                {getLang('global_send')}
              </Button>
            </DynamicShadow>
          </>
        )}
      </div>
      {isTokenSelect && TokenSelectComponent}
      {isSendTokens && (
        <SendTokens
          token={coin}
          etherBalance={wei.from(coin.balance)}
          onClose={() => setIsSendTokens(false)}
        />
      )}
    </div>
  );
}

export default WalletsHeader;
