import store from '../../store';
import currenciesObject from 'src/currencies';
import { walletSwapSetCurrency } from './wallet';

export const setBuyCurrencyWallet = (currency, swapCurrencies) => {
  const currencyObj = currenciesObject[currency];
  const { dispatch } = store;

  if (currencyObj && currencyObj.can_exchange) {
    // Set Currency crypto in "Swap Form" for buy this.
    let fiat = '';

    for (let key in swapCurrencies) {
      const swapCurrency = currenciesObject[swapCurrencies[key]];
      // Search fiat from swapCurrencies
      if (swapCurrency.type === 'fiat') {
        fiat = swapCurrency.abbr;
        break;
      } else {
        continue;
      }
    }

    // Set new Currencies for crypto buy
    dispatch(walletSwapSetCurrency('to', currency));
    dispatch(walletSwapSetCurrency('from', fiat));
  }
};
