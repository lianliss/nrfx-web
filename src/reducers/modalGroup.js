import * as actionTypes from '../actions/actionTypes';
import * as modalGroupRoutes from '../constants/modalGroupRoutes';

const initialState = {
  activeModal: null,
  statesInc: 0,
  modalGroupRoutes: {...modalGroupRoutes.MODALGROUP_ROUTES},
  states: {
    send: {
      selectedWallet: false,
      currency: 'btc',
      loadingStatus: '',
      wallets: [],
      amount: 0,
      amountUSD: 0,
      address: ''
    }
  }
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.MODALGROUP_SET_ACTIVE_MODAL: {
      return Object.assign({}, state, {
        activeModal: action.activeModal
      });
    }

    case actionTypes.MODALGROUP_ADD_CUSTOM_MODAL: {
      const modalGroupRoutes = {...state.modalGroupRoutes};
      if (!modalGroupRoutes.hasOwnProperty(action.routerName)) {
        modalGroupRoutes[action.routerName] = {};
      }
      modalGroupRoutes[action.routerName][action.name] = action.customModalPage;
      return Object.assign({}, state, {modalGroupRoutes});
    }

    case actionTypes.MODALGROUP_SET_STATE_BY_MODALPAGE: {
      let copy = {...state};
      switch (typeof action.value) {
        default:
        case 'string':
          copy.states[action.modalPageName][action.key] = action.value;
          break;
        case 'object':
          copy.states[action.modalPageName] = Object.assign({}, copy.states[action.modalPageName], action.value);
          break;
      }
      copy.statesInc = copy.statesInc + 1;
      return copy;
    }
    default: return state;
  }
}
