export const requests = {
  metamask: {
    request_accounts: 'eth_requestAccounts',
    eth_sendTransaction: 'eth_sendTransaction',
    wallet_watchAsset: 'wallet_watchAsset',
    wallet_addEthereumChain: 'wallet_addEthereumChain',
    wallet_switchEthereumChain: 'wallet_switchEthereumChain',
    personal_sign: 'personal_sign',
  },
  binanceChain: {
    request_accounts: 'eth_accounts',
    eth_sendTransaction: 'eth_sendTransaction',
    wallet_watchAsset: 'wallet_watchAsset',
    wallet_addEthereumChain: 'wallet_addEthereumChain',
    wallet_switchEthereumChain: 'wallet_switchEthereumChain',
    personal_sign: 'personal_sign',
  },
};

/**
 * Wallet connectors:
 *  metamask
 *  binanceChain
 */

/**
 * Returns ethereum request methods for wallet.
 * @param walletConnector {string} - Wallet connector name in camelCase.
 * @returns {object}
 */
export const getRequestMetods = (walletConnector) => {
  return requests[walletConnector];
};

/**
 * Returns ethereum object.
 * @param walletConnector {string} - Wallet connector name in camelCase.
 * @returns {object}
 */
export const getEthereumObject = (walletConnector) => {
  const ethereums = {
    metamask: 'ethereum',
    binanceChain: 'BinanceChain',
  };

  const ethereum = ethereums[walletConnector];

  if (!window[ethereum]) {
    throw new Error('No wallet plugins detected');
  }

  return window[ethereum];
};
