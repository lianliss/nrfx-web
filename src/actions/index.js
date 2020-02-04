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
import * as storage from '../services/storage';
import * as toast from './toasts';

export function loadLang(code, toggleCurrentLang = true) {
  return new Promise((resolve, reject) => {
    const state = store.getState();
    if ( state.default.translations[code]) {
      toggleCurrentLang && store.dispatch({
        type: actionTypes.SET_CURRENT_LANG,
        currentLang: code,
      });
      return resolve();
    }
    api.call(apiSchema.LangGet, { code }, {
      apiEntry: 'https://api.narfex.com' // TODO
    }).then(({ translations, languages }) => {
      languages = languages.map(lang => ({ value: lang[0], title: lang[1] }));
      store.dispatch({
        type: actionTypes.SET_LANG,
        translations: translations,
        currentLang: code,
        languages,
      });
      toggleCurrentLang && store.dispatch({
        type: actionTypes.SET_CURRENT_LANG,
        currentLang: code,
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
  return api.call(apiSchema.Page.DefaultGet, { address });
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
    name: utils.ucfirst(currency.name), // HACK, TODO: Форматировать имена валют на бэке
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

export function gaCode() {
  return new Promise((resolve, reject) => {
    openModal('ga_code');
    const acceptListener = emitter.addListener('ga_submit', ({code}) => {
      emitter.removeListener(acceptListener);
      resolve(code);
    });

    const closeListener = emitter.addListener('ga_cancel', () => {
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

export function toggleTranslator(value) {
  return dispatch => {
    storage.setItem('translatorMode', value);
    return dispatch({type: actionTypes.TRANSLATOR_TOGGLE, value});
  }
};

export function translatorSetLangCode(code) {
  return dispatch => {
    storage.setItem('translatorLangCode', code);
    dispatch({type: actionTypes.TRANSLATOR_SET_LANG_CODE, code});
  }
};

export function saveTranslator(code, key, value) {
  return api.call(apiSchema.LangPost, { code, key, value })
    .then(resolve => {
      store.dispatch({type: actionTypes.SAVE_TRANSLATOR, code, key, value});
      toast.success(utils.getLang('cabinet_translationSuccess'));
    }).catch((e) => {
      toast.error(utils.getLang('cabinet_translationFail'));
      throw e;
    });
}

export function registrationSetValue(property, value) {
  return (dispatch) => {
    dispatch({type: actionTypes.REGISTRATION_SET_VALUE, property, value});
  }
}
