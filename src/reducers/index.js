import * as actionTypes from '../actions/actionTypes';
import initGetParams from '../services/initialGetParams';

const initialState = {
  page: null,
  translations: {},
  auth: {},
  profile: {},
  currentLang: null,
  langList: [],
  adaptive: false,
  title: "Bitcoinbot",
  static: {
    status: 'loading'
  },
  modals: [],
  registration: {
    email: '',
    referrer: '',
    refParam: initGetParams.params.hasOwnProperty('ref') ? initGetParams.params.ref : null
  }
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.NAVIGATE:
      return Object.assign({}, state, {page: action.to.name});

    case actionTypes.SET_LANG: {
      return {
        ...state,
        translations: {
          ...state.translations,
          [action.currentLang]: action.translations
        },
        langList: action.languages
      };
    }

    case actionTypes.SET_CURRENT_LANG: {
      return {
        ...state,
        currentLang: action.currentLang,
      };
    }

    case actionTypes.AUTH: {
      return Object.assign({}, state, {auth: action.auth});
    }

    case actionTypes.PROFILE: {
      return Object.assign({}, state, {profile: action.props});
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

    case actionTypes.SET_USER_NAME: {
      const { first_name, last_name } = action;
      return {
        ...state,
        profile: {
          ...state.profile,
          user: {
            ...state.profile.user,
            first_name,
            last_name
          }
        }
      }
    }

    case actionTypes.REGISTRATION_SET_VALUE: {
      return {
        ...state,
        registration: {
          ...state.registration,
          [action.property]: action.value
        }
      }
    }

    case actionTypes.SAVE_TRANSLATOR: {
      return {
        ...state,
        translations: {
          ...state.translations,
          [action.code]: {
            ...state.translations[action.code],
            [action.key]: action.value
          }
        }
      }
    }

    default: return state;
  }
}
