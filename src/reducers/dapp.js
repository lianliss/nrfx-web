import * as actionTypes from "../actions/actionTypes";

const initialState = {
  swap: {
    from: 'NRFX',
    to: 'USDT',
  }
}

function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.DAPP_SET_SWAP:
      return {
        ...state,
        swap: {
          from: action.payload.from || state.swap.from,
          to: action.payload.to || state.swap.to
        }
      };
    default:
      return state;
  }
}

export default reduce;