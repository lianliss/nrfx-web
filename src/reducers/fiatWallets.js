import * as actionTypes from '../actions/actionTypes';

const initialState = {
  balances: [],
  wallets: [],
  history: [],
  rates: {},
  rate: 0,
  loadingStatus: {
    default: 'loading',
    marketForm: ''
  },
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {


    case actionTypes.FIAT_WALLETS_SET: {
      return {
        ...state,
        ...action.payload,
        pending: false,
      };
    }

    case actionTypes.FIAT_WALLETS_UPDATE: {
      const { balance, wallet } = action.payload;
      return {
        ...state,
        history: [action.payload.history, ...state.history],
        balances: state.balances.map(b => b.id === balance.id ? {...b, ...balance} : b),
        wallets: state.wallets.map(w => w.id === wallet.id ? {...w, ...wallet} : w),
      };
    }

    case actionTypes.FIAT_WALLETS_SET_LOADING_STATUS: {
      return {
        ...state,
        loadingStatus: {
          ...state.loadingStatus,
          [action.section]: action.status
        }
      };
    }

    case actionTypes.FIAT_WALLETS_SET_RATE: {
      return {
        ...state,
        rate: action.rate
      };
    }

    default:
      return state;
  }
}
