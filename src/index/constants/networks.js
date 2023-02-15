import baseTokens from './baseTokens';

// Chain ids
const ETHEREUM_MAINNET = 1;
const BSC_MAINNET = 56;
const BSC_TESTNET = 97;

// Decimals
const DEFAULT_DECIMALS = 18;

const tokens = {
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
  },
};
tokens.ETH = tokens[ETHEREUM_MAINNET];
tokens.BSC = tokens[BSC_MAINNET];

const networks = {
  [ETHEREUM_MAINNET]: {
    networkID: 'ETH',
    fiatDecimals: 6,
    tokenListURI: 'https://storage.googleapis.com/custom-product-builder/ether_tokens.json',
    factoryAddress: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    factoryInitCodeHash:
      '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
    routerAddress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    masterChefAddress: '0x0000000000000000000000000000000000000000',
    narfexToken: '0x155cd154b4c3Afc2719601b617e52526a520d301',
    tokenSale: '0x0000000000000000000000000000000000000000',
    saleFactory: '0x0000000000000000000000000000000000000000',
    fiatFactory: '0xcDA8eD22bB27Fe84615f368D09B5A8Afe4a99320',
    exchangerRouter: '0xebDEC768d466157c533f5b93F4ED8f30F42B4e68',
    narfexOracle: '0xBaBfFCe575929DDd7aD29DEEeb5B7A5F5dee4Ab6',
    tokenABI: require('./ABI/Erc20Token'),
    mainnet: true,
    wrapToken: tokens[ETHEREUM_MAINNET].wrapETH,
    usdt: tokens[ETHEREUM_MAINNET].usdt,
    usdc: tokens[ETHEREUM_MAINNET].usdc,
    wrapETH: tokens[ETHEREUM_MAINNET].wrapETH,
    tokens: [
      ...baseTokens.filter(t => t.chainId === 1),
    ],
    ...tokens[ETHEREUM_MAINNET],
  },
  [BSC_MAINNET]: {
    networkID: 'BSC',
    fiatDecimals: 18,
    tokenListURI: 'https://tokens.pancakeswap.finance/cmc.json',
    factoryAddress: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
    factoryInitCodeHash:
      '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5',
    routerAddress: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
    masterChefAddress: '0x9032aEc2255680Ed14f832a7ba99603065C7a0ce',
    narfexToken: '0x3764Be118a1e09257851A3BD636D48DFeab5CAFE',
    tokenSale: '0x0af7288b81176212aA52B2eEa1Ee63551E39cE80',
    saleFactory: '0x0E956a98907Af40cffC365a5609316442854e77B',
    fiatFactory: '0xF9ceb479201054d2B301f9052A5fFBe47D652358',
    exchangerRouter: '0x9af372bEAfe51bD4920110834187DFB3679F150E',
    narfexOracle: '0xE948F3AE41105118A48B0a656f59C5B4113d404e',
    tokenABI: require('./ABI/Bep20Token'),
    mainnet: true,
    wrapToken: tokens[BSC_MAINNET].wrapBNB,
    poolsList: [
      '0xe38004a2124abe97f972b2af12e888962fae464b',
      '0x4f191eff08dd7074f3a6584c2024290968ba94db',
    ],
    tokens: [
      tokens[BSC_MAINNET].nrfx,
      tokens[BSC_MAINNET].usdt,
      tokens[BSC_MAINNET].bnb,
      ...baseTokens.filter(t => t.chainId === 56),
    ],
    ...tokens[BSC_MAINNET],
  },
  [BSC_TESTNET]: {
    networkID: 'TEST',
    fiatDecimals: 18,
    factoryAddress: '0xb7926c0430afb07aa7defde6da862ae0bde767bc',
    factoryInitCodeHash:
      '0xecba335299a6693cb2ebc4782e74669b84290b6378ea3a3873c7231a8d7d1074',
    routerAddress: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
    masterChefAddress: '0x75e8563615f71C8078B6eD3CC86B24B976F2Ad1F',
    narfexToken: '0xcDA8eD22bB27Fe84615f368D09B5A8Afe4a99320',
    tokenSale: '0x19E27fea1fC3ee50ab6A5354B812E1D8E8940FDB',
    saleFactory: '0x7195274908d9c6A2991Ae17bD32e5245fD0b5d7b',
    fiatFactory: '0xF1f8206c94F38525E94919E7381889B3d6D57Ac5',
    exchangerRouter: '0x40b12e44Ec75307D18831f8B0AA636Af1De081fc',
    narfexOracle: '0x0CdCad1e2c9C59920E916aDC75B7b21B5c2f78D5',
    tokenABI: require('./ABI/Bep20Token'),
    mainnet: false,
    wrapToken: tokens[BSC_TESTNET].wrapBNB,
    wrapBNB: tokens[BSC_TESTNET].wrapBNB,
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
    
    poolsList: [],
    tokens: [
      {
        name: 'Narfex',
        symbol: 'NRFX',
        address: '0xcDA8eD22bB27Fe84615f368D09B5A8Afe4a99320',
        chainId: BSC_TESTNET,
        decimals: DEFAULT_DECIMALS,
        logoURI: 'https://static.narfex.com/img/currencies/nrfx_pancake.svg',
      },
      {
        name: 'Binance USD',
        symbol: 'BUSD',
        address: '0x78867bbeef44f2326bf8ddd1941a4439382ef2a7',
        chainId: BSC_TESTNET,
        decimals: DEFAULT_DECIMALS,
        logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4687.png',
      },
      {
        name: 'Binance Coin',
        symbol: 'BNB',
        address: null,
        chainId: BSC_TESTNET,
        decimals: DEFAULT_DECIMALS,
        logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png',
      },
      tokens[BSC_TESTNET].wrapBNB,
      {
        name: 'Tether',
        symbol: 'USDT',
        address: '0x7ef95a0fee0dd31b22626fa2e10ee6a223f8a684',
        chainId: BSC_TESTNET,
        decimals: DEFAULT_DECIMALS,
        logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
      },
      {
        name: 'Dai Token',
        symbol: 'DAI',
        address: '0x8a9424745056Eb399FD19a0EC26A14316684e274',
        chainId: BSC_TESTNET,
        decimals: DEFAULT_DECIMALS,
        logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
      },
    ],
  },
};
networks.ETH = networks[ETHEREUM_MAINNET];
networks.BSC = networks[BSC_MAINNET];

export default networks;
