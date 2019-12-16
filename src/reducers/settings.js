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
      const dataApiKeys = apiKey.length !== 0 && items ? [...items, ...apiKey ] : 
        apiKeys.map(item => item.allow_ips !== '' ? {...item, addIpAddress: true, radioCheck: 'second', allow_ips: item.allow_ips.split(',')} : item)
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
      const { key_id, radio, allow_ips } = action;
      const dataApiKeys = state.user.dataApiKeys.map(item => {
        if( item.id === key_id ) {
          if(radio === 'first') {
            return {...item, radioCheck: radio, addIpAddress: false , save_item: false }
          }
          if (Array.isArray(item.allow_ips)) {
            return {...item, radioCheck: radio, addIpAddress: true , save_item: true }
          }
          return {...item, radioCheck: radio, allow_ips: allow_ips.split(','), addIpAddress: true , save_item: true }
        }
        return item
      })

      return  Object.assign({}, state, {
        user: {
          ...state.user,
          dataApiKeys
        }
      })
    }
    
    case actionTypes.SETTINGS_IP_ADDRESS_FIELD_SET: {
      const { key_id, id_ip } = action;
      const dataApiKeys = state.user.dataApiKeys.map(item => item.id === key_id ? 
        {...item, allow_ips: item.allow_ips.map((data_ip, i) => i === id_ip ? action.value : data_ip)} 
        : item)
      return Object.assign({}, state, {
        user: {
          ...state.user,
          dataApiKeys
        }
      });
    }

    case actionTypes.ADD_IP_ADDRESS: {
      const { key_id } = action;
      const dataApiKeys = state.user.dataApiKeys.map(item => item.id === key_id ? 
        {...item, allow_ips: item.allow_ips.concat(['']), save_item: true} 
        : item)
      return Object.assign({}, state, {
        user: {
          ...state.user,
          dataApiKeys
        }
      });
    }

    case actionTypes.DELETE_IP_ADDRESS: {
      const { key_id, id_ip } = action;
      const dataApiKeys = state.user.dataApiKeys.map(item => item.id === key_id ? 
        {...item, list_ips: item.list_ips.map((data_ip, i) => i === id_ip ? {data_ip: ''} : data_ip)} 
        : item)
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
