import * as actionTypes from '../actions/actionTypes';

const initialState = {
  swap: {
    from: { symbol: 'AVA' },
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
    default:
      return state;
  }
}

export default reduce;
