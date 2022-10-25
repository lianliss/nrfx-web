import * as actionTypes from '../actions/actionTypes';

const initialState = {
  wallet: {
    tokens: [],
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
        }
      };
    case actionTypes.DAPP_SET_INVOICE:
      return {
        ...state,
        invoices: {
          ...state.invoices,
          ...payload,
        }
      };
    default:
      return state;
  }
}

export default reduce;
