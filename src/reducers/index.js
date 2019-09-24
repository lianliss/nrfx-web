import * as actionTypes from '../actions/actionTypes';

const initialState = {
  page: null,
  lang: {},
  auth: {},
  profile: {},
  adaptive: false,
  title: "Bitcoinbot",
  modals: []
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

    case actionTypes.PROFILE: {
      return Object.assign({}, state, {profile: action.props});
    }

    case actionTypes.STATIC: {
      return Object.assign({}, state, { [action.payload.url]: { data: action.payload.data, lang: action.payload.lang } });
    }

    case actionTypes.PUSH_MODAL: {
      let modals = Object.assign([], state.modals);
      modals.push(action.modal);
      return Object.assign({}, state, { modals });
    }

    case actionTypes.POP_MODAL: {
      let modals = Object.assign([], state.modals);
      modals.pop();
      return Object.assign({}, state, { modals });
    }

    case actionTypes.LOGOUT: {
      return { ...state, profile: {} };
    }

    case actionTypes.SET_ADAPTIVE: {
      return {
        ...state,
        adaptive: action.adaptive
      }
    }

    case actionTypes.SET_TITLE: {
      return {
        ...state,
        title: action.title
      }
    }

    default: return state;
  }
}
