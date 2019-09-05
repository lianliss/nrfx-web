import * as actionTypes from './actionTypes';
import { TranslationApi, StaticPagesApi } from '../swagger';
import * as api from '../services/api';
import store from '../store';
import router from '../router';
import * as utils from '../utils';
import schemaAPI from '../services/schema_out';

export function loadLang(code) {
  return new Promise((resolve, reject) => {
    api.call(schemaAPI.lang, {code}).then(({ translations, languages }) => {
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

export function getStaticPageContent(address) {
  return new Promise((resolve, reject) => {
    api.call(schemaAPI['page/'], {address}).then((data) => {
      console.log(data);
      store.dispatch({ type: actionTypes.STATIC, payload: { address, data } })
      resolve(data);
    }).catch((err) => {
      reject(err)
    });
  });
}

export function loadCurrencies() {
  return new Promise((resolve, reject) => {
    api.call(schemaAPI["wallet/currencies"]).then((currencies) => {
      store.dispatch({ type: actionTypes.SET_CURRENCIES, currencies });
      resolve();
    }).catch(() => reject());
  });
}

const CryptoIcons = {
  btc: require('../asset/cabinet/crypto/bitcoin.svg'),
  eth: require('../asset/cabinet/crypto/ethereum.svg'),
  ltc: require('../asset/cabinet/crypto/litecoin.svg'),
  other: require('../asset/cabinet/crypto/other.svg')
};

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
  } else {
    result.icon = CryptoIcons[name];
  }
  return result;
}

export function openModal(name, params = {}) {
  router.navigate(
    router.getState().name,
    utils.makeModalParams(name, params));
}