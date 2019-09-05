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

export function modalGroupAddCustomModal(name, routerName, customModalPage, sendParams) {
  store.dispatch({type: actionTypes.MODALGROUP_ADD_CUSTOM_MODAL, name, routerName, customModalPage});
  openModalPage(name, sendParams, customModalPage);
}

export function setStateByModalPage(modalPageName, value, key) {
  return store.dispatch({type: actionTypes.MODALGROUP_SET_STATE_BY_MODALPAGE, modalPageName, value, key});
}

function existModalPage(name) {
  const modalGroupRoutes = store.getState().modalGroup.modalGroupRoutes;
  if (modalGroupRoutes.hasOwnProperty(router.getState().name)) {
    return modalGroupRoutes[router.getState().name].hasOwnProperty(name);
  } else {
    return false;
  }
}

export function openModalPage(name, sendParams = {}, customModal = {}) {
  if (!existModalPage(name)) {
    if (Object.keys(customModal).length > 0) {
      return modalGroupAddCustomModal(name, router.getState().name, customModal, sendParams);
    } else {
      return false;
    }
  }

  let routerParams = {...router.getState().params} || {};

  routerParams.modal_group = (
    routerParams.modal_group ? routerParams.modal_group + modalGroupConstant.MODALGROUP_SEPARATOR : ''
  ) + name;

  const routerSendParams = {...routerParams, ...sendParams};

  if (Object.keys(sendParams).length > 0) {
    routerSendParams.rp = Object.keys({...sendParams}).join(modalGroupConstant.MODALGROUP_SEPARATOR);
  }

  router.navigate(router.getState().name, {...routerSendParams}, {}, () => {
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