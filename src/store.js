import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import router from './router';
import { router5Middleware, router5Reducer } from 'redux-router5';
import { reduxPlugin } from 'redux-router5';

import defaultReducer from './reducers';
import cabinetReducer from './reducers/cabinet';
import investmentsReducer from './reducers/investments';
import walletsReducer from './reducers/wallets';
import testReducer from './reducers/test';

let store;
export function configureStore() {
  store = createStore(combineReducers({
    router: router5Reducer,
    default: defaultReducer,
    cabinet: cabinetReducer,
    investments: investmentsReducer,
    wallets: walletsReducer,
    test: testReducer
  }), applyMiddleware(thunk, router5Middleware(router)));

  router.usePlugin(reduxPlugin(store.dispatch));
}
configureStore();

export default store;
