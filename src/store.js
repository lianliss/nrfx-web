import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import router from './router';
import { router5Middleware, router5Reducer } from 'redux-router5';
import { reduxPlugin } from 'redux-router5';

import defaultReducer from './reducers';
import testReducer from './reducers/test';

let store;
export function configureStore() {
  store = createStore(combineReducers({
    router: router5Reducer,
    default: defaultReducer,
    test: testReducer
  }), applyMiddleware(thunk, router5Middleware(router)));

  router.usePlugin(reduxPlugin(store.dispatch));
}
configureStore();

export default store;
