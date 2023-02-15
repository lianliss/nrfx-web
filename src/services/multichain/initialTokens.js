import {
  ETHEREUM_MAINNET,
  BSC_MAINNET, BSC_TESTNET,
  POLYGON_MAINNET,
  ARBITRUM_MAINNET,
  NETWORKS_DATA,
} from './chains';
import baseTokens from 'src/index/constants/baseTokens';
import _ from 'lodash';

// Decimals
const DEFAULT_DECIMALS = 18;

export const TOKEN_LIST_URI = {
  [ETHEREUM_MAINNET]: 'https://storage.googleapis.com/custom-product-builder/ether_tokens.json',
  [BSC_MAINNET]: 'https://tokens.pancakeswap.finance/cmc.json',
  [POLYGON_MAINNET]: 'https://storage.googleapis.com/custom-product-builder/polygon_tokens.json',
  [ARBITRUM_MAINNET]: 'https://storage.googleapis.com/custom-product-builder/arbitrum_tokens.json',
};

export const ABI = {
  [ETHEREUM_MAINNET]: require('src/index/constants/ABI/Erc20Token'),
  [BSC_MAINNET]: require('src/index/constants/ABI/Bep20Token'),
  [BSC_TESTNET]: require('src/index/constants/ABI/Bep20Token'),
  [POLYGON_MAINNET]: require('src/index/constants/ABI/Erc20Token'),
  [ARBITRUM_MAINNET]: require('src/index/constants/ABI/Erc20Token'),
};

export const TOKENS = {
  [ETHEREUM_MAINNET]: {
    usdc: {
      name: "USD Coin",
      symbol: "USDC",
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      chainId: ETHEREUM_MAINNET,
      decimals: 6,
      logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
    },
    eth: {
      name: 'Ethereum',
      symbol: 'ETH',
      address: null,
      chainId: ETHEREUM_MAINNET,
      decimals: DEFAULT_DECIMALS,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    },
    usdt: {
      name: 'Tether USD',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      symbol: 'USDT',
      decimals: 6,
      chainId: ETHEREUM_MAINNET,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
    },
    nrfx: {
      name: 'Narfex',
      symbol: 'NRFX',
      address: '0x01b443495834D667b42f54d2b77eEd6951eD94a4',
      chainId: ETHEREUM_MAINNET,
      decimals: DEFAULT_DECIMALS,
      logoURI: 'https://static.narfex.com/img/currencies/nrfx_pancake.svg',
    },
    wrapETH: {
      name: 'Wrapped Ether',
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      symbol: 'WETH',
      decimals: DEFAULT_DECIMALS,
      chainId: ETHEREUM_MAINNET,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
  },
  [BSC_MAINNET]: {
    usdc: {
      name: "USD Coin",
      symbol: "USDC",
      address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
      chainId: 56,
      decimals: 18,
      logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
    },
    usdt: {
      name: 'Tether',
      symbol: 'USDT',
      address: '0x55d398326f99059fF775485246999027B3197955',
      chainId: BSC_MAINNET,
      decimals: DEFAULT_DECIMALS,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
    },
    nrfx: {
      name: 'Narfex',
      symbol: 'NRFX',
      address: '0x3764Be118a1e09257851A3BD636D48DFeab5CAFE',
      chainId: BSC_MAINNET,
      decimals: DEFAULT_DECIMALS,
      logoURI: 'https://static.narfex.com/img/currencies/nrfx_pancake.svg',
    },
    bnb: {
      name: 'Binance Coin',
      symbol: 'BNB',
      address: null,
      chainId: BSC_MAINNET,
      decimals: DEFAULT_DECIMALS,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png',
    },
    wrapBNB: {
      name: 'Wrapped BNB',
      symbol: 'WBNB',
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      chainId: BSC_MAINNET,
      decimals: DEFAULT_DECIMALS,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png',
    },
  },
  [BSC_TESTNET]: {
    wrapBNB: {
      name: 'Wrapped BNB',
      symbol: 'WBNB',
      address: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
      chainId: BSC_TESTNET,
      decimals: DEFAULT_DECIMALS,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png',
    },
    usdc: {
      name: "USD Coin",
      symbol: "USDC",
      address: "0xd92271C20A5a3A03d8Eb6244D1c002EBed525605",
      chainId: BSC_TESTNET,
      decimals: DEFAULT_DECIMALS,
      logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
    },
    bnb: {
      name: 'Binance Coin',
      symbol: 'BNB',
      address: null,
      chainId: BSC_TESTNET,
      decimals: DEFAULT_DECIMALS,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png',
    },
    usdt: {
      name: 'Tether',
      symbol: 'USDT',
      address: '0x7ef95a0fee0dd31b22626fa2e10ee6a223f8a684',
      chainId: BSC_TESTNET,
      decimals: DEFAULT_DECIMALS,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
    },
    nrfx: {
      name: 'Narfex',
      symbol: 'NRFX',
      address: '0xcDA8eD22bB27Fe84615f368D09B5A8Afe4a99320',
      chainId: BSC_TESTNET,
      decimals: DEFAULT_DECIMALS,
      logoURI: 'https://static.narfex.com/img/currencies/nrfx_pancake.svg',
    },
    busd: {
      name: 'Binance USD',
      symbol: 'BUSD',
      address: '0x78867bbeef44f2326bf8ddd1941a4439382ef2a7',
      chainId: BSC_TESTNET,
      decimals: DEFAULT_DECIMALS,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4687.png',
    },
    dai: {
      name: 'Dai Token',
      symbol: 'DAI',
      address: '0x8a9424745056Eb399FD19a0EC26A14316684e274',
      chainId: BSC_TESTNET,
      decimals: DEFAULT_DECIMALS,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
    },
  },
  [POLYGON_MAINNET]: {
    usdc: {
      name: "USD Coin",
      symbol: "USDC",
      address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      chainId: POLYGON_MAINNET,
      decimals: 6,
      logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
    },
    matic: {
      name: 'Matic',
      symbol: 'MATIC',
      address: null,
      chainId: POLYGON_MAINNET,
      decimals: DEFAULT_DECIMALS,
      logoURI: 'https://static.metaswap.codefi.network/api/v1/tokenIcons/137/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270.png',
    },
    wrapMATIC: {
      name: 'Wrapped Matic',
      address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
      symbol: 'WMATIC',
      decimals: DEFAULT_DECIMALS,
      chainId: POLYGON_MAINNET,
      logoURI:
        'https://static.metaswap.codefi.network/api/v1/tokenIcons/137/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270.png',
    },
  },
  [ARBITRUM_MAINNET]: {
    usdc: {
      name: "USD Coin",
      symbol: "USDC",
      address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
      chainId: ARBITRUM_MAINNET,
      decimals: 6,
      logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
    },
    eth: {
      name: 'Ethereum',
      symbol: 'ETH',
      address: null,
      chainId: ARBITRUM_MAINNET,
      decimals: DEFAULT_DECIMALS,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    },
    wrapETH: {
      name: 'Wrapped Ether',
      address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
      symbol: 'WETH',
      decimals: DEFAULT_DECIMALS,
      chainId: ARBITRUM_MAINNET,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
  },
};

export const CHAIN_TOKENS = {
  [ETHEREUM_MAINNET]: TOKENS[ETHEREUM_MAINNET].eth,
  [BSC_MAINNET]: TOKENS[BSC_MAINNET].bnb,
  [BSC_TESTNET]: TOKENS[BSC_TESTNET].bnb,
  [POLYGON_MAINNET]: TOKENS[POLYGON_MAINNET].matic,
  [ARBITRUM_MAINNET]: TOKENS[ARBITRUM_MAINNET].eth,
};

export const WRAP_TOKENS = {
  [ETHEREUM_MAINNET]: TOKENS[ETHEREUM_MAINNET].wrapETH,
  [BSC_MAINNET]: TOKENS[BSC_MAINNET].wrapBNB,
  [BSC_TESTNET]: TOKENS[BSC_TESTNET].wrapBNB,
  [POLYGON_MAINNET]: TOKENS[POLYGON_MAINNET].wrapMATIC,
  [ARBITRUM_MAINNET]: TOKENS[ARBITRUM_MAINNET].wrapETH,
};

export const DISPLAY_TOKENS = {
  [ETHEREUM_MAINNET]: [
    TOKENS[ETHEREUM_MAINNET].eth,
    TOKENS[ETHEREUM_MAINNET].usdt,
    TOKENS[ETHEREUM_MAINNET].nrfx,
    ...baseTokens.filter((t) => t.chainId === ETHEREUM_MAINNET),
  ],
  [BSC_MAINNET]: [
    TOKENS[BSC_MAINNET].bnb,
    TOKENS[BSC_MAINNET].nrfx,
    TOKENS[BSC_MAINNET].usdt,
    ...baseTokens.filter((t) => t.chainId === BSC_MAINNET),
  ],
  [BSC_TESTNET]: [
    TOKENS[BSC_TESTNET].nrfx,
    TOKENS[BSC_TESTNET].busd,
    TOKENS[BSC_TESTNET].bnb,
    TOKENS[BSC_TESTNET].usdt,
    TOKENS[BSC_TESTNET].dai,
    ...baseTokens.filter((t) => t.chainId === BSC_TESTNET),
  ],
  [POLYGON_MAINNET]: [
    TOKENS[POLYGON_MAINNET].usdc,
    TOKENS[POLYGON_MAINNET].matic,
    TOKENS[POLYGON_MAINNET].wrapMATIC,
    ...baseTokens.filter(t => t.chainId === POLYGON_MAINNET),
  ],
  [ARBITRUM_MAINNET]: [
    TOKENS[ARBITRUM_MAINNET].usdc,
    TOKENS[ARBITRUM_MAINNET].eth,
    TOKENS[ARBITRUM_MAINNET].wrapETH,
    ...baseTokens.filter(t => t.chainId === ARBITRUM_MAINNET),
  ]
};

// Common Bases
const initialCommonBases = ['NRFX', 'DAI', 'USDC', 'USDT', 'WBTC', 'WETH'];
const getCommonBases = (chainId, arr = []) => [NETWORKS_DATA[chainId].defaultSymbol].concat(arr, initialCommonBases)

export const COMMON_BASES = {
  [ETHEREUM_MAINNET]: getCommonBases(ETHEREUM_MAINNET),
  [BSC_MAINNET]: getCommonBases(BSC_MAINNET),
  [BSC_TESTNET]: getCommonBases(BSC_TESTNET),
  [POLYGON_MAINNET]: getCommonBases(POLYGON_MAINNET),
  [ARBITRUM_MAINNET]: getCommonBases(ARBITRUM_MAINNET),
};

console.log('COMMON_BASES', COMMON_BASES);