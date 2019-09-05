import * as actionTypes from "./actionTypes";
import * as api from "../services/api";
import * as auth from '../services/auth';
import store from "../store";
import schemaAPI from '../services/schema_out';

export function install() {
  if (!auth.isLogged()) {
    return;
  }
  api.call(schemaAPI["profile/"]).then(({ ...props }) => {
    store.dispatch({ type: actionTypes.PROFILE, props });
  });
}