// styles
// external
import {memo} from 'react';
import {connect} from 'react-redux';
// internal
import * as CLASSES from './constants/classes';
import * as walletsActions from '../actions/cabinet/wallets';
import * as actions from '../actions';
import * as modalGroupActions from '../actions/modalGroup';
import * as investmentsActions from '../actions/cabinet/investments';
import * as settingsActions from '../actions/cabinet/settings';
import * as profileActions from '../actions/cabinet/profile';
import * as notificationsActions from '../actions/cabinet/notifications';
import * as internalNotifications from '../actions/cabinet/internalNotifications';
import * as toastsActions from '../actions/toasts';
import * as exchangeActions from '../actions/cabinet/exchange';

export function getWithState(caseName, caseClass) {
  let mapState2Props = state => ({...state}),
    mapDispatch2Props = {};

  switch (caseName) {
    case CLASSES.COMPONENT_CABINET_WRAPPER:
      mapState2Props = state => ({
        ...state.default,
        router: state.router,
        user: state.default.profile.user
      });
      mapDispatch2Props = {
        setAdaptive: actions.setAdaptive
      };
      break;
    case CLASSES.CABINET_MENU_SCREEN:
      mapState2Props = state => ({
        adaptive: state.default.adaptive,
        langList: state.default.langList
      });
      mapDispatch2Props = {
        setTitle: actions.setTitle
      };
      break;
    case CLASSES.CABINET_NOTIFICATIONS_SCREEN:
      mapState2Props = state => ({
        notifications: state.notifications,
      });
      mapDispatch2Props = {
        setTitle: actions.setTitle,
        loadNotifications: notificationsActions.loadNotifications
      };
      break;
    case CLASSES.COMPONENT_CABINET_HEADER:
      mapState2Props = state => ({
        internalNotifications: state.internalNotifications,
        profile: state.default.profile,
        notifications: state.notifications,
        router: state.router,
        langList: state.default.langList,
        title: state.default.title,
      });
      mapDispatch2Props = {
        dropInternalNotifications: internalNotifications.drop,
        loadNotifications: notificationsActions.loadNotifications,
        notificationAction: notificationsActions.submitAction,
      };
      break;
    case CLASSES.COMPONENT_PROFILE_SIDEBAR:
      mapState2Props = state => ({
        profile: state.default.profile
      });
      mapDispatch2Props = {};
      break;
    case CLASSES.COMPONENT_MODALGROUP:
      mapState2Props = state => ({
        ...state.modalGroup,
        adaptive: state.default.adaptive,
      });
      mapDispatch2Props = {
        modalGroupSetActiveModal: modalGroupActions.modalGroupSetActiveModal
      };
      break;
    case CLASSES.CABINET_PFOFILE_SCREEN:
      mapState2Props = state => {
        return {
          ...state.wallets,
          ...state.profile,
          ...state.default,
          adaptive: state.default.adaptive
        }
      };
      mapDispatch2Props = {
        setTitle: actions.setTitle,
        loadWallets: walletsActions.loadWallets,
        loadDashboard: profileActions.loadDashboard,
        getPartner: profileActions.getPartner
      };
      break;
    case CLASSES.CABINET_START_PFOFILE_SCREEN:
      mapState2Props = state => ({
        ...state.wallets
      });
      mapDispatch2Props = {
        setTitle: actions.setTitle,
        loadWallets: walletsActions.loadWallets
      };
      break;
    case CLASSES.CABINET_WALLET_SCREEN:
      mapState2Props = state => ({
        ...state.wallets,
        adaptive: state.default.adaptive
      });
      mapDispatch2Props = {
        setTitle: actions.setTitle,
        loadWallets: walletsActions.loadWallets,
        loadMoreTransactions: walletsActions.loadMoreTransactions,
        loadMoreTransfers: walletsActions.loadMoreTransfers,
      };
      break;
    case CLASSES.CABINET_INVESTMENTS_SCREEN:
      mapState2Props = state => {
        return {
          ...state.investments,
          adaptive: state.default.adaptive
        }
      };
      mapDispatch2Props = {
        setTitle: actions.setTitle,
        loadInvestments: investmentsActions.loadInvestments,
        loadProfitHistory: investmentsActions.loadProfitHistory,
        loadWithdrawalHistory: investmentsActions.loadWithdrawalHistory,
        loadMoreWithdrawalHistory: investmentsActions.loadMoreWithdrawalHistory,
        loadMoreProfitHistory: investmentsActions.loadMoreProfitHistory,
      };
      break;
    case CLASSES.CABINET_SETTINGS_SCREEN:
      mapState2Props = state => ({
        ...state.settings,
        profile: state.default.profile,
        adaptive: state.default.adaptive
      });
      mapDispatch2Props = {
        setTitle: actions.setTitle,
        loadSettings: settingsActions.loadSettings,
        setUserFieldValue: settingsActions.setUserFieldValue,
        toastPush: toastsActions.toastPush
      };
      break;
    case CLASSES.SEND_COINS_MODAL:
      mapState2Props = state => ({
        thisState: state.modalGroup.states.send,
        wallets: state.wallets.wallets
      });
      mapDispatch2Props = {
        setStateByModalPage: modalGroupActions.setStateByModalPage,
        toastPush: toastsActions.toastPush
      };
      break;
    case CLASSES.SEND_COINS_CONFIRM_MODAL:
      mapDispatch2Props = {
        toastPush: toastsActions.toastPush
      };
      break;
    case CLASSES.CHANGE_SECRET_KEY_MODAL:
      mapDispatch2Props = {
        changeSecretKay: profileActions.changeSecretKay,
      };
      break;
    case CLASSES.GOOGLE_CODE_MODAL:
      mapState2Props = state => ({
        router: state.router
      });
      mapDispatch2Props = {
        gaInit: profileActions.gaInit,
        toastPush: toastsActions.toastPush
      };
      break;
    case CLASSES.OPEN_DEPOSIT_MODAL:
      mapState2Props = state => ({
        profile: state.default.profile,
        wallets: state.wallets.wallets,
        router: state.router,
        thisState: state.investments.openDepositModal
      });
      break;
    case CLASSES.CALC_DEPOSIT_MODAL:
      mapState2Props = state => ({
        currencies: state.cabinet.currencies
      });
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
    case CLASSES.CHANGE_PHONE_NUMBER_MODAL:
      mapDispatch2Props = {
        toastPush: toastsActions.toastPush
      };
      break;
    case CLASSES.COMPONENT_TOASTS:
      mapState2Props = state => ({
        toasts: state.toasts,
      });
      mapDispatch2Props = {
        toastDrop: toastsActions.toastDrop
      };
      break;
    case CLASSES.COMPONENT_FOOTER:
      mapState2Props = state => ({
        langList: state.default.langList,
      });
      break;
    case CLASSES.CABINET_REGISTER:
      mapDispatch2Props = {
        toastPush: toastsActions.toastPush,
        setTitle: actions.setTitle
      };
      break;
    case CLASSES.CABINET_RESET_PASSWORD:
      mapDispatch2Props = {
        setTitle: actions.setTitle,
        toastPush: toastsActions.toastPush
      };
      break;
    case CLASSES.CABINET_EXCHANGE_SCREEN:
      mapState2Props = (state) => ({
        ...state.exchange,
        adaptive: state.default.adaptive,
        router: state.router,
        user: state.default.profile.user
      });
      mapDispatch2Props = {
        load: exchangeActions.load,
        setTitle: actions.setTitle
      };
      break;
    case CLASSES.EXCHANGE_CHOSE_MARKET_MODAL:
      mapState2Props = (state) => ({
        adaptive: state.default.adaptive,
        markets: state.exchange.markets,
        status: state.exchange.loadingStatus.getMarkets
      });
      mapDispatch2Props = {
        chooseMarket: exchangeActions.chooseMarket,
      };
      break;
    case CLASSES.CABINET_TRADER_SCREEN:
      mapState2Props = (state) => ({
        ...state.trader,
      });
      mapDispatch2Props = {

      };
      break;
    default:
      mapState2Props = state => ({...state});
      mapDispatch2Props = {};
      break;
  }
  return connect(mapState2Props, mapDispatch2Props)(memo(caseClass));
}