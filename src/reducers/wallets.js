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
  loadingStatus: {
    default: 'loading',
    limits: 'loading',
    sendCode: null,
  },
  limits: [],
  sendCoinModal: {
    gaCode: '',
    walletId: null,
    address: null,
    amount: 0,
    amountUsd: 0,
  }
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {

    case actionTypes.WALLETS_SET_LOADING_STATUS: {
      return Object.assign({}, state, {
        loadingStatus: Object.assign({}, state.loadingStatus, { [action.section]: action.status })
      });
    }

    case actionTypes.WALLETS_SET: {
      return {
        ...state,
        wallets: action.wallets,
        sendCoinModal: {
          walletId: (action.wallets.find(w => w.currency === action.currency) || action.wallets[0]).id,
        }
      };
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

    case actionTypes.WALLETS_GENERATE_SUCCESS: {
      return { ...state, wallets: [...state.wallets, action.wallet] }
    }

    case actionTypes.WALLETS_SET_LIMITS: {
      return {
        ...state,
        limits: action.limits,
      }
    }

    case actionTypes.WALLETS_SEND_COIN_MODAL_SET_VALUE: {
      return {
        ...state,
        sendCoinModal: {
          ...state.sendCoinModal,
          [action.property]: action.value
        }
      }
    }

    case actionTypes.WALLETS_WALLET_UPDATE: {
      return {
        ...state,
        wallets: state.wallets.map(wallet => (wallet.id === action.wallet.id ? action.wallet : wallet ))
      }
    }

    case actionTypes.WALLETS_SEND_COIN_MODAL_CLEAR: {
      return {
        ...state,
        sendCoinModal: {
          ...initialState.sendCoinModal,
          walletId: state.initialState.walletId
        }
      }
    }

    default:
      return state;
  }
}
