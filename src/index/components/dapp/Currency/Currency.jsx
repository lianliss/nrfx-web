import React from 'react';
import { useSelector } from 'react-redux';

// Components
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import { WalletIcon } from '../index';
import { NumberFormat, Button } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Utils
import currencies from 'src/currencies';
import { isFiat, getLang } from 'utils';
import { openModal } from 'src/actions';
import { Web3Context } from 'src/services/web3Provider';
import { web3RatesSelector } from 'src/selectors';

// Styles
import './Currency.less';
import Transaction from './components/Transaction/Transaction';

function Currency() {
  const params = useSelector((state) => state.router.route.params);
  const rates = useSelector(web3RatesSelector);
  const { isConnected, accountAddress, getTokens, balances, updateFiats } =
    React.useContext(Web3Context);

  const { fiats } = balances;
  const [currency, setCurrency] = React.useState({});

  const TokenActionButtons = () =>
    isFiat(currency.symbol) ? (
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
    ) : (
      <>
        <div className="col">
          <Button type="secondary-light" shadow>
            <SVG src={require('src/asset/icons/cabinet/trade.svg')} />
            {getLang('dapp_global_trade')}
          </Button>
          <Button type="secondary-light" shadow>
            <SVG src={require('src/asset/icons/cabinet/buy.svg')} />
            {getLang('global_buy')}
          </Button>
        </div>
        <div className="col">
          <Button type="secondary-light" shadow>
            <SVG src={require('src/asset/icons/cabinet/card-receive.svg')} />
            {getLang('global_receive')}
          </Button>
          <Button type="secondary-light" shadow>
            <SVG src={require('src/asset/icons/cabinet/card-send.svg')} />
            {getLang('global_send')}
          </Button>
        </div>
      </>
    );

  React.useEffect(() => {
    if (!isConnected) return;
    if (!fiats.length) return;
    const currencyFiat = fiats.filter(
      (fiat) => fiat.symbol.toLowerCase() === params.currency.toLowerCase()
    )[0];

    if (currencyFiat) {
      setCurrency(currencyFiat);
    }
  }, [fiats]);

  React.useEffect(() => {
    if (!isConnected) return;

    // Update fiats, for check currency.
    if (isFiat(params.currency)) {
      updateFiats(null, rates);
      return;
    }

    // Get tokens, for check currency.
    getTokens().then((tokens) => {
      const currencyToken = tokens.filter((token) => {
        return token.symbol.toLowerCase() === params.currency.toLowerCase();
      })[0];

      if (currencyToken) {
        setCurrency(currencyToken);
      }
    });
  }, [accountAddress]);

  return (
    <CabinetBlock className="Currency">
      <div className="Currency__container">
        <div className="Currency__header">
          <div className="Currency__preview">
            <WalletIcon currency={currency} size={41} />
            {isConnected && (
              <>
                <span className="Currency__currency">{currency.name}</span>
                <span className="Currency__rate">12 USD</span>
                <div className="Currency__currency_amount">
                  <NumberFormat number={155} currency={currency.symbol} />
                </div>
                <div className="Currency__currency_amount_rate">
                  <NumberFormat number={54.0} currency={'usd'} />
                </div>
              </>
            )}
          </div>
          <div className="Currency__buttons">
            {isConnected ? (
              <TokenActionButtons />
            ) : (
              <Button
                type="lightBlue"
                shadow
                onClick={() => openModal('connect_to_wallet')}
              >
                <SVG
                  src={require('src/asset/icons/cabinet/connect-wallet.svg')}
                />
                {getLang('dapp_global_connect_wallet')}
              </Button>
            )}
          </div>
        </div>
        <div className="Currency__body">
          <CabinetBlock className="Currency__transactions">
            <div className="Currency__transactions__header">
              <h3>Transaction history</h3>
            </div>
            <div className="Currency__transactions__body">
              <ul className="Currency__dates">
                <li className="Currency__date">
                  <h4>May 25</h4>
                  <div>
                    <Transaction currency={currency} bank="Tinkoff" />
                    <Transaction
                      currency={currency}
                      type="withdrawal"
                      transactionsExists={false}
                    />
                  </div>
                </li>
                <li className="Currency__date">
                  <h4>May 24</h4>
                  <div>
                    <Transaction currency={currency} />
                    <Transaction currency={currency} />
                  </div>
                </li>
              </ul>
            </div>
          </CabinetBlock>
        </div>
      </div>
    </CabinetBlock>
  );
}

export default Currency;
