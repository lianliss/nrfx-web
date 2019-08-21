import * as modalGroupConstant from "../constants/modalGroup";
import router from "../router";
import * as modalGroupActions from "./modalGroup";

export function closeHandler(modalPageName) {
  switch (modalPageName) {
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
    default:break;
  }
}