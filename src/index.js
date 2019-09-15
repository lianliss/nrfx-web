import './index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
import store from './store';
import router from './router';
import * as auth from './services/auth';
import * as user from './actions/user';
import * as emitter from './services/emitter';
import { GetParamsContext } from './contexts';
import initGetParamsData from './services/initialGetParams';

require('define').noConflict();

auth.setup();

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

serviceWorker.unregister();
