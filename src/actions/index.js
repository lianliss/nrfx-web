// styles
// external
// internal
import store from '../store';
import router from '../router';
import apiSchema from '../services/apiSchema';
import * as actionTypes from './actionTypes';
import * as api from '../services/api';
import * as utils from '../utils';
import * as emitter from '../services/emitter';
import { getLang } from '../services/lang';

export function loadLang(code) {
  return new Promise((resolve, reject) => {
    api.call(apiSchema.LangGet, { code }, {
      apiEntry: 'https://api.narfex.com',
    }).then(({ translations, languages }) => {
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

export function getCurrentLang() {
  const { langList } = store.getState().default;
  return langList.find(l => l.value === getLang()) || langList.find(l => l.value === 'en');
}

export function getStaticPageContent(address) {
  return api.call(apiSchema.Page.DefaultGet, {address});
}

export function loadCurrencies() {
  return new Promise((resolve, reject) => {
    api.call(apiSchema.Wallet.CurrenciesGet).then((currencies) => {
      store.dispatch({ type: actionTypes.SET_CURRENCIES, currencies });
      resolve();
    }).catch(() => reject());
  });
}

export function getCurrencyInfo(name) {
  if (!name) return {};

  const state = store.getState().cabinet;
  name = name.toLowerCase();
  let currency = state.currencies[name];
  if (!currency) return { abbr: name };
  return {
    ...currency,
    background: `linear-gradient(45deg, ${currency.gradient[0]} 0%, ${currency.gradient[1]} 100%)`
  }
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
