import * as actionTypes from '../actions/actionTypes';
import { dataStatus, p2pMode, sortTypes } from '../index/constants/dapp/types';

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
  exchange: {
    from: {
      amount: 0,
      token: { symbol: 'USD' },
    },
    to: {
      amount: 0,
      token: { symbol: 'NRFX' },
    },
    focus: 'to',
  },
  p2p: {
    mode: p2pMode.buy,
    buy: {
      payment: null,
    },
    sell: {
      payment: null,
    },
    kyc: null,
    currency: null,
    available: {},
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
    case actionTypes.DAPP_SET_EXCHANGE_AMOUNT: {
      return {
        ...state,
        exchange: {
          ...state.exchange,
          [payload.focus]: {
            ...state.exchange[payload.focus],
            amount: payload.amount,
          },
        },
      };
    }
    case actionTypes.DAPP_SET_EXCHANGE_TOKEN: {
      return {
        ...state,
        exchange: {
          ...state.exchange,
          [payload.focus]: {
            ...state.exchange[payload.focus],
            token: payload.token,
          },
        },
      };
    }
    case actionTypes.DAPP_SET_EXCHANGE_FOCUS: {
      return {
        ...state,
        exchange: {
          ...state.exchange,
          focus: payload,
        },
      };
    }
    case actionTypes.DAPP_SET_P2P_MODE: {
      return {
        ...state,
        p2p: {
          ...state.p2p,
          mode: payload,
        },
      };
    }
    case actionTypes.DAPP_SET_P2P_PAYMENT: {
      const newState = { ...state };

      if (payload.mode === p2pMode.buy) {
        newState.p2p.buy.payment = payload.payment;
      }

      if (payload.mode === p2pMode.sell) {
        newState.p2p.sell.payment = payload.payment;
      }

      return newState;
    }
    case actionTypes.DAPP_UPDATE_P2P_KYC: {
      return {
        ...state,
        p2p: {
          ...state.p2p,
          kyc: payload,
        },
      };
    }
    case actionTypes.DAPP_SET_P2P_CURRENCY: {
      return {
        ...state,
        p2p: {
          ...state.p2p,
          currency: payload,
        },
      };
    }
    case actionTypes.DAPP_UPDATE_P2P_AVAILABLE_TRADE: {
      return {
        ...state,
        p2p: {
          ...state.p2p,
          available: {
            ...state.p2p.available,
            [payload.fiatAddress]: payload.available,
          },
        },
      };
    }
    default:
      return state;
  }
}

export default reduce;
