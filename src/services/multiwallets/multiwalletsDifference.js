import WalletConnectProvider from '@walletconnect/web3-provider';
import * as CONNECTORS from './connectors';
import requests from './requests';
import _ from 'lodash';

export const noderealRPC = {
  56: 'https://bsc-mainnet.nodereal.io/v1/38d2b41600d44427ac26d968efff647a',
  97: 'https://bsc-testnet.nodereal.io/v1/38d2b41600d44427ac26d968efff647a',
};

/**
 * Returns ethereum request methods for wallet.
 * @param connector {string} - Wallet connector name from constant.
 * @returns {object}
 */
export const getRequestMetods = (connector) => {
  return requests[connector];
};

/**
 * Returns ethereum object of connector.
 * @param connector {string} - Wallet connector name from constant.
 * @returns {object}
 */
export const getEthereum = (connector) => {
  switch (connector) {
    case CONNECTORS.BSC: {
      if (!window['BinanceChain']) {
        return null;
      }

      return window['BinanceChain'];
    }
    case CONNECTORS.METAMASK: {
      if (!window['ethereum']) {
        return null;
      }

      return window['ethereum'];
    }
    case CONNECTORS.TRUST_WALLET: {
      if (!window['trustwallet']) {
        return null;
      }

      return window['trustwallet'];
    }
    case CONNECTORS.WALLET_CONNECT: {
      return new WalletConnectProvider({
        chainId: 56,
        rpc: noderealRPC,
      });
    }
    default:
      return null;
  }
};

/**
 * Returns provider for web3(provider) of connector and ethereum.
 * @param connector {string} - Wallet connector name from constant.
 * @param ethereum {object} - ethereum object. May get with getEthereum(*).
 * @param chainID {number} - current network chainID - 56 mainnet, 97 testnet.
 * @returns {object}
 */
const getProviderOfConnector = (connector, ethereum, chainID = 56) => {
  let provider = noderealRPC[chainID];

  switch (connector) {
    case CONNECTORS.BSC:
      break;
    default:
      provider = ethereum;
      break;
  }

  return provider;
};

/**
 * Returns ethereum object.
 * @param connector {string} - Wallet connector name from constant.
 * @returns {object}
 */
export const getConnectorObject = (connector, chainID = 56) => {
  const ethereum = getEthereum(connector);

  if (!ethereum) {
    return null;
  }

  if (connector === CONNECTORS.METAMASK && !ethereum.isMetaMask) {
    return null;
  }

  if (connector === CONNECTORS.TRUST_WALLET && !ethereum.isTrustWallet) {
    return null;
  }

  const provider = getProviderOfConnector(connector, ethereum, chainID);
  return { ethereum, provider };
};

/**
 * Returns ethereum fetch result.
 * @param requestObject {object} - ethereum request object.
 * @returns {Promise.<*>} - Fetch result.
 */
export const fetchEthereumRequest = async function (requestObject, ethereum) {
  if (!requestObject.method) return false;
  if (!this && !ethereum) return false;

  return await this.ethereum.request(requestObject);
};

/**
 * Returns chainId number for currency wallet connector.
 * @param id {number | string} - chain id in number or hex.
 * @returns {number} - fine chainId.
 */
export const getFineChainId = function (id) {
  if (!this) return;
  if (!id) return;

  // If id is hex, use hexToNumber
  // Else just set id in Number type.
  if (String(id).search('x') >= 0 && !_.isNumber(id)) {
    return this.getWeb3().utils.hexToNumber(id);
  }

  return Number(id);
};

/**
 * Returns current browser connector type.
 * @returns {string}
 */
export const getCurrentConnector = () => {
  if (_.get(window, 'ethereum.isMetaMask')) {
    return CONNECTORS.METAMASK;
  }

  if (_.get(window, 'trustwallet.isTrustWallet')) {
    return CONNECTORS.TRUST_WALLET;
  }

  return CONNECTORS.WALLET_CONNECT;
};
