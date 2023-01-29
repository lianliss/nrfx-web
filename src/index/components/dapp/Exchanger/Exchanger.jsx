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

// Styles
import './Exchanger.less';

const UPDATE_DELAY = 5000;
let fiatsUpdateTimeout;
let cardsUpdateTimeout;
// Let's predefine functions so that timeouts take their actual versions
let fiatsUpdate;
let cardsUpdate;

function Exchanger(props) {
  const dispatch = useDispatch();
  const isAdaptive = useSelector(adaptiveSelector);
  const { route } = useRoute();
  const initialCurrencySymbol = route.params.currency;
  // const initialCoinSymbol = route.params.coin;
  const methods = useSelector(state => state.fiat.banks);
  const rates = useSelector(web3RatesSelector);
  const context = React.useContext(Web3Context);

  const {
    fiats, chainId, accountAddress,
    web3, updateFiats, isConnected,
    tokens, loadAccountBalances, cmcTokens,
    getTokens, getPairAddress, network
  } = context;

  const [limits, setLimits] = React.useState([]);
  const [fiatSelected, setFiatSelected] = React.useState(null);
  const [coinSelected, setCoinSelected] = React.useState(null);
  const [fiatsLoaded, setFiatsLoaded] = React.useState(false);
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
  const fiatTokens = _.get(fiats, userId, [defaultUSD]).map(token => {
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

  React.useEffect(() => {
    if (!cmcTokens) {
      getTokens();
    }
  }, []);
  
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
   * Update fiats tokens list and their balances.
   * Sets default fiat
   */
  fiatsUpdate = async () => {
    setFiatsLoaded(false);
    await updateFiats().then(fiats => {
      const currencySymbol = router.getState().params.currency;
      if (!fiatSelected) {
        const initialCurrency = fiats[userId]
          .find(fiat => fiat.symbol === currencySymbol);
        if (fiatSelected.symbol !== _.get(initialCurrency, 'symbol')) {
          setFiat(initialCurrency || fiats[userId][0]);
        }
      } else {
        const fiatSymbol = fiats[userId].find(c => currencySymbol === c.symbol);
        if (fiatSymbol) {
          setFiat(fiatSymbol);
        }
      }
    });
    setFiatsLoaded(true);
    fiatsUpdateTimeout = setTimeout(() => fiatsUpdate(), UPDATE_DELAY);
  };

  /**
   * Updates bank list
   */
  const getBanks = () => {
    web3Backend.getBanks().then(banks => {
      dispatch({
        type: actionTypes.FIAT_BANKS_UPDATE,
        payload: banks,
      });
    });
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
      web3Backend.getReservation(fiatSymbol, accountAddress, network.networkID)
        .then(data => {
          const res = data[0];
          if (!res) {
            if (reservation) {
              // If there was reservation before get available banks again
              getBanks();
              dispatch({
                type: actionTypes.FIAT_TOPUP_DELETE,
                payload: fiatSymbol,
              });
            }
            return;
          }
          let payload = {};
          payload[fiatSymbol] = res;
          dispatch({
            type: actionTypes.FIAT_TOPUP_UPDATE,
            payload,
          });

          // Data for invoice
          const method = methods.find(b => b.code === res.bank);
          const bankName = method ? method.title : res.bank;
          payload = {
            reservation: {
              id: res.operation_id,
              amount: res.amount,
              status: res.status,
              fee: res.fee,
            },
            card: {
              isCard: !!res.is_card,
              number: res.number,
              expire_in: res.book_expiration,
              address: res.address,
              routing_number: res.routing_number,
              account_type: res.account_type,
              iban: res.iban,
              bic: res.bic,
              short_code: res.short_code,
              institution_number: res.institution_number,
              transit_number: res.transit_number,
              bank: {
                code: res.bank,
                name: bankName,
                holder_name: res.holder_name,
                currency: fiatSelected.symbol,
              }
            }
          };
          dispatch({
            type: actionTypes.WALLET_SET_CARD_RESERVATION,
            payload,
          });
        }).catch(error => {
          console.error('[Exchanger][getReservation]', error);
          if (reservation && reservation[fiatSymbol]) {
            dispatch({
              type: actionTypes.FIAT_TOPUP_DELETE,
              payload: fiatSymbol,
            });
          }
      });
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
    getBanks();
    getLimits();
  }, []);

  // Set initial coin
  React.useEffect(() => {
    setCoin(
      tokens.find((t) => t.symbol === initGetParams.params.coin) ||
        [...network.displayTokens, ...tokens].find(
          (t) => t.symbol !== initGetParams.params.fiat
        )
    );
  }, [chainId]);

  // Set initial fiat
  React.useEffect(() => {
    // Filters for select the fiat.
    const isUSD = (t) => t.symbol !== coinSelected?.symbol && t.symbol === 'USD';
    const isFineFiat = (t) => t.symbol !== coinSelected?.symbol;
    const isInitialFiat = (t) => t.symbol === initialCurrencySymbol;

    const allCoins = [...fiatTokens, ...coins];
    const getInitialFiat = () => allCoins.find(isInitialFiat);
    const getAvailableFiat = () => allCoins.find(isFineFiat);
    const getUSDFromCoins = () => allCoins.find(isUSD);

    if (!initialCurrencySymbol) {
      setFiat(getUSDFromCoins() || getAvailableFiat());

      return;
    }

    const fineFiat =
      getInitialFiat() || getAvailableFiat() || getUSDFromCoins();

    setFiat(fineFiat);
  }, [fiats]);

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
          <Instruction />
        </div>
      </div>
    </CabinetContent>
  );
}

export default Exchanger;
