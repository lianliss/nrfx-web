// styles
// external
// internal
import store from '../store';
import router from '../router';
import apiSchema from '../services/apiSchema';
import * as actionTypes from './actionTypes';
import * as api from '../services/api';
import * as utils from '../utils';
import { getColorByCurrency } from '../utils/currencies';
import * as emitter from '../services/emitter';

export function loadLang(code) {
  return new Promise((resolve, reject) => {
    api.call(apiSchema.LangGet, {code}).then(({ translations, languages }) => {
      const langList = languages.map(lang => ({ value: lang[0], title: lang[1] }));
      store.dispatch({
        type: actionTypes.SET_LANG,
        lang: translations,
        langList,
      });
      resolve();
    }).catch((err) => reject(err));
  });
}

export function getStaticPageContent(address,) {
  return new Promise((resolve, reject) => {
    api.call(apiSchema.Page.DefaultGet, {address}).then(data => {
      store.dispatch({ type: actionTypes.STATIC, payload: { address, data } })
      resolve(data);
    }).catch((err) => {
      reject(err)
    });
  });
}

export function loadCurrencies() {
  return new Promise((resolve, reject) => {
    api.call(apiSchema.Wallet.CurrenciesGet).then((currencies) => {
      Object.values(currencies).forEach(value => {
        currencies[value.abbr].color = getColorByCurrency(value.abbr); // HACK
      });
      // TODO: Цвет тоже должен приходить с сервера
      store.dispatch({ type: actionTypes.SET_CURRENCIES, currencies });
      resolve();
    }).catch(() => reject());
  });
}

export function getCurrencyInfo(name) {
  const state = store.getState().cabinet;
  name = name.toLowerCase();

  let result = state.currencies[name];
  if (!result) {
    result = {
      name: 'Unknown',
      icon: null,
      abbr: name
    };
  }
  return result;
}

export function openModal(name, params = {}, props = {}) {
  router.navigate(
    router.getState().name,
    utils.makeModalParams(name, params),
    props
  );
}

export function confirm(props) {
  return new Promise((resolve, reject) => {
    openModal('confirm', {}, props);
    const acceptListener = emitter.addListener('confirm_accept', () => {
      emitter.removeListener(acceptListener);
      resolve();
    });

    const closeListener = emitter.addListener('confirm_cancel', () => {
      emitter.removeListener(closeListener);
      reject();
    });
  })
}

export function setAdaptive(adaptive) {
  return store.dispatch({ type: actionTypes.SET_ADAPTIVE, adaptive });
}

export function setTitle(title) {
  return store.dispatch({ type: actionTypes.SET_TITLE, title });
}

export function sendInviteLinkView(link) {
  api.call(apiSchema.Partner.InviteLinkViewPost, {
    link
  });
}
