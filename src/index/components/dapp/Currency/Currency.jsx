import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

// Components
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import { WalletIcon } from '../index';
import { NumberFormat, Button } from 'src/ui';
import SVG from 'utils/svg-wrap';
import Transaction from './components/Transaction/Transaction';

// Utils
import { isFiat, getLang, wei } from 'utils';
import { openModal } from 'src/actions';
import { Web3Context } from 'src/services/web3Provider';
import { web3RatesSelector } from 'src/selectors';
import router from 'src/router';
import * as PAGES from 'src/index/constants/pages';
import { setSwap } from 'src/actions/dapp/swap';

// Styles
import './Currency.less';
import Transactions from './components/Transactions/Transactions';
import FiatButtons from './components/FiatButtons/FiatButtons';

function Currency() {
  const dispatch = useDispatch();
  const params = useSelector((state) => state.router.route.params);
  const adaptive = useSelector((state) => state.default.adaptive);
  const rates = useSelector(web3RatesSelector);
  const {
    isConnected,
    accountAddress,
    chainId,
    getTokens,
    getTokenBalance,
    updateFiats,
    updateTokenInBalances,
    web3,
    balances,
  } = React.useContext(Web3Context);

  // const [currency, setCurrency] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const paramsCurrency = params.currency || '';
  const currencyIsFiat = isFiat(paramsCurrency);
  const balancesType = currencyIsFiat ? 'fiats' : 'tokens';
  const balancesOfType = balances[balancesType];
  const currency =
    balancesOfType.find((coin) => {
      return coin.symbol.toLowerCase() === paramsCurrency.toLowerCase();
    }) || {};
  const currencyIsEmpty = _.isEmpty(currency);
  const rate =
    rates[paramsCurrency.toLowerCase()] ||
    rates[paramsCurrency.toUpperCase()] ||
    0;

  const currencyBalance = currency.balance
    ? Number(wei.from(currency.balance).toFixed(2))
    : 0;

  React.useEffect(() => {
    if (!paramsCurrency) {
      router.navigate(PAGES.DAPP_CURRENCY, { currency: 'NRFX' });
    }
  }, []);

  React.useEffect(() => {
    if (!isConnected) return;

    // Update fiats, and get currency fiat.
    if (currencyIsFiat) {
      fetchCurrencyFiat();
      return;
    }

    // Get tokens, and get currency token.
    fetchCurrencyToken();
    const tokenBalanceUpdateInterval = setInterval(
      () => fetchCurrencyToken(),
      5000
    );

    return () => {
      clearInterval(tokenBalanceUpdateInterval);
    };
  }, [accountAddress]);

  // React.useEffect(() => {
  //   const balancesOfType = balances[balancesType];
  //   if (!balancesOfType.length) return;

  //   const coin =
  //     balancesOfType.find((coin) => {
  //       return coin.symbol.toLowerCase() === paramsCurrency.toLowerCase();
  //     }) || {};

  //   setCurrency(coin);
  // }, [balances]);

  const fetchCurrencyFiat = async () => {
    setLoading(true);

    const userId = `${chainId}${accountAddress}`;
    const fiats = await updateFiats().then((r) => r[userId]);
    const currencyFiat = fiats.filter(
      (fiat) => fiat.symbol.toLowerCase() === paramsCurrency.toLowerCase()
    )[0];

    if (currencyFiat) {
      updateTokenInBalances(currencyFiat, 'fiats');
    }

    setLoading(false);
  };

  const fetchTokenBalance = async (currencyToken) => {
    const balance = await getTokenBalance(currencyToken.address);

    const token = {
      ...currencyToken,
      balance,
    };

    updateTokenInBalances(token, balancesType);

    if (loading) {
      setLoading(false);
    }
  };

  const fetchCurrencyToken = async () => {
    setLoading(true);

    // Get tokens, for check currency.
    if (!currencyIsEmpty) {
      fetchTokenBalance(currency);
      return;
    }

    const tokens = await getTokens().then((tokens) => tokens);
    const currencyToken = tokens.find((token) => {
      return token.symbol.toLowerCase() === paramsCurrency.toLowerCase();
    });

    if (currencyToken) {
      fetchTokenBalance(currencyToken);
    }
  };

  // Render components
  const LoginedButtons = ({ disabled }) =>
    isFiat(paramsCurrency) ? (
      <FiatButtons disabled={disabled} currency={currency} />
    ) : (
      <>
        <div className="col">
          <Button
            type="secondary-light"
            shadow
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
            type="secondary-light"
            shadow
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
            type="secondary-light"
            shadow
            onClick={() => openModal('receive_qr')}
            disabled={disabled}
          >
            <SVG src={require('src/asset/icons/cabinet/card-receive.svg')} />
            {getLang('global_receive')}
          </Button>
          <Button
            type="secondary-light"
            shadow
            onClick={() => openModal('send_tokens', {}, { token: currency })}
            disabled={disabled}
          >
            <SVG src={require('src/asset/icons/cabinet/card-send.svg')} />
            {getLang('global_send')}
          </Button>
        </div>
      </>
    );

  // const NotLoginedButton = () => {
  //   if (loading) {
  //     return <LoadingStatus status="loading" inline />;
  //   }

  //   if (isConnected && currencyIsEmpty) {
  //     return <h3 style={{ margin: '0 auto' }}>Currency is not exists</h3>;
  //   }

  //   return (
  //     <Button
  //       type="lightBlue"
  //       shadow
  //       onClick={() => openModal('connect_to_wallet')}
  //     >
  //       <SVG src={require('src/asset/icons/cabinet/connect-wallet.svg')} />
  //       {getLang('dapp_global_connect_wallet')}
  //     </Button>
  //   );
  // };

  const Header = ({ currencyBalance, rate, symbol }) => {
    return (
      <div className="Currency__preview__container">
        <span className="Currency__rate">
          <NumberFormat number={currencyBalance} currency={symbol} />
        </span>
        <div className="Currency__currency_amount_rate">
          $&nbsp;
          <NumberFormat number={currencyBalance * rate} currency={'usd'} />
        </div>
      </div>
    );
  };

  return (
    <CabinetBlock className="Currency">
      <div className="Currency__container">
        <div className="Currency__header">
          <div className="Currency__currency">
            <span>{currency.name || paramsCurrency}</span>
          </div>
          <div className="Currency__preview">
            <WalletIcon currency={currency} size={adaptive ? 45 : 55} />
            <Header
              symbol={currency.symbol || paramsCurrency}
              rate={rate}
              currencyBalance={currencyBalance}
            />
          </div>
          <div className="Currency__buttons">
            <LoginedButtons disabled={!isConnected || currencyIsEmpty} />
          </div>
        </div>
        <div className="Currency__body">
          <Transactions currency={!currencyIsEmpty ? currency : null} />
        </div>
      </div>
    </CabinetBlock>
  );
}

export default Currency;
