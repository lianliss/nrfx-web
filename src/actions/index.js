/* eslint-disable */

import * as actionTypes from './actionTypes';
import { TranslationApi, StaticPagesApi } from '../swagger';
import callApi from '../services/api';
import store from '../store';

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
