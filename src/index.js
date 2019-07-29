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

require('define').noConflict();

auth.setup();

const wrappedApp = <Provider store={store}>
  <RouterProvider router={router}>
    <App store={store} router={router} />
  </RouterProvider>
</Provider>;

router.start((err, state) => {
  ReactDOM.render(wrappedApp, document.getElementById('root'))
});

serviceWorker.unregister();
