import * as actionTypes from "../actions/actionTypes";

const initialState = {
  status: {
    main: "",
    history: "",
    historyMore: "",
    rate: "loading",
    swap: ""
  },
  wallets: [],
  balances: [],
  can_exchange: [],
  swap: {
    focus: "from",
    fromCurrency: "idr",
    toCurrency: "btc",
    fromAmount: "100000",
    toAmount: "",
    rate: 0
  },
  history: {
    next: null,
    items: []
  }
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.WALLET_SET_INIT_STATE: {
      return {
        ...state,
        ...action.payload,
        history: initialState.history
      };
    }

    case actionTypes.WALLET_SET_STATUS: {
      return {
        ...state,
        status: {
          ...state.status,
          [action.section]: action.status
        }
      };
    }

    case actionTypes.WALLET_HISTORY_SET: {
      return {
        ...state,
        history: action.payload
      };
    }

    case actionTypes.WALLET_HISTORY_ADD_MORE: {
      return {
        ...state,
        history: {
          next: action.payload.next,
          items: [...state.history.items, ...action.payload.items]
        }
      };
    }

    case actionTypes.WALLET_SWAP_SET_AMOUNT:
    case actionTypes.WALLET_SWAP_UPDATE_AMOUNT: {
      return {
        ...state,
        swap: {
          ...state.swap,
          [action.payload.type + "Amount"]: action.payload.value
        }
      };
    }

    case actionTypes.WALLET_SWAP_SET_RATE: {
      return {
        ...state,
        swap: {
          ...state.swap,
          rate: action.payload
        }
      };
    }

    case actionTypes.WALLET_SWAP_SET_CURRENCY: {
      return {
        ...state,
        swap: {
          ...state.swap,
          [action.payload.type + "Currency"]: action.payload.value
        }
      };
    }

    case actionTypes.WALLET_SWAP_SWITCH: {
      return {
        ...state,
        swap: {
          ...state.swap,
          toAmount: state.swap.fromAmount,
          toCurrency: state.swap.fromCurrency,
          fromAmount: state.swap.toAmount,
          fromCurrency: state.swap.toCurrency,
          focus: state.swap.focus === "from" ? "to" : "from"
        }
      };
    }

    case actionTypes.WALLET_SWAP_SET_FOCUS: {
      return {
        ...state,
        swap: {
          ...state.swap,
          focus: action.payload
        }
      };
    }

    case actionTypes.WALLET_SWAP_SUCCESS: {
      const { balance, wallet } = action.payload;
      return {
        ...state,
        history: {
          ...state.history,
          items: action.payload.history
            ? [action.payload.history, ...state.history.items]
            : state.history.items
        },
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

    default:
      return state;
  }
}
