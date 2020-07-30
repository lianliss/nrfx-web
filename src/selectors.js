export const landingSelector = state => state.landing;
export const langListSelector = state => state.default.langList;
export const currentLangSelector = state => state.default.currentLang;
export const langSelector = (lang, key) => state =>
  state.default.translations[lang][key];
export const userSelector = state => state.default.profile.user;
export const profileSelector = state => state.default.profile;
export const adminPendingSelector = state => state.admin.pending;
export const adaptiveSelector = state => state.default.adaptive;
export const walletStatusSelector = state => state.wallet.status;
export const walletSwapSelector = state => state.wallet.swap;
export const walletSelector = state => state.wallet;
export const walletCardReservationSelector = state =>
  state.wallet.cardReservation;
export const walletHistoryNextSelector = state => state.wallet.history.next;
export const walletBalancesSelector = state => state.wallet.balances;
export const walletWalletsSelector = state => state.wallet.wallets;
export const walletAllBalancesSelector = state => [
  ...state.wallet.wallets,
  ...state.wallet.balances
];
export const walletBalanceSelector = currency => state =>
  [...state.wallet.wallets, ...state.wallet.balances].find(
    w => w.currency === currency
  );
export const currencySelector = currency => state =>
  state.cabinet.currencies[currency?.toLowerCase()];
export const marketCurrencySelector = currency => state =>
  state.exchange &&
  Object.values(state.exchange.marketConfig).find(
    c => c.name === currency?.toLowerCase()
  );
export const currenciesSelector = state =>
  Object.values(state.cabinet.currencies);
export const fiatSelector = state => state.fiat;
