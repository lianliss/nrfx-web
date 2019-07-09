import * as actionTypes from '../actions/actionTypes';

const initialState = {
  page: null,
  lang: {},
  auth: {},
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.NAVIGATE:
      return Object.assign({}, state, {page: action.to.name});

    case actionTypes.SET_LANG: {
      return Object.assign({}, state, {lang: action.lang, langList: action.langList});
    }

    case actionTypes.AUTH: {
      return Object.assign({}, state, {auth: action.auth});
    }

    default:
      return state;
  }
}
