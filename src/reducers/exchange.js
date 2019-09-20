import * as actionTypes from '../actions/actionTypes';
import * as utils from '../utils';

const initialState = {
  loadingStatus: {},
  balances: [],
  trades: [],
  open_orders: [],
  last_orders: [],
  tickerInfo: null,
  balanceInfo: {
    primary: {},
    secondary: {},
  },
  market: 'btc/usdt',
  depth: {
    asks: [],
    bids: [],
  },
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.EXCHANGE_SET: {
      let tickerInfo = {};
      for (let ticker of action.tickers) {
        if (ticker.market === state.market) {
          tickerInfo = ticker;
        }
      }

      let balanceInfo = {};
      let [primary, secondary] = state.market.split('/');
      for (let balance of action.balances) {
        if (balance.currency === primary) {
          balanceInfo.primary = balance;
        } else if (balance.currency === secondary) {
          balanceInfo.secondary = balance;
        }
      }

      return Object.assign({}, state, {...utils.removeProperty(action, 'type'), tickerInfo, balanceInfo})
    }

    case actionTypes.EXCHANGE_SET_LOADING_STATUS: {
      return Object.assign({}, state, {
        loadingStatus: Object.assign({}, state.loadingStatus, { [action.section]: action.status })
      });
    }

    default:
      return state;
  }
}
