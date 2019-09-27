import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: {
    old_password: '',
    new_password: '',
    re_password: '',
  },
  loadingStatus: {}
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {

    case actionTypes.SETTINGS_SET_LOADING_STATUS: {
      return Object.assign({}, state, {
        loadingStatus: Object.assign({}, state.loadingStatus, { [action.section]: action.status })
      });
    }

    case actionTypes.SETTINGS_USER_FIELD_SET: {
      return Object.assign({}, state, {
        user: {
          ...state.user,
          [action.field]: action.value
        }
      });
    }

    case actionTypes.SETTINGS_SET: {
      return Object.assign({}, state, {
        user: {
          ...state.user,
          ...action.user
        }
      });
    }

    default:
      return state;
  }
}
