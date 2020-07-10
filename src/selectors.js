export const landingSelector = state => state.landing;
export const langListSelector = state => state.default.langList;
export const currentLangSelector = state => state.default.currentLang;
export const userSelector = state => state.default.profile.user;
export const profileSelector = state => state.default.profile;
export const adaptiveSelector = state => state.default.adaptive;
export const currencySelector = currency => state =>
  state.cabinet.currencies[currency];
export const marketCurrencySelector = currency => state =>
  state.exchange &&
  Object.values(state.exchange.marketConfig).find(c => c.name === currency);
export const currenciesSelector = state =>
  Object.values(state.cabinet.currencies);
export const fiatSelector = state => state.fiat;
