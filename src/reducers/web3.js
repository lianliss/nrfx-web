import * as actionTypes from "../actions/actionTypes";

const initialState = {
  status: {
    isRequested: false,
    isWalletsLoaded: false,
    isBalancesLoaded: false,
  },
  wallets: [],
  balances: [],
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
      console.log('WEB3_SET_STATUS', action);
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
      } = action.payload;

      return {
        ...state,
        balances: balances
          ? balances
          : state.balances,
        wallets: wallets
          ? wallets
          : state.wallets,
      };
    }

    case actionTypes.WEB3_UPDATE: {
      const {
        balance = {},
        wallet = {},
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
          : state.wallets
      };
    }

    default:
      return state;
  }
}
