import * as actionTypes from "../actions/actionTypes";

const initialState = {
  status: {
    main: ""
  },
  wallets: [],
  balances: [],
  can_exchange: [],
  history: {
    next: null,
    items: []
  }
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.WALLET_INIT: {
      return {
        ...state,
        ...action.payload
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

    default:
      return state;
  }
}
