import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Web3Context } from 'services/web3Provider';
import web3Backend from 'services/web3-backend';
import * as actionTypes from "src/actions/actionTypes";
import initGetParams from 'src/services/initialGetParams';
import { useRoute } from 'react-router5';
import router from 'src/router';

// Components
import CabinetContent from '../CabinetContent/CabinetContent';
import SwapForm from '../SwapForm/SwapForm';
import Instruction from './components/Instruction/Instruction';
import { Button, ContentBox } from 'src/ui';
import TokenSelect from 'src/index/containers/dapp/DexSwap/components/TokenSelect/TokenSelect';
import ExchangerSwap from './components/ExchangerSwap/ExchangerSwap';
import ExchangerTopup from './components/ExchangerTopup/ExchangerTopup';

// Utils
import { web3RatesSelector, adaptiveSelector } from 'src/selectors';
import { openModal } from 'src/actions';
import { LOGIN } from 'src/components/AuthModal/fixtures';
import { getLang } from 'src/utils';
import useUpdateReservation from 'src/hooks/dapp/useUpdateReservation';
import ExchangerStorage from 'src/utils/dapp/ExchangerStorage';
import WatchVideo from './components/WatchVideo';

// Styles
import './Exchanger.less';

const UPDATE_DELAY = 5000;
let fiatsUpdateTimeout;
let cardsUpdateTimeout;
let updateTokenBalanceTimeout;
// Let's predefine functions so that timeouts take their actual versions
let fiatsUpdate;
let cardsUpdate;

function Exchanger(props) {
  const dispatch = useDispatch();
  const isAdaptive = useSelector(adaptiveSelector);
  const { route } = useRoute();
  const initialCurrencySymbol = route.params.currency;
  // const initialCoinSymbol = route.params.coin;
  const rates = useSelector(web3RatesSelector);
  const context = React.useContext(Web3Context);

  // Reservation
  const { updateReservation, updateBanks } = useUpdateReservation();

  const {
    fiats,
    chainId,
    accountAddress,
    web3,
    updateFiats,
    isConnected,
    tokens,
    loadAccountBalances,
    cmcTokens,
    getTokens,
    fiatsLoaded,
    tokensLoaded,
    getPairAddress,
    network,
    getTokenBalance,
    updateTokenBalance: updateTokenBalanceContext,
  } = context;

  const [limits, setLimits] = React.useState([]);
  const [fiatSelected, setFiatSelected] = React.useState(null);
  const [coinSelected, setCoinSelected] = React.useState(null);
  const [initTokensMounted, setInitTokensMounted] = React.useState(false);
  const fiatSymbol = _.get(fiatSelected, 'symbol');
  const coinSymbol = _.get(coinSelected, 'symbol');
  const reservation = useSelector(state => _.get(state, `fiat.topup.${fiatSymbol}`));

  const userId = `${chainId}${accountAddress}`;
  let defaultUSD;
  switch (chainId) {
    case 97:
      defaultUSD = {
        name: "Testnet United States Dollar",
        symbol: "USD",
        address: "0x6dBB65750a6BBE8A0CBD28257008C464bAbe4de6",
        chainId: 97,
        decimals: 18,
        logoURI: "https://static.narfex.com/img/currencies/dollar.svg",
        isFiat: true,
      };
      break;
    case 1:
      defaultUSD = {
        name: "Russian Ruble on Narfex",
        symbol: "RUB",
        address: "0x5E11E947e69e8e6267e28C3db9425acd3AA4B489",
        chainId: 1,
        decimals: 6,
        logoURI: "https://static.narfex.com/img/currencies/rubles.svg",
        isFiat: true,
      };
      break;
    case 56:
    default:
      defaultUSD = {
        name: "United States Dollar on Narfex",
        symbol: "USD",
        address: "0xc0Bd103de432a939F93E1E2f8Bf1e5C795774F90",
        logoURI: "https://static.narfex.com/img/currencies/dollar.svg",
        chainId: 56,
        decimals: 18,
        isFiat: true,
      };
  }
  const chainFiats = _.get(fiats, 'known', []).filter(f => f.chainId === chainId);
  const defaultFiats = chainFiats.length ? chainFiats : [defaultUSD];
  const fiatTokens = _.get(fiats, userId, defaultFiats).map(token => {
    const price = _.get(rates, token.symbol.toLowerCase());
    return price ? {...token, price} : token;
  });

  // Get raw coins list
  const binanceSymbols = Object.keys(rates)
    .filter(symbol => symbol.indexOf('USDT') > 0)
    .map(symbol => symbol.split('USDT')[0]);
  const symbols = [
    'NRFX',
    'USDT',
    ...binanceSymbols
  ];
  const coins = _.uniqBy(
    tokens,
    'address',
  );

  // Filters for select the fiat.
  const { params } = router.getState();
  const allCoins = [...fiatTokens, ...coins];

  const isParamsCoin = (t) => t.symbol === params.coin;
  const isParamsFiat = (t) => t.symbol === params.currency;
  const isSelectedFiat = (t) => t.symbol === fiatSymbol;
  const isSelectedCoin = (t) => t.symbol === coinSymbol;
  const isUSD = (t) => !isSelectedCoin(t) && t.symbol === 'USD';
  const isAvailableToken = (t, secondToken) => secondToken?.isFiat ? !t?.isFiat : t?.isFiat;

  const getParamsFiat = () => allCoins.find((t) => isParamsFiat(t) && !isSelectedCoin(t));
  const getAvailableFiat = () => allCoins.find((t) => !isSelectedCoin(t) && isAvailableToken(t, coinSelected));
  const getUSDFromCoins = () => allCoins.find(isUSD);
  const getParamsCoin = () => allCoins.find((t) => isParamsCoin(t) && !isSelectedFiat(t));
  const getAvailableCoin = () => allCoins.find((t) => !isSelectedFiat(t) && !t.isFiat);

  // Exchanger storage.
  const exchangerStorage = new ExchangerStorage();
  const initialFiat = _.get(exchangerStorage.storage, 'fiat');
  const initialCoin = _.get(exchangerStorage.storage, 'coin');

  // Get token by storage.
  const getInitialFiat = () =>
    allCoins.find((t) => t.symbol === initialFiat);
  const getInitialCoin = () =>
    allCoins.find((t) => t.symbol === initialCoin);

  const swapSelected = () => {
    if (coinSelected) {
      setFiatSelected(coinSelected);
    } else {
      setFiatSelected(
        [...fiatTokens, ...coins].find((t) => t.symbol !== fiatSelected?.symbol)
      );
    }

    if (fiatSelected) {
      setCoinSelected(fiatSelected);
    } else {
      setCoinSelected(
        [...fiatTokens, ...coins].find((t) => t.symbol !== coinSelected?.symbol)
      );
    }

    const routerState = router.getState();
    router.navigate(routerState.name, {
      ...routerState.params,
      currency: coinSymbol,
      coin: fiatSymbol,
    }, {replace: true});
  };

  /**
   * Update "fiatSelected" — fiat token state.
   * Sets router param
   * @param currencyObject {object} - fiat token
   */
  const setFiat = currencyObject => {
    if (currencyObject.symbol === coinSymbol) {
      return swapSelected();
    }
    setFiatSelected(currencyObject);
    const routerState = router.getState();
    if (routerState.params.currency !== currencyObject.symbol) {
      router.navigate(routerState.name, {
        ...routerState.params,
        currency: currencyObject.symbol,
      }, {replace: true});
    }
  };

  /**
   * Update "fiatSelected" — coin token state.
   * Sets router param
   * @param currencyObject {object} - coin token
   */
  const setCoin = currencyObject => {
    if (currencyObject.symbol === fiatSymbol) {
      return swapSelected();
    }
    setCoinSelected(currencyObject);
    const routerState = router.getState();
    if (routerState.params.currency !== currencyObject.symbol) {
      router.navigate(routerState.name, {
        ...routerState.params,
        coin: currencyObject.symbol,
      }, {replace: true});
    }
  };

  /**
   * Update the fiats tokens list and their balances.
   * Sets the default fiat
   */
  fiatsUpdate = async () => {
    try {
      await updateFiats().then((fiats) => {
        const currencySymbol = router.getState().params.currency;
        if (!fiatSelected) {
          const initialCurrency = fiats[userId].find(
            (fiat) => fiat.symbol === currencySymbol
          );
          if (fiatSelected.symbol !== _.get(initialCurrency, 'symbol')) {
            setFiat(initialCurrency || fiats[userId][0]);
          }
        } else {
          const updatedFiat = _.get(fiats, userId, []).find(
            (c) => currencySymbol === c.symbol
          );
          if (updatedFiat) {
            setFiat(updatedFiat);
          }
        }
      });
    } catch (error) {
      console.error('[fiatsUpdate]', error);
    }

    fiatsUpdateTimeout = setTimeout(() => fiatsUpdate(), UPDATE_DELAY);
  };

  /**
   * Updates the current reservation with current selected fiat
   */
  cardsUpdate = () => {
    if (!isConnected || !accountAddress || !fiatSelected) {
      if (reservation && reservation[fiatSymbol]) {
        dispatch({
          type: actionTypes.FIAT_TOPUP_DELETE,
          payload: fiatSymbol,
        });
      }
    } else {
      updateReservation(fiatSymbol);
    }
    cardsUpdateTimeout = setTimeout(() => cardsUpdate(), UPDATE_DELAY);
  };

  const getLimits = async () => {
    web3Backend.getLimits().then(data => {
      setLimits(data);
    }).catch(error => {
      console.error('[Exchanger][getLimits]', error);
      setTimeout(getLimits, 5000);
    })
  };

  const updateTokenBalance = async () => {
    try {
      if (!isConnected) return;
      if (_.get(fiatSelected, 'isFiat', false)) return;

      // Get the currency coin to update it.
      // The using fiatSelected here is unwanted solution.
      const currencySymbol = router.getState().params.currency;
      const currency = coins.find(t => t.symbol === currencySymbol);
      if (!currency) return;

      // Fetch the token balance.
      const balance = await getTokenBalance(currency.address, true);

      // While the balance is loading currency can be changed.
      const symbolAfterLoading = router.getState().params.currency;
      if (currencySymbol !== symbolAfterLoading) return;

      // Set the token balance to context.
      // And set the new fiatSelected with the current balance.
      updateTokenBalanceContext(currency.address, balance);
      setFiatSelected({ ...currency, balance });
    } catch (error) {
      console.error('[updateTokenBalance]', error);
    }

    // Update the balance with UPDATE_DELAY.
    updateTokenBalanceTimeout = setTimeout(() => updateTokenBalance(), UPDATE_DELAY);
  };

  React.useEffect(() => {
    if (!cmcTokens) {
      getTokens();
    }
  }, []);

  React.useEffect(() => {
    fiatsUpdate();
    return () => {
      clearTimeout(fiatsUpdateTimeout);
    }
  }, [accountAddress, chainId, isConnected]);

  React.useEffect(() => {
    cardsUpdate();
    return () => {
      clearTimeout(cardsUpdateTimeout);
    }
  }, [accountAddress, chainId, isConnected, fiatSelected]);

  React.useEffect(() => {
    updateBanks();
    getLimits();
  }, []);

  // Set initial coin
  React.useEffect(() => {
    const coin = getParamsCoin() || getAvailableCoin();

    setCoin(coin);
  }, [chainId]);

  // Set initial fiat
  React.useEffect(() => {
    if (!_.get(getParamsFiat(), 'isFiat')) return;
    if (!initialCurrencySymbol) {
      setFiat(getUSDFromCoins() || getAvailableFiat());

      return;
    }

    if (!isConnected || initTokensMounted) {
      const fineFiat =
        getParamsFiat() || getAvailableFiat() || getUSDFromCoins();

      setFiat(fineFiat);
    }
  }, [fiatsLoaded, isConnected]);

  React.useEffect(() => {
    updateTokenBalance();

    return () => {
      clearTimeout(updateTokenBalanceTimeout);
    }
  }, [fiatSymbol, chainId, isConnected]);

  React.useEffect(() => {
    const isSymbols = fiatSymbol && coinSymbol;
    const coinsIsLoaded = fiatsLoaded && tokensLoaded;

    if (isConnected && isSymbols && coinsIsLoaded) {
      exchangerStorage.set({
        fiat: fiatSymbol,
        coin: coinSymbol,
      });
    }

    if (fiatSymbol === coinSymbol) {
      setFiat(getParamsFiat() || getAvailableFiat());
    }
  }, [fiatSymbol, coinSymbol]);

  React.useEffect(() => {
    if (initTokensMounted) return;
    if (!isConnected || !fiatsLoaded || !tokensLoaded) return;

    const coin = getInitialCoin() || getParamsCoin() || getAvailableCoin();
    const fiat = getInitialFiat() || getParamsFiat() || getAvailableFiat();

    setCoin(coin);
    setFiat(fiat);

    setInitTokensMounted(true);
  }, [isConnected, fiatsLoaded, tokensLoaded]);

  return (
    <CabinetContent className="Exchanger__wrap">
      <div className="Exchanger">
        <h2>{getLang('dapp_exchanger_page_title')}</h2>
        <div className="Exchanger__content">
          <ExchangerTopup
            fiats={fiatTokens}
            coins={coins}
            fiat={fiatSelected}
            coin={coinSelected}
            setFiat={setFiat}
            setCoin={setCoin}
            limits={limits}
            {...{reservation}}
          />
          {!isAdaptive && <WatchVideo adaptive={isAdaptive} />}
          <ExchangerSwap
            fiats={fiatTokens}
            fiatsLoaded={fiatsLoaded}
            coins={coins}
            fiat={fiatSelected || fiatTokens[0]}
            coin={coinSelected}
            setFiat={setFiat}
            setCoin={setCoin}
            limits={limits}
            {...{reservation}}
          />
          {isAdaptive && <WatchVideo adaptive={isAdaptive} />}
          <Instruction />
        </div>
      </div>
    </CabinetContent>
  );
}

export default Exchanger;
