import * as actionTypes from '../actions/actionTypes';

const initialState = {
  deposits: [],
  payments: [],
  loadingStatus: {}
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {

    case actionTypes.INVESTMENTS_SET_LOADING_STATUS: {
      return Object.assign({}, state, {
        loadingStatus: Object.assign({}, state.loadingStatus, { [action.section]: action.status })
      });
    }

    case actionTypes.INVESTMENTS_SET: {
      return Object.assign({}, state, {
        deposits: action.deposits,
        payments: action.payments
      });
    }

    default:
      return state;
  }
}
