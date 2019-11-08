// styles
import './index/index.less';

// external
import React from 'react';
import App from './admin/App';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import router from './router';
import {RouterProvider} from 'react-router5';
import * as auth from './services/auth';
import * as emitter from './services/emitter';
import * as user from './actions/user';


require('define').noConflict();
auth.setup();

emitter.addListener('userInstall', user.install);
emitter.emit('userInstall');

router.start((err, state) => {
  ReactDOM.render(
    <Provider store={store} >
      <RouterProvider router={router}>
        <App store={store} router={router} admin={true} />
      </RouterProvider>
    </Provider>,
    document.getElementById('root')
  );
});
