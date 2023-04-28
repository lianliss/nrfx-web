// styles
import "./index.less";
import "ui/index.less";

// external
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router5";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import store from "./store";
import router from "./router";
import initGetParamsData from "./services/initialGetParams";
import {
  GetParamsContext,
} from "./index/contexts";
import App from "./index/App";
// import * as serviceWorker from './serviceWorker';
import * as user from "./actions/user";
import * as emitter from "./services/emitter";
import realTimeService from "./services/realtime";
import { FIREBASE_CONFIG } from "./index/constants/firebase";
import "./index/polyfill";
import Web3Provider from 'services/web3Provider';

// require('define').noConflict();
realTimeService();

emitter.addListener("userInstall", user.install);
emitter.emit("userInstall");

const wrappedApp = (
  <Provider store={store}>
    <RouterProvider router={router}>
      <GetParamsContext.Provider value={initGetParamsData}>
        <Web3Provider>
          <App store={store} router={router} />
        </Web3Provider>
      </GetParamsContext.Provider>
    </RouterProvider>
  </Provider>
);

router.start((err, state) => {
  ReactDOM.render(wrappedApp, document.getElementById("root"));
});

initializeApp(FIREBASE_CONFIG);
getAnalytics();

// serviceWorker.register();
