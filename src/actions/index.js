/* eslint-disable */

import * as actionTypes from './actionTypes';
import { TranslationApi } from '../swagger';
import callApi from '../services/api';
import store from '../store';

export function loadLang(lang) {
  return new Promise((resolve, reject) => {
    callApi(new TranslationApi().translationExportGet, lang).then(({ translations, languages }) => {
      store.dispatch({type: actionTypes.SET_LANG, lang: translations});
      resolve();
    }).catch((err) => reject(err));
  });
}
