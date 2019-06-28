/* eslint-disable */

import * as actionTypes from './actionTypes';
import { ContactsApi } from '../swagger/src';
import callApi from '../services/api';
import store from '../store';

export function sendContactForm(captcha, message, email, name) {
  return new Promise((resolve, reject) => {
    callApi(new ContactsApi().contactsSendEmailPost, message, captcha, { email, name }).then((res) => {
      console.log('res :', res);
      resolve();
    }).catch((err) => {
      console.log('err :', err);
      reject(err)
    });
  });
}
