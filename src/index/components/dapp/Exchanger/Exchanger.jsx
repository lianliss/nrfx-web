import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Web3Context } from 'services/web3Provider';
import web3Backend from 'services/web3-backend';
import * as actionTypes from "src/actions/actionTypes";
import initGetParams from 'src/services/initialGetParams';
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
  const methods = useSelector(state => state.fiat.banks);
  const rates = useSelector(web3RatesSelector);
  const context = React.useContext(Web3Context);

  const {
    fiats, chainId, accountAddress,
    web3, updateFiats, isConnected,
    tokens, loadAccountBalances,
  } = context;

  const [limits, setLimits] = React.useState([]);
  const [fiatSelected, setFiatSelected] = React.useState(null);
  const [coinSelected, setCoinSelected] = React.useState(
    tokens.find(t => t.symbol === initGetParams.params.coin) || tokens.find(t => t.symbol === 'NRFX')
  );
  const fiatSymbol = _.get(fiatSelected, 'symbol');
  const reservation = useSelector(state => _.get(state, `fiat.topup.${fiatSymbol}`));

  const userId = `${chainId}${accountAddress}`;
  const fiatTokens = _.get(fiats, userId, [{
    name: 'Russian Ruble on Narfex',
    symbol: 'RUB',
    address: '0xa4FF4DBb11F3186a1e96d3e8DD232E31159Ded9B',
    logoURI: 'https://static.narfex.com/img/currencies/rubles.svg',
  }]).map(token => {
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
    tokens.filter(token => symbols.indexOf(token.symbol) >= 0),
    'address',
  );

  /**
   * Update "fiatSelected" — fiat token state.
   * Sets router param
   * @param currencyObject {object} - fiat token
   */
  const setFiat = currencyObject => {
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
  fiatsUpdate = () => {
    if (isConnected && accountAddress) {
      updateFiats().then(fiats => {
        if (!fiatSelected) {
          const initialCurrency = fiats[userId]
            .find(fiat => fiat.symbol === initGetParams.params.currency);
          setFiat(initialCurrency || fiats[userId][0]);
        } else {
          const fiatSymbol = fiats[userId].find(c => fiatSelected.symbol === c.symbol);
          if (fiatSymbol) {
            setFiat(fiatSymbol);
          }
        }
      }).catch(error => {

      });
    }
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
      web3Backend.getReservation(fiatSymbol, accountAddress)
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
              number: res.number,
              expire_in: res.book_expiration,
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

  return (
    <CabinetContent className="Exchanger__wrap">
      <div className="Exchanger">
        <h2>Exchanger</h2>
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
