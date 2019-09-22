// styles
// external
import {memo} from 'react';
import {connect} from 'react-redux';
// internal
import * as CLASSES from './constants/classes';
import * as walletsActions from './actions/cabinet/wallets';
import * as actions from './actions/';
import * as modalGroupActions from './actions/modalGroup';
import * as investmentsActions from './actions/cabinet/investments';
import * as settingsActions from './actions/cabinet/settings';
import * as profileActions from './actions/cabinet/profile';
import * as notificationsActions from './actions/cabinet/notifications';
import * as toastsActions from './actions/cabinet/toasts';

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
      mapState2Props = (state) => ({
        profile: state.default.profile,
        notifications: state.notifications,
        router: state.router
      });
      mapDispatch2Props = {
        loadNotifications: notificationsActions.loadNotifications
      };
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
    case CLASSES.WITHDRAWAL_COINS_MODAL:
      mapState2Props = (state) => {
        return { ...state.wallets, ...state.investments}
      };
      mapDispatch2Props = {
        toastPush: toastsActions.toastPush,
        loadWallets: walletsActions.loadWallets,
        loadInvestments: investmentsActions.loadInvestments,
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
        loadMoreProfitHistory: investmentsActions.loadMoreProfitHistory,
      };
      break;
    case CLASSES.CABINET_SETTINGS_SCREEN:
      mapState2Props = (state) => ({ ...state.settings });
      mapDispatch2Props = {
        loadSettings: settingsActions.loadSettings,
        setUserFieldValue: settingsActions.setUserFieldValue,
        toastPush: toastsActions.toastPush
      };
      break;
    case CLASSES.SEND_COINS_MODAL:
      mapState2Props = (state) => ({
        thisState: state.modalGroup.states.send,
        wallets: state.wallets.wallets
      });
      mapDispatch2Props = {
        setStateByModalPage: modalGroupActions.setStateByModalPage,
        toastPush: toastsActions.toastPush
      };
      break;
    case CLASSES.OPEN_DEPOSIT_MODAL:
      mapState2Props = (state) => ({ router: state.router });
      mapDispatch2Props = {
        modalGroupSetActiveModal: modalGroupActions.modalGroupSetActiveModal,
        toastPush: toastsActions.toastPush
      };
      break;
    case CLASSES.CONFIRM_SMS_MODAL:
      mapDispatch2Props = {
        setUserFieldValue: settingsActions.setUserFieldValue,
        toastPush: toastsActions.toastPush
      };
      break;
    case CLASSES.CHANGE_EMAIL_MODAL:
      mapDispatch2Props = {
        toastPush: toastsActions.toastPush
      };
      break;
    case CLASSES.COMPONENT_TOASTS:
      mapState2Props = (state) => ({
        toasts: state.toasts,
      });
      mapDispatch2Props = {
        toastDrop: toastsActions.toastDrop
      };
      break;
    case CLASSES.COMPONENT_FOOTER:
      mapState2Props = (state) => ({
        langList: state.default.langList,
      });
      break;
    case CLASSES.CABINET_REGISTER:
      mapDispatch2Props = {
        toastPush: toastsActions.toastPush
      };
      break;
    case CLASSES.CABINET_RESET_PASSWORD:
      mapDispatch2Props = {
        toastPush: toastsActions.toastPush
      };
      break;
    default:
      mapState2Props = (state) => ({ ...state });
      mapDispatch2Props = {};
      break;
  }
  return connect(mapState2Props, mapDispatch2Props)(memo(caseClass));
}