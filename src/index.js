// styles
import './index.less';
// external
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
// internal
import store from './store';
import router from './router';
import initGetParamsData from './services/initialGetParams';
import {GetParamsContext} from './contexts';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as auth from './services/auth';
import * as user from './actions/user';
import * as emitter from './services/emitter';
import realTimeService from './services/realtime';

require('define').noConflict();
auth.setup();
realTimeService();

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

serviceWorker.register();
