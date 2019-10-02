import * as actionTypes from '../actions/actionTypes';

const initialState = {
  wallets: [],
  history: [],
  transactions: [],
  transactionsNext: null,
  transactionsLoadingMore: '',
  transfers: [],
  transfersLoadingMore: '',
  transfersNext: null,
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
      return Object.assign({}, state, {
        transactions: {
          items:  Object.assign([], state.transactions.items).concat(action.items),
          next: action.next
        },
        transactionsNext: action.next
      });
    }

    case actionTypes.WALLETS_TRANFERS_SET: {
      return Object.assign({}, state, {
        transfers: action.items,
        transfersNext: action.next
      });
    }

    case actionTypes.WALLETS_TRANFERS_LOADING_MORE: {
      return Object.assign({}, state, {
        transfersLoadingMore: action.status,
      });
    }

    case actionTypes.WALLETS_TRANFERS_APPEND: {
      return Object.assign({}, state, {
        transfers: {
          items: Object.assign([], state.transfers.items).concat(action.items),
          next: action.next
        },
        transfersNext: action.next
      });
    }

    default:
      return state;
  }
}
