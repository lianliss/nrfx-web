import axios from 'axios';

export const api = {
  url: 'https://api.coingecko.com/api/v3/',
  platform_id: { bsc: 'binance-smart-chain' },
  paths: {
    simple: {
      token_price: {
        path: 'simple/token_price/{platform_id}',
        params: [
          'platform_id',
          'contract_addresses',
          'vs_currencies',
          'include_24hr_change',
        ],
      },
    },
  },
};

const getPathWithParams = (path, params) => {
  let finallyPath = path;

  Object.keys(params).forEach((param) => {
    finallyPath = finallyPath.replace(`{${param}}`, params[param]);
  });

  return finallyPath;
};

/**
 * Coingecko request function.
 * @param path {string} - https://api.coingecko.com/api/v3/{path}
 * @param params {object}
 * @returns {Promise} fetch response
 */
export const coingeckoCall = async (path, params) => {
  const pathWithParams = getPathWithParams(path, params);
  const requestUrl = api.url + pathWithParams;

  const response = await axios
    .get(requestUrl, {
      headers: { accept: 'application/json' },
      params: {
        ...params,
      },
    })
    .then((data) => data.data);

  return response;
};

/**
 * Get token price from token contract address
 * @param path {string} - https://api.coingecko.com/api/v3/{path}
 * @param params {object}
 * @returns {Promise.<{ address, usd, usd_24h_change }>}
 */
export const simpleTokenPrice = async (
  address = '',
  usd_24h_change = false,
  platform_id = 'binance-smart-chain'
) => {
  const tokenAddress = address.toLowerCase();
  const response = await coingeckoCall(api.paths.simple.token_price.path, {
    contract_addresses: tokenAddress,
    platform_id: platform_id,
    vs_currencies: 'usd',
    include_24hr_change: usd_24h_change,
  }).then((data) => {
    const tokenData = data[tokenAddress.toLowerCase()];

    if (tokenData && Object.keys(tokenData).length) {
      return {
        address: tokenAddress,
        usd: tokenData.usd,
        usd_24h_change: usd_24h_change ? Number(tokenData.usd_24h_change) : 0,
      };
    }

    return { address: tokenAddress, usd: 0, usd_24h_change: 0 };
  });

  return response;
};
