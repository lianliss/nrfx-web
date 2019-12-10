import * as actionTypes from '../actionTypes';
import * as api from '../../services/api';
import apiSchema from '../../services/apiSchema';
import * as toastsActions from '../toasts';

export function loadBots() {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.TRADER_SET_LOADING_STATUS, section: 'default', status: 'loading' });
    api.call(apiSchema.Bots.DefaultGet).then(bots => {
      dispatch({ type: actionTypes.TRADER_SET_LOADING_STATUS, section: 'default', status: '' });
      dispatch({ type: actionTypes.TRADER_INIT, bots });
    }).catch((err) => {
      dispatch({ type: actionTypes.TRADER_SET_LOADING_STATUS, section: 'default', status: 'failed' });
    })
  };
}

export function loadBot(id) {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.TRADER_SET_LOADING_STATUS, section: 'bot', status: 'loading' });
    api.call(apiSchema.Bots.BotGet, { bot_id: id }).then(bot => {
      dispatch({ type: actionTypes.TRADER_BOT_INIT, bot });
      dispatch({ type: actionTypes.TRADER_SET_LOADING_STATUS, section: 'bot', status: '' });
    }).catch((err) => {
      dispatch({ type: actionTypes.TRADER_SET_LOADING_STATUS, section: 'bot', status: 'failed' });
    })
  };
}
export function setStatusBot(id, status) {
  return (dispatch, getState) => {
    api.call(apiSchema.Bots.BotStatusPost, { bot_id: id, status }).then(bot => {
      dispatch({ type: actionTypes.TRADER_BOT_UPDATE, bot });
    }).catch((err) => {
      alert("ERROR");
    })
  };
}



export function createBot(name) {
  return (dispatch, getState) => {
    api.call(apiSchema.Bots.DefaultPut, { name }).then(res => {

    });
  };
}
