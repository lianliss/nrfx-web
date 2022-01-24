import * as auth from "./auth";
import axios from 'axios';
import _ from 'lodash';

export const APP_ID = process.env.DOMAIN === "admin" ? 10 : 8;
export const getWeb3Entry = () => "https://web3.narfex.com";

const TIMEOUT_CODE = 'ETIMEDOUT';
const RESET_CODE = 'ECONNRESET';
const ATTEMPTS_COUNT = 5;

export class Web3Backend {

  constructor(config = {}) {
    this.config = config;
    this.setInstance(config);
    this.maxAttempts = config.maxAttempts || ATTEMPTS_COUNT;
    this.delete = this.del;
  }

  setInstance = config => {
    this.instance = axios.create(config);
    return this;
  };
  updateInstance = config => {
    this.config = {...this.config, ...config};
    this.setInstance(this.config);
    return this;
  };

  request = (apiPath, options = {}, attempt = 1) => new Promise((fulfill, reject) => {
    (async () => {
      {
        let response;
        if (!options.method) options.method = 'get';
        const instance = _.get(options, 'tempInstance', this.instance);
        const url = `${getWeb3Entry()}/api/v1/${apiPath}`;
        const params = _.get(options, 'params', {});
        const headers = _.get(options, 'headers', {});

        const requestHeaders = {
          "X-Token": auth.getToken(),
          "X-Beta": 1,
          "X-APP-ID": APP_ID,
          "Content-Type": "application/json",
          "Accept-Language": window.localStorage.lang || "en",
          ...headers,
        };

        try {
          response = await instance({
            url,
            ...options,
            headers: requestHeaders,
            params,
          });
          fulfill(response.data);
        } catch (error) {
          const isTimeout = error.code === TIMEOUT_CODE;
          const isReset = error.code === RESET_CODE;
          const errorData = isTimeout || isReset ? error.code : error.response;

          // Run it again if timeout problem
          if (isTimeout || isReset) {
            if (attempt < 0 || attempt === this.maxAttempts) {
              reject(errorData);
            } else {
              fulfill(await this.request(apiPath, options, attempt + 1));
            }
          } else {
            reject(errorData);
          }
        }
      }
    })()
  });

  get = (url, options = {}) => this.request(url, {
    ...options,
    method: 'get',
  });

  post = (url, options = {}) => this.request(url, {
    ...options,
    method: 'post',
  });

  del = (url, options = {}) => this.request(url, {
    ...options,
    method: 'delete',
  });

  getWallets = () => this.get('wallet/all');
  createWallet = () => this.post('wallet/create');
  getPrivateKey = (address, password) => this.get('wallet/privateKey', {
    params: {
      address, password,
    }
  });
  importWallet = (address, network = 'BEP20') => this.post('wallet/import', {
    params: {
      address, network,
    }
  });
  getBalances = address => this.get('wallet/balances', {
    params: {
      address,
    }
  });
  deleteWallet = address => this.post('wallet/delete', {
    params: {
      address,
    }
  });
}

const web3Backend = new Web3Backend();

export default web3Backend;