import * as storage from './storage';
import moment from 'moment/min/moment-with-locales';
import {loadLang} from '../actions'

export function setLang(lang, callback) {
  if (lang) {
    storage.setItem("lang", lang);
    moment.locale(lang);
    loadLang(lang).then(e => {
      if (callback) callback();
    });
  }
}

export function getLang() {
  return storage.getItem("lang") || (navigator.language || navigator.userLanguage).split("-")[0];
}