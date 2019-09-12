import {memo} from 'react';
import {connect} from 'react-redux';
import * as CLASSES from './constants/classes';
import * as walletsActions from './actions/cabinet/wallets';
import * as actions from './actions/';
import * as modalGroupActions from "./actions/modalGroup";
import * as investmentsActions from "./actions/cabinet/investments";
import * as settingsActions from "./actions/cabinet/settings";
import * as profileActions from "./actions/cabinet/profile";

export function getWithState(caseName, caseClass) {
  let mapState2Props = state => ({...state}),
    mapDispatch2Props = {};

  switch (caseName) {
    case CLASSES.COMPONENT_CABINET_WRAPPER:
      mapState2Props = (state) => ({ ...state.default });
      mapDispatch2Props = {
        setAdaptive: actions.setAdaptive
      };
      break;
    case CLASSES.CABINET_MENU_SCREEN:
      mapState2Props = (state) => ({
        adaptive: state.default.adaptive
      });
      break;
    case CLASSES.COMPONENT_CABINET_HEADER:
      mapState2Props = (state) => ({ ...state.default.profile });
      mapDispatch2Props = {};
      break;
    case CLASSES.COMPONENT_PROFILE_SIDEBAR:
      mapState2Props = (state) => ({ ...state.default.profile });
      mapDispatch2Props = {};
      break;
    case CLASSES.COMPONENT_MODALGROUP:
      mapState2Props = (state) => ({ ...state.modalGroup });
      mapDispatch2Props = {
        modalGroupSetActiveModal: modalGroupActions.modalGroupSetActiveModal
      };
      break;
    case CLASSES.CABINET_PFOFILE_SCREEN:
      mapState2Props = (state) => {
        return { ...state.wallets, ...state.profile }
      };
      mapDispatch2Props = {
        loadWallets: walletsActions.loadWallets,
        loadDashboard: profileActions.loadDashboard
      };
      break;
    case CLASSES.CABINET_START_PFOFILE_SCREEN:
      mapState2Props = (state) => ({ ...state.wallets });
      mapDispatch2Props = {
        loadWallets: walletsActions.loadWallets
      };
      break;
    case CLASSES.CABINET_WALLET_SCREEN:
      mapState2Props = (state) => ({ ...state.wallets });
      mapDispatch2Props = {
        loadWallets: walletsActions.loadWallets,
        loadMoreTransactions: walletsActions.loadMoreTransactions,
        loadMoreTransfers: walletsActions.loadMoreTransfers,
      };
      break;
    case CLASSES.CABINET_INVESTMENTS_SCREEN:
      mapState2Props = (state) => {
        return {...state.investments}
      };

      mapDispatch2Props = {
        loadInvestments: investmentsActions.loadInvestments,
        loadProfitHistory: investmentsActions.loadProfitHistory,
        loadWithdrawalHistory: investmentsActions.loadWithdrawalHistory,
        loadMoreWithdrawalHistory: investmentsActions.loadMoreWithdrawalHistory,
      };
      break;
    case CLASSES.CABINET_SETTINGS_SCREEN:
      mapState2Props = (state) => ({ ...state.settings });
      mapDispatch2Props = {
        loadSettings: settingsActions.loadSettings,
        setUserFieldValue: settingsActions.setUserFieldValue
      };
      break;
    case CLASSES.SEND_COINS_MODAL:
      mapState2Props = (state) => ({ thisState: {...state.modalGroup.states.send} });
      mapDispatch2Props = {
        setStateByModalPage: modalGroupActions.setStateByModalPage
      };
      break;
    default:
      mapState2Props = (state) => ({ ...state });
      mapDispatch2Props = {};
      break;
  }
  return connect(mapState2Props, mapDispatch2Props)(memo(caseClass));
}