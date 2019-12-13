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
      const items = state.user.dataApiKeys
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
      const dataApiKeys = state.user.dataApiKeys.map(item => item.id === key_id ? {...item, secret_key } : item)
      return  Object.assign({}, state, {
        user: {
          ...state.user,
          dataApiKeys
        }
      })
    }
    
    case actionTypes.SETTINGS_CHECK_TRADING: {
      const { id, permission_trading } = action;
      const dataApiKeys = state.user.dataApiKeys.map(item => item.id === id ? {...item, permission_trading: !permission_trading, save_item:true } : item)

      return  Object.assign({}, state, {
        user: {
          ...state.user,
          dataApiKeys
        }
      })
    }

    case actionTypes.SETTINGS_CHECK_WITHDRAW: {
      const { id, permission_withdraw } = action;
      const dataApiKeys = state.user.dataApiKeys.map(item => item.id === id ? {...item, permission_withdraw: !permission_withdraw, save_item:true } : item)

      return  Object.assign({}, state, {
        user: {
          ...state.user,
          dataApiKeys
        }
      })
    }

    case actionTypes.SETTINGS_IP_ACCESS: {
      const { key_id, radio } = action;
      const dataApiKeys = state.user.dataApiKeys.map(item => item.id === key_id && radio === 'second'  ? 
        {...item, radioCheck: radio, addIpAdress: true , save_item:true } : {...item, radioCheck: null, addIpAdress: false, save_item:false})

      return  Object.assign({}, state, {
        user: {
          ...state.user,
          dataApiKeys
        }
      })
    }

    case actionTypes.SETTINGS_IP_ADRESS_FIELD_SET: {
      const { key_id } = action;
      const dataApiKeys = state.user.dataApiKeys.map(item => item.id === key_id ? {...item, allow_ips: action.value } : item)
      return Object.assign({}, state, {
        user: {
          ...state.user,
          dataApiKeys
        }
      });
    }

    default:
      return state;
  }
}
