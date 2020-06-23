// styles
// external
import { createStore, applyMiddleware, combineReducers } from "redux";
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

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

let store;

export function configureStore() {
  store = createStore(
    combineReducers(
      {
        admin: {
          router: router5Reducer,
          toasts: toastsReducer,
          default: defaultReducer,
          admin: adminReducer,
          langs: langsReducer,
          modal: modalReducer
        },
        landing: {
          router: router5Reducer,
          cabinet: cabinetReducer,
          toasts: toastsReducer,
          profile: profileReducer,
          default: defaultReducer,
          langs: langsReducer,
          landing: landingReducer,
          modal: modalReducer
        },
        index: {
          router: router5Reducer,
          documentation: documentation,
          default: defaultReducer,
          cabinet: cabinetReducer,
          modal: modalReducer,
          investments: investmentsReducer,
          wallets: walletsReducer,
          fiat: fiatReducer,
          settings: settingsReducer,
          profile: profileReducer,
          notifications: notificationsReducer,
          toasts: toastsReducer,
          exchange: exchangeReducer,
          internalNotifications: internalNotificationsReducer,
          test: testReducer,
          trader: traderReducer
        }
      }[process.env.DOMAIN]
    ),
    applyMiddleware(...middlewares, thunk, router5Middleware(router))
  );
  router.usePlugin(reduxPlugin(store.dispatch));
}
configureStore();

export default store;
