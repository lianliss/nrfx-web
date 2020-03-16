import * as actionTypes from "../actions/actionTypes";

const initialState = {
  balances: [],
  wallets: [],
  history: [],
  rates: {},
  rate: 0,
  rateUpdateTime: 0,
  merchants: [],
  exchange_fee: 0,
  withdrawalBankList: null,
  refillBankList: null,
  loadingStatus: {
    withdrawalBankList: "",
    refillBankList: "",
    default: "loading",
    merchants: "",
    marketForm: ""
  }
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.FIAT_WALLETS_SET: {
      return {
        ...state,
        ...action.payload,
        pending: false
      };
    }

    case actionTypes.FIAT_WALLETS_UPDATE: {
      const { balance, wallet } = action.payload;
      return {
        ...state,
        history: action.payload.history
          ? [action.payload.history, ...state.history]
          : state.history,
        balances: balance
          ? state.balances.map(b =>
              b.id === balance.id ? { ...b, ...balance } : b
            )
          : state.balances,
        wallets: wallet
          ? state.wallets.map(w =>
              w.id === wallet.id ? { ...w, ...wallet } : w
            )
          : state.wallets
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
        rate: action.rate,
        rateUpdateTime: action.uprateTime
      };
    }

    case actionTypes.FIAT_WALLETS_SET_MERCHANTS: {
      return {
        ...state,
        merchants: action.methods
      };
    }

    case actionTypes.FIAT_WALLETS_SET_WITHDRAWAL_BANK_LIST: {
      return {
        ...state,
        withdrawalBankList: action.banks
      };
    }

    case actionTypes.FIAT_WALLETS_SET_REFILL_BANK_LIST: {
      return {
        ...state,
        refillBankList: action.banks
      };
    }

    case actionTypes.FIAT_WALLETS_APPEND_TRANSACTION: {
      return {
        ...state,
        history: [action.transaction, ...state.history]
      };
    }

    default:
      return state;
  }
}
