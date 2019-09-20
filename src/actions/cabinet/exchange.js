import * as actionTypes from '../actionTypes';
import * as api from '../../services/api';
import apiSchema from '../../services/apiSchema';

export function load() {
  return (dispatch) => {
    dispatch({ type: actionTypes.EXCHANGE_SET_LOADING_STATUS, section: 'default', status: 'loading' });
    api.call(apiSchema.Exchange.DefaultGet, {
      market: 'btc/usdt',
    }).then((resp) => {
      dispatch({
        type: actionTypes.EXCHANGE_SET,
        ...resp
      });
      dispatch({ type: actionTypes.EXCHANGE_SET_LOADING_STATUS, section: 'default', status: '' });
    }).catch(() => {
      dispatch({ type: actionTypes.EXCHANGE_SET_LOADING_STATUS, section: 'default', status: 'failed' });
    })
  };
}
