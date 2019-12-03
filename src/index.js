// styles
import './index/index.less';
// external
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
import * as Sentry from '@sentry/browser';
// internal
import store from './store';
import router from './router';
import initGetParamsData from './services/initialGetParams';
import { GetParamsContext } from './index/contexts';
import App from './index/App';
// import * as serviceWorker from './serviceWorker';
import * as auth from './services/auth';
import * as user from './actions/user';
import * as emitter from './services/emitter';
// import realTimeService from './services/realtime';
import './index/polyfill';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({dsn: "https://2f062902440147cfab7ea204358fdd26@sentry.io/1816477"});

  if (window.location.protocol === 'http:') {
    window.location.href = window.location.href.replace('http:', 'https:');
  }
}

require('define').noConflict();
auth.setup();
// realTimeService();

emitter.addListener('userInstall', user.install);
emitter.emit('userInstall');

const wrappedApp = <Provider store={store}>
  <RouterProvider router={router}>
    <GetParamsContext.Provider value={initGetParamsData}>
      <App store={store} router={router} />
    </GetParamsContext.Provider>
  </RouterProvider>
</Provider>;

router.start((err, state) => {
  ReactDOM.render(wrappedApp, document.getElementById('root'))
});

// serviceWorker.register();
