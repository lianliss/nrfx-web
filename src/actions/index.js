/* eslint-disable */

import * as actionTypes from './actionTypes';
import { TranslationApi } from '../swagger';
import callApi from '../services/api';
import store from '../store';

export function loadLang() {
  return new Promise((resolve, reject) => {
    callApi(new TranslationApi().translationExportGet, 'ru').then((lang) => {
      store.dispatch({type: actionTypes.SET_LANG, lang});
      resolve();
    }).catch((err) => reject(err));
  });
}
