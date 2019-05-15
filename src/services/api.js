import { ApiClient } from '../swagger';
import * as auth from './auth';

export const Errors = {
  FATAL: 1,
  AUTH: 2,
  PARAM: 3,
  LOGIN_BAD_PARAMS: 4,
  BLOCKED: 5,
  PHONE_VERIFICATION: 6,
  BAD_CODE: 7,
  BAD_EMAIL: 8,
  BAD_REFERER: 9,
  EMAIL_USED: 10,
};

export default function callApi(callable) {
  return new Promise((resolve, reject) => {
    let args = [].slice.call(arguments).slice(1);
    args.push(async (error, data, resp) => {
      if (error) {
        console.log('Error', error['rawResponse']);
        console.log(resp.xhr['_response']);
        if (resp.body.code === Errors.AUTH) {
          auth.logout();
        }
        return reject(resp.body);
      }

      //console.log('resp', JSON.stringify(resp), resp.xhr['_response'], resp.body);

      resolve(resp.body);
    });

    callable.call({apiClient: ApiClient.instance}, ...args);
  });
}
