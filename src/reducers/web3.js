import * as actionTypes from "../actions/actionTypes";
import _ from 'lodash';

const initialState = {
  status: {
    isRequested: false,
    isWalletsLoaded: false,
    isBalancesLoaded: false,
  },
  wallets: [],
  balances: [],
  rates: {},
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {

    case actionTypes.WEB3_SET_INIT_STATE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case actionTypes.WEB3_SET_STATUS: {
      return {
        ...state,
        status: {
          ...state.status,
          [action.section]: action.status
        }
      };
    }

    case actionTypes.WEB3_SET_DATA: {
      const {
        balances,
        wallets,
        rates,
      } = action.payload;

      return {
        ...state,
        balances: balances
          ? balances
          : state.balances,
        wallets: wallets
          ? wallets
          : state.wallets,
        rates: rates
          ? rates
          : state.rates,
      };
    }

    case actionTypes.WEB3_UPDATE: {
      const {
        balance = {},
        wallet = {},
        rates = {},
      } = action.payload;

      return {
        ...state,
        balances: balance
          ? state.balances.map(b =>
            b.address === balance.address ? { ...b, ...balance } : b
          )
          : state.balances,
        wallets: wallet
          ? state.wallets.map(w =>
            w.address === wallet.address ? { ...w, ...wallet } : w
          )
          : state.wallets,
        rates: {...state.rates, ...rates},
      };
    }

    case actionTypes.WEB3_SET_RATE: {
      const {
        token, rate,
      } = action.payload;

      const rates = _.cloneDeep(state.rates);
      rates[token] = rate;
      return {
        ...state,
        rates,
      }
    }

    default:
      return state;
  }
}
