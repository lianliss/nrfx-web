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

    case actionTypes.APIKEY_SET: {
      const { apikey } = action;
      const items = state.user.dataApiKey
      const apiKeys = apikey.keys ? [...apikey.keys] : []
      const apiKey = apikey.key ? [apikey.key] : []
      const dataApiKeys = apiKey.length !== 0 && items ? [...items, ...apiKey ] : apiKeys
      return Object.assign({}, state, {
        user: {
          ...state.user,
          dataApiKeys
        }
      })
    }

    case actionTypes.SECRETKEY_SET: {
      const { secret_key, key_id } = action;
      const dataApiKeys = state.user.dataApiKey.map(item => item.id === key_id ? {...item, secret_key } : item)
      return  Object.assign({}, state, {
        user: {
          ...state.user,
          dataApiKeys
        }
      })
    }

    default:
      return state;
  }
}
