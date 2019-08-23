import * as actionTypes from "./actionTypes";
import * as api from "../services/api";
import * as auth from '../services/auth';
import store from "../store";

export function install() {
  if (!auth.isLogged()) {
    return;
  }

  api.get('profile').then(({ ...props }) => {
    store.dispatch({ type: actionTypes.PROFILE, props });
  });
}