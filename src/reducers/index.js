import * as actionTypes from '../actions/actionTypes';

const initialState = {
  page: null,
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.NAVIGATE:
      return Object.assign({}, state, {page: action.to.name});
    default:
      return state;
  }
}
