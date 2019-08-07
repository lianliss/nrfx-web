import * as actionTypes from './actionTypes';
import store from '../store';
import router from "../router";
import * as modalGroupConstant from '../constants/modalGroup';

export function modalGroupSetActiveModal(name) {
  return store.dispatch({
    type: actionTypes.MODALGROUP_SET_ACTIVE_MODAL,
    activeModal: name
  });
}

export function openModalPage(name, sendParams = {}) {
  let routerParams = {...router.getState().params} || {};

  routerParams.modal_group = (
    routerParams.modal_group ? routerParams.modal_group + modalGroupConstant.MODALGROUP_SEPARATOR : ''
  ) + name;

  const routerSendParams = {...routerParams, ...sendParams};

  if (Object.keys(sendParams).length > 0) {
    routerSendParams.rp = Object.keys({...sendParams}).join(modalGroupConstant.MODALGROUP_SEPARATOR);
  }

  router.navigate(router.getState().name, routerSendParams, () => {
    modalGroupSetActiveModal(name);
  });
}

export function modalGroupClear() {
  const params = {...router.getState().params};
  delete params[modalGroupConstant.MODALGROUP_GET_PARAM];
  if ('rp' in params) {
    const rp = params.rp.split(modalGroupConstant.MODALGROUP_SEPARATOR);
    rp.push('rp');
    rp.forEach(param => {
      if (param in params) {
        delete params[param];
      }
    });
  }
  router.navigate(router.getState().name, params, () => {
    modalGroupSetActiveModal(null);
  });
}