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
import { isFiat, getLang } from 'utils';
import { openModal } from 'src/actions';
import { Web3Context } from 'src/services/web3Provider';
import { web3RatesSelector } from 'src/selectors';
import router from 'src/router';
import * as PAGES from 'src/index/constants/pages';
import { setSwap } from 'src/actions/dapp/swap';

// Styles
import './Currency.less';
import LoadingStatus from '../LoadingStatus/LoadingStatus';
import ShowPageOn from '../ShowPageOn/ShowPageOn';
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
    web3,
  } = React.useContext(Web3Context);

  const [currency, setCurrency] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const currencyIsEmpty = _.isEmpty(currency);
  const paramsCurrency = params.currency || '';
  const rate = rates[paramsCurrency.toLowerCase()] || 0;
  const currencyBalance = Number(Number(currency.balance).toFixed(2));

  React.useEffect(() => {
    if (!isConnected) return;

    // Update fiats, and get currency fiat.
    if (isFiat(paramsCurrency)) {
      fetchCurrencyFiat();
      return;
    }

    // Get tokens, and get currency token.
    fetchCurrencyToken();
  }, [accountAddress]);

  const fetchCurrencyFiat = async () => {
    setLoading(true);

    const userId = `${chainId}${accountAddress}`;
    const fiats = await updateFiats().then((r) => r[userId]);
    const currencyFiat = fiats.filter(
      (fiat) => fiat.symbol.toLowerCase() === paramsCurrency.toLowerCase()
    )[0];

    if (currencyFiat) {
      setCurrency({
        ...currencyFiat,
        balance: web3.utils.fromWei(currencyFiat.balance),
      });
    }

    setLoading(false);
  };

  const fetchCurrencyToken = async () => {
    setLoading(true);

    // Get tokens, for check currency.
    const tokens = await getTokens().then((tokens) => tokens);
    const currencyToken = tokens.filter((token) => {
      return token.symbol.toLowerCase() === paramsCurrency.toLowerCase();
    })[0];

    if (currencyToken) {
      const balance = await getTokenBalance(currencyToken.address).then((r) =>
        web3.utils.fromWei(r)
      );
      setCurrency({ ...currencyToken, balance });
    }

    setLoading(false);
  };

  // Render components
  const LoginedButtons = () =>
    isFiat(paramsCurrency) ? (
      <FiatButtons currency={currency} />
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
          >
            <SVG src={require('src/asset/icons/cabinet/card-receive.svg')} />
            {getLang('global_receive')}
          </Button>
          <Button
            type="secondary-light"
            shadow
            onClick={() => openModal('deposit_transfer_send')}
          >
            <SVG src={require('src/asset/icons/cabinet/card-send.svg')} />
            {getLang('global_send')}
          </Button>
        </div>
      </>
    );

  const NotLoginedButton = () => {
    if (loading) {
      return <LoadingStatus status="loading" inline />;
    }

    if (isConnected && currencyIsEmpty) {
      return <h3 style={{ margin: '0 auto' }}>Currency is not exists</h3>;
    }

    return (
      <Button
        type="lightBlue"
        shadow
        onClick={() => openModal('connect_to_wallet')}
      >
        <SVG src={require('src/asset/icons/cabinet/connect-wallet.svg')} />
        {getLang('dapp_global_connect_wallet')}
      </Button>
    );
  };

  return (
    <CabinetBlock className="Currency">
      <div className="Currency__container">
        <div className="Currency__header">
          <div className="Currency__currency">
            <span>{currency.name}</span>
          </div>
          <div className="Currency__preview">
            <WalletIcon currency={currency} size={adaptive ? 45 : 55} />
            {!currencyIsEmpty && (
              <div className="Currency__preview__container">
                <span className="Currency__rate">
                  <NumberFormat
                    number={currencyBalance}
                    currency={currency.symbol}
                  />
                </span>
                <div className="Currency__currency_amount_rate">
                  $&nbsp;
                  <NumberFormat
                    number={currency.balance * rate}
                    currency={'usd'}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="Currency__buttons">
            {!currencyIsEmpty ? <LoginedButtons /> : <NotLoginedButton />}
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
      <ShowPageOn />
    </CabinetBlock>
  );
}

export default Currency;
