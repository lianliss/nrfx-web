/* eslint-disable */

import * as actionTypes from './actionTypes';
import { TranslationApi, StaticPagesApi } from '../swagger';
import callApi from '../services/api';
import * as api from '../services/api';
import store from '../store';
import router from '../router';
import * as utils from '../utils';

export function loadLang(lang) {
  return new Promise((resolve, reject) => {
    callApi(new TranslationApi().translationExportGet, lang).then(({ translations, languages }) => {
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

export function getStaticPageContent(url, lang) {
  return new Promise((resolve, reject) => {
    callApi(new StaticPagesApi().pagesGetGet, url, lang).then((data) => {
      store.dispatch({ type: actionTypes.STATIC, payload: { url, lang, data } })
      resolve(data);
    }).catch((err) => reject(err));
  });
}

export function loadCurrencies() {
  return new Promise((resolve, reject) => {
    api.get('wallet/currencies').then((currencies) => {
      store.dispatch({ type: actionTypes.SET_CURRENCIES, currencies });
      resolve();
    }).catch(() => reject());
  });
}

export function getCurrencyInfo(name) {
  const state = store.getState().cabinet;
  return state.currencies[name.toLowerCase()] || {
    name: 'Unknown',
    icon: null
  };
}

export function openModal(name, params = {}) {
  router.navigate(router.getState().name, utils.makeModalParams(name, params));
}