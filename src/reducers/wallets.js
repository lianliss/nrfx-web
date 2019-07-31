import * as actionTypes from '../actions/actionTypes';

const initialState = {
  wallets: [],
  history: [],
  transactions: [],
  transactionsNext: null,
  transactionsLoadingMore: '',
  loadingStatus: {},
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {

    case actionTypes.WALLETS_SET_LOADING_STATUS: {
      return Object.assign({}, state, {
        loadingStatus: Object.assign({}, state.loadingStatus, { [action.section]: action.status })
      });
    }

    case actionTypes.WALLETS_SET: {
      return Object.assign({}, state, {
        wallets: action.wallets,
      });
    }

    case actionTypes.WALLETS_TRANSACTIONS_SET: {
      return Object.assign({}, state, {
        transactions: action.items,
        transactionsNext: action.next
      });
    }

    case actionTypes.WALLETS_TRANSACTIONS_LOADING_MORE: {
      return Object.assign({}, state, {
        transactionsLoadingMore: action.status,
      });
    }

    case actionTypes.WALLETS_TRANSACTIONS_APPEND: {
      const current = Object.assign([], state.transactions);
      return Object.assign({}, state, {
        transactions: current.concat(action.items),
        transactionsNext: action.next
      });
    }

    default:
      return state;
  }
}
