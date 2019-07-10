import * as actionTypes from '../actions/actionTypes';

const initialState = {
  wallets: [],
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.WALLETS:
      return Object.assign({}, state, { wallets: action.payload });

    case actionTypes.TRANSACTION_HISTORY:
      return Object.assign({}, state, { transactions: action.payload });

    default:
      return state;
  }
}
