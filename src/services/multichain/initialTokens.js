import { ETHEREUM_MAINNET, BSC_MAINNET, BSC_TESTNET } from './chains';
import baseTokens from 'src/index/constants/baseTokens';

// Decimals
const DEFAULT_DECIMALS = 18;

export const TOKEN_LIST_URI = {
  [ETHEREUM_MAINNET]: 'https://static.narfex.com/img/ether_tokens.json',
  [BSC_MAINNET]: 'https://tokens.pancakeswap.finance/cmc.json',
};

export const ABI = {
  [ETHEREUM_MAINNET]: require('src/index/constants/ABI/Erc20Token'),
  [BSC_MAINNET]: require('src/index/constants/ABI/Bep20Token'),
};

export const TOKENS = {
  [ETHEREUM_MAINNET]: {
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
        'https://raw.githubusercontent.com/' +
        'trustwallet/assets/master/blockchains/ethereum/assets/' +
        '0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
    },
    nrfx: {
      name: 'Narfex',
      symbol: 'NRFX',
      address: '0x3764Be118a1e09257851A3BD636D48DFeab5CAFE',
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
        'https://raw.githubusercontent.com/' +
        'trustwallet/assets/master/blockchains/ethereum/assets/' +
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
  },
  [BSC_MAINNET]: {
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
};

export const CHAIN_TOKENS = {
  [ETHEREUM_MAINNET]: TOKENS[ETHEREUM_MAINNET].eth,
  [BSC_MAINNET]: TOKENS[BSC_MAINNET].bnb,
  [BSC_TESTNET]: TOKENS[BSC_TESTNET].bnb,
};

export const WRAP_TOKENS = {
  [ETHEREUM_MAINNET]: TOKENS[ETHEREUM_MAINNET].wrapETH,
  [BSC_MAINNET]: TOKENS[BSC_MAINNET].wrapBNB,
  [BSC_TESTNET]: TOKENS[BSC_TESTNET].wrapBNB,
};

export const DISPLAY_TOKENS = {
  [ETHEREUM_MAINNET]: [
    TOKENS[ETHEREUM_MAINNET].eth,
    TOKENS[ETHEREUM_MAINNET].usdt,
    TOKENS[ETHEREUM_MAINNET].nrfx,
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
    TOKENS[BSC_TESTNET].wrapBNB,
    TOKENS[BSC_TESTNET].usdt,
    TOKENS[BSC_TESTNET].dai,
  ],
};
