export const CONNECTORS = {
  bsc: 'BinanceChain',
  metamask: 'ethereum',
};

export const requests = {
  metamask: {
    request_accounts: 'eth_requestAccounts',
    eth_sendTransaction: 'eth_sendTransaction',
    wallet_watchAsset: 'wallet_watchAsset',
    wallet_addEthereumChain: 'wallet_addEthereumChain',
    wallet_switchEthereumChain: 'wallet_switchEthereumChain',
    personal_sign: 'personal_sign',
  },
  bsc: {
    request_accounts: 'eth_accounts',
    eth_sendTransaction: 'eth_sendTransaction',
    wallet_watchAsset: null,
    wallet_addEthereumChain: 'wallet_addEthereumChain',
    wallet_switchEthereumChain: null,
    personal_sign: 'personal_sign',
  },
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
 * Returns ethereum object.
 * @param connector {string} - Wallet connector name from constant.
 * @returns {object}
 */
export const getEthereumObject = (connector) => {
  const ethereum = CONNECTORS[connector];

  if (!window[ethereum]) {
    return null;
  }

  return window[ethereum];
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
