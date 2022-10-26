import * as actionTypes from '../actions/actionTypes';
import { dataStatus, sortTypes } from '../index/constants/dapp/types';

const initialState = {
  wallet: {
    tokens: [],
    transactions: {
      items: [],
      status: dataStatus.IDLE, // dataStatus
      sort: sortTypes.DATE_DESC, // sortTypes
    },
  },
  swap: {
    from: { symbol: 'NRFX' },
    to: { symbol: 'USDT' },
  },
};

function reduce(state = initialState, action = {}) {
  const { payload } = action;

  switch (action.type) {
    case actionTypes.DAPP_SET_SWAP: {
      let from = payload.from || state.swap.from;
      let to = payload.to || state.swap.to;

      if (from.symbol === to.symbol) {
        if (payload.from) to = state.swap.from;
        if (payload.to) from = state.swap.to;
      }

      return {
        ...state,
        swap: {
          from,
          to,
        },
      };
    }
    case actionTypes.DAPP_SET_WITHDRAW: {
      return {
        ...state,
        withdraw: {
          ...state.withdraw,
          ...payload,
        },
      };
    }
    case actionTypes.DAPP_SET_WALLET_TOKENS: {
      return {
        ...state,
        wallet: {
          ...state.wallet,
          tokens: payload,
        },
      };
    }
    case actionTypes.DAPP_SET_TRANSACTION_ITEMS: {
      return {
        ...state,
        wallet: {
          ...state.wallet,
          transactions: {
            ...state.wallet.transactions,
            items: payload,
          },
        },
      };
    }
    case actionTypes.DAPP_SET_TRANSACTIONS_STATUS: {
      return {
        ...state,
        wallet: {
          ...state.wallet,
          transactions: {
            ...state.wallet.transactions,
            status: payload,
          },
        },
      };
    }
    case actionTypes.DAPP_SORT_TRANSACTIONS: {
      let sortedItems = [...state.wallet.transactions.items];
      switch (payload) {
        case sortTypes.DATE_DESC:
          sortedItems = sortedItems.sort((a, b) => b.timestamp - a.timestamp);
          break;
        default:
          break;
      }

      return {
        ...state,
        wallet: {
          ...state.wallet,
          transactions: {
            ...state.wallet.transactions,
            items: sortedItems,
            sort: payload,
          },
        },
      };
    }
    case actionTypes.DAPP_SET_INVOICE:
      return {
        ...state,
        invoices: {
          ...state.invoices,
          ...payload,
        },
      };
    default:
      return state;
  }
}

export default reduce;
