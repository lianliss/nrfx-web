import * as actionTypes from "../actions/actionTypes";

const initialState = {
  status: {
    main: ""
  },
  wallets: [],
  balances: [],
  can_exchange: [],
  history: []
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
          ...state,
          [action.section]: action.status
        }
      };
    }

    default:
      return state;
  }
}
