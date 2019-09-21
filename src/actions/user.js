// styles
// external
// internal
import store from '../store';
import apiSchema from '../services/apiSchema';
import * as actionTypes from './actionTypes';
import * as api from '../services/api';
import * as auth from '../services/auth';

export function install() {
  if (!auth.isLogged()) {
    return;
  }
  api.call(apiSchema.Profile.DefaultGet).then(({ ...props }) => {
    store.dispatch({ type: actionTypes.PROFILE, props });
  });
}