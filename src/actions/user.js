// styles
// external
// internal
import store from "../store";
import apiSchema from "../services/apiSchema";
import * as actionTypes from "./actionTypes";
import * as api from "../services/api";
import * as auth from "../services/auth";
import * as internalNotifications from "./cabinet/internalNotifications";
import * as actions from "./index";

export function install() {
  if (!auth.isLogged()) {
    return Promise.reject();
  }

  store.dispatch({ type: actionTypes.PROFILE_PENDING, value: true });
  return api
    .call(apiSchema.Profile.DefaultGet)
    .then(({ ...props }) => {
      store.dispatch({ type: actionTypes.PROFILE, props });
      actions.loadCurrencies(); // TOTO: помоему это здесь лишнее
      internalNotifications.load()(store.dispatch, store.getState);
    })
    .finally(() => {
      store.dispatch({ type: actionTypes.PROFILE_PENDING, value: false });
    });
}
