// styles
import "./index.less";
// external
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router5";
import * as firebase from "firebase";

import store from "./store";
import router from "./router";
import initGetParamsData from "./services/initialGetParams";
import { GetParamsContext } from "./index/contexts";
import App from "./index/App";
// import * as serviceWorker from './serviceWorker';
import * as user from "./actions/user";
import * as emitter from "./services/emitter";
import realTimeService from "./services/realtime";
import "./index/polyfill";

// require('define').noConflict();
realTimeService();

emitter.addListener("userInstall", user.install);
emitter.emit("userInstall");

const wrappedApp = (
  <Provider store={store}>
    <RouterProvider router={router}>
      <GetParamsContext.Provider value={initGetParamsData}>
        <App store={store} router={router} />
      </GetParamsContext.Provider>
    </RouterProvider>
  </Provider>
);

router.start((err, state) => {
  ReactDOM.render(wrappedApp, document.getElementById("root"));
});

firebase.initializeApp({
  apiKey: "AIzaSyD--i-HdRJeH5nk1c_D_LTPwkrhBU5cz4Y",
  authDomain: "narfex-com.firebaseapp.com",
  databaseURL: "https://narfex-com.firebaseio.com",
  projectId: "narfex-com",
  storageBucket: "narfex-com.appspot.com",
  messagingSenderId: "487369773798",
  appId: "1:487369773798:web:353afafd236b5ac22ee127",
  measurementId: "G-WMDH695XP3"
});
firebase.analytics();

// serviceWorker.register();
