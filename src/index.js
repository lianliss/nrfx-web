import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import router from './router';
import * as actionTypes from './actions/actionTypes';
import * as auth from './services/auth';
require('define').noConflict();

auth.setup();
router.addListener((to, from) => store.dispatch({ type: actionTypes.NAVIGATE, to, from })).start();

ReactDOM.render(
  <Provider store={store}>
    <App store={store} router={router} />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
