import * as actionTypes from '../actions/actionTypes';

const initialState = {
  wallet: {
    tokens: [],
    transactions: {
      items: [],
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
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
    case actionTypes.DAPP_SET_SWAP:
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
    case actionTypes.DAPP_SET_WITHDRAW:
      return {
        ...state,
        withdraw: {
          ...state.withdraw,
          ...payload,
        },
      };
    case actionTypes.DAPP_SET_WALLET_TOKENS:
      return {
        ...state,
        wallet: {
          ...state.wallet,
          tokens: payload,
        },
      };
    case actionTypes.DAPP_SET_TRANSACTIONS:
      return {
        ...state,
        wallet: {
          ...state.wallet,
          transactions: {
            ...state.wallet.transactions,
            items: payload.items,
            status: payload.status,
          },
        },
      };
    default:
      return state;
  }
}

export default reduce;
