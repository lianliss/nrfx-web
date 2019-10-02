// styles
// external
// internal
import router from '../router';
import * as modalGroupConstant from '../constants/modalGroup';
import * as modalGroupActions from './modalGroup';

export function closeHandler(modalPageName) {
  switch (modalPageName) {
    case 'open_deposit':
      if (!router.getState().params.hasOwnProperty(modalGroupConstant.MODALGROUP_GET_PARAM)) {
        modalGroupActions.setStateByModalPage('open_deposit', {
          walletCurrentOption: {},
          walletOptions: [],
          selectDepositType: 'static',
          planOptions: [],
          planCurrentOption: {},
          amountMax: 0,
          amountMin: 0,
          currency: 'btc',
          touched: false,
          amount: undefined,
        });
      }
      break;
    case 'send':
      if (!router.getState().params.hasOwnProperty(modalGroupConstant.MODALGROUP_GET_PARAM)) {
        modalGroupActions.setStateByModalPage('send', {
          selectedWallet: false,
          currency: 'btc',
          loadingStatus: '',
          wallets: [],
          amount: 0,
          amountUSD: 0,
          address: ''
        });
      }
      break;
    default:
      break;
  }
}