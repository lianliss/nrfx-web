export const landingSelector = state => state.landing;
export const langListSelector = state => state.default.langList;
export const currentLangSelector = state => state.default.currentLang;
export const userSelector = state => state.default.profile.user;
export const adaptiveSelector = state => state.default.adaptive;
export const currencySelector = currency => state =>
  state.cabinet.currencies[currency];
export const currenciesSelector = state =>
  Object.values(state.cabinet.currencies);
