// styles
// external
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import thunk from "redux-thunk";
import { router5Middleware, router5Reducer } from "redux-router5";
import { reduxPlugin } from "redux-router5";
// internal
import router from "./router";
import defaultReducer from "./reducers";
import cabinetReducer from "./reducers/cabinet";
import investmentsReducer from "./reducers/investments";
import profileReducer from "./reducers/profile";
import settingsReducer from "./reducers/settings";
import documentation from "./reducers/documentation";
import walletsReducer from "./reducers/wallets";
import walletReducer from "./reducers/wallet";
import fiatReducer from "./reducers/fiat";
import notificationsReducer from "./reducers/notifications";
import toastsReducer from "./reducers/toasts";
import internalNotificationsReducer from "./reducers/InternalNotifications";
import testReducer from "./reducers/test";
import exchangeReducer from "./reducers/exchange";
import modalReducer from "./reducers/modal";
import adminReducer from "./reducers/admin";
import langsReducer from "./reducers/langs";
import landingReducer from "./reducers/landing";
import traderReducer from "./reducers/trader";
import web3Reducer from "./reducers/web3";
import dappReducer from "./reducers/dapp";
import rootSaga from "./sagas";

let store;

const sagaMiddleware = createSagaMiddleware();

export function configureStore() {
  store = createStore(
    combineReducers(
      {
        admin: {
          router: router5Reducer,
          cabinet: cabinetReducer,
          toasts: toastsReducer,
          default: defaultReducer,
          admin: adminReducer,
          langs: langsReducer,
          modal: modalReducer,
          web3: web3Reducer,
        },
        landing: {
          router: router5Reducer,
          cabinet: cabinetReducer,
          toasts: toastsReducer,
          profile: profileReducer,
          default: defaultReducer,
          langs: langsReducer,
          landing: landingReducer,
          modal: modalReducer,
        },
        index: {
          landing: landingReducer,
          router: router5Reducer,
          documentation: documentation,
          default: defaultReducer,
          cabinet: cabinetReducer,
          modal: modalReducer,
          investments: investmentsReducer,
          wallets: walletsReducer,
          wallet: walletReducer,
          fiat: fiatReducer,
          settings: settingsReducer,
          profile: profileReducer,
          notifications: notificationsReducer,
          toasts: toastsReducer,
          exchange: exchangeReducer,
          internalNotifications: internalNotificationsReducer,
          test: testReducer,
          trader: traderReducer,
          web3: web3Reducer,
          dapp: dappReducer,
        }
      }[process.env.DOMAIN || "index"]
    ),
    composeWithDevTools(
      applyMiddleware(thunk, sagaMiddleware, router5Middleware(router))
    )
  );
  router.usePlugin(reduxPlugin(store.dispatch));
}

configureStore();
sagaMiddleware.run(rootSaga);

export default store;
