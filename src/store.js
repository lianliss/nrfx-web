// styles
// external
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {router5Middleware, router5Reducer} from 'redux-router5';
import {reduxPlugin} from 'redux-router5';
// internal
import router from './router';
import defaultReducer from './reducers';
import cabinetReducer from './reducers/cabinet';
import investmentsReducer from './reducers/investments';
import profileReducer from './reducers/profile';
import settingsReducer from './reducers/settings';
import walletsReducer from './reducers/wallets';
import modalGroupReducer from './reducers/modalGroup';
import notificationsReducer from './reducers/notifications';
import toastsReducer from './reducers/toasts';
import testReducer from './reducers/test';

const middlewares = [];

// const { logger } = require(`redux-logger`);
// middlewares.push(logger);

let store;
export function configureStore() {
  store = createStore(combineReducers({
    router: router5Reducer,
    default: defaultReducer,
    cabinet: cabinetReducer,
    investments: investmentsReducer,
    wallets: walletsReducer,
    modalGroup: modalGroupReducer,
    settings: settingsReducer,
    profile: profileReducer,
    notifications: notificationsReducer,
    toasts: toastsReducer,
    test: testReducer
  }), applyMiddleware( ...middlewares, thunk, router5Middleware(router)));
  router.usePlugin(reduxPlugin(store.dispatch));
}
configureStore();

export default store;
