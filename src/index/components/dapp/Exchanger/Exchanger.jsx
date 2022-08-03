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
import FiatSelector from './components/FiatSelector/FiatSelector';

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
  const [selected, setSelected] = React.useState(null);
  const currency = _.get(selected, 'symbol');
  const reservation = useSelector(state => _.get(state, `fiat.topup.${currency}`));
  const {
    fiats, chainId, accountAddress,
    web3, updateFiats, isConnected,
  } = context;
  const userId = `${chainId}${accountAddress}`;
  const tokens = _.get(fiats, userId, []).map(token => {
    const price = _.get(rates, token.symbol.toLowerCase());
    return price ? {...token, price} : token;
  });

  /**
   * Update "selected" — fiat token state.
   * Sets router param
   * @param currencyObject {object} - fiat token
   */
  const setCurrency = currencyObject => {
    setSelected(currencyObject);
    const routerState = router.getState();
    if (routerState.params.currency !== currencyObject.symbol) {
      router.navigate(routerState.name, {
        currency: currencyObject.symbol,
      });
    }
  };

  /**
   * Update fiats tokens list and their balances.
   * Sets default fiat
   */
  fiatsUpdate = () => {
    if (isConnected && accountAddress) {
      updateFiats().then(fiats => {
        if (!selected) {
          const initialCurrency = fiats[userId]
            .find(fiat => fiat.symbol === initGetParams.params.currency);
          setCurrency(initialCurrency || fiats[userId][0]);
        } else {
          const currency = fiats[userId].find(c => selected.symbol === c.symbol);
          if (currency) {
            setCurrency(currency);
          }
        }
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
    if (!isConnected || !accountAddress || !selected) {
      dispatch({
        type: actionTypes.FIAT_TOPUP_DELETE,
        payload: currency,
      });
    } else {
      web3Backend.getReservation(currency, accountAddress)
        .then(data => {
          const res = data[0];
          if (!res) {
            if (reservation) {
              // If there was reservation before get available banks again
              getBanks();
            }
            dispatch({
              type: actionTypes.FIAT_TOPUP_DELETE,
              payload: currency,
            });
            return;
          }
          let payload = {};
          payload[currency] = res;
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
                currency: selected.symbol,
              }
            }
          };
          dispatch({
            type: actionTypes.WALLET_SET_CARD_RESERVATION,
            payload,
          });
        }).catch(error => {
        console.error('[Exchanger][getReservation]', error);
        dispatch({
          type: actionTypes.FIAT_TOPUP_DELETE,
          payload: currency,
        });
      });
    }
    cardsUpdateTimeout = setTimeout(() => cardsUpdate(), UPDATE_DELAY);
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
  }, [accountAddress, chainId, isConnected, selected]);

  React.useEffect(() => {
    getBanks();
  }, []);

  return (
    <CabinetContent className="Exchanger__wrap">
      <div className="Exchanger">
        <h2>Exchanger</h2>
        <div className="Exchanger__content">
          <FiatSelector
            tokens={tokens} selected={selected} onChange={setCurrency}
            {...{reservation}}
          />
          <Instruction />
        </div>
      </div>
    </CabinetContent>
  );
}

export default Exchanger;
