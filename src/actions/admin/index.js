// external
// internal
import apiSchema from '../../services/apiSchema';
import router from '../../router';
import * as actionTypes from '../actionTypes';
import * as api from '../../services/api';
import store from '../../store';
import * as toast from '../toasts';
import * as pages from '../../index/constants/pages';
import * as adminPages from '../../admin/constants/pages';

export function init() {
  return api.call(apiSchema.Admin.DefaultGet).then((resp) => {
    store.dispatch({type: actionTypes.ADMIN_INIT, data: resp});
  }).catch((err) => {
    //
  })
}

export function closeModal(modalName) {
  store.dispatch({type: 'close_modal', params: { id: modalName } });
}

export function valueChange(key, value) {
  store.dispatch({type: actionTypes.ADMIN_VALUE_CHANGE, key,  value });
}

export default function action(action) {
  if (!action) {
    toast.error('Action not set');
    return false;
  }

  const {type, params, values} = action;

  const state = store.getState();

  values && Object.keys(values).map(key => {
    values[key] = state.admin.values[values[key]];
  });

  store.dispatch({type: 'pending', params: true});

  return api.call(apiSchema.Admin.ActionPost, {
    action: type,
    params: JSON.stringify(params),
    values: JSON.stringify(values || {})
  }).then((actions) => {
    actions.map(action => {
      switch(action.type) {
        case 'show_toast':
          toast[action.params.type](action.params.message);
          break;
        case 'show_page':
          router.navigate(adminPages.PANEL, { page: action.params.page});
          break;
      }
      store.dispatch({type: action.type, params: action.params});
    });
  }).catch(err => {
    toast.error(err.code + ': ' + err.message);
  }).finally(() => {
    store.dispatch({type: 'pending', params: false});
  })
}
