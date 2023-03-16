const TESTNET_BASE_TOKENS = [
  {
    name: "Wrapped BNB",
    symbol: "WBNB",
    address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    chainId: 97,
    decimals: 18,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png"
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    address: "0xd92271C20A5a3A03d8Eb6244D1c002EBed525605",
    chainId: 97,
    decimals: 18,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
  },
  {
    name: "Tether",
    symbol: "USDT",
    address: "0x7ef95a0fee0dd31b22626fa2e10ee6a223f8a684",
    chainId: 97,
    decimals: 18,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
  },
  {
    name: "Dai Token",
    symbol: "DAI",
    address: "0x8a9424745056Eb399FD19a0EC26A14316684e274",
    chainId: 97,
    decimals: 18,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
  },
];

const ETHER_BASE_TOKENS = [
  {
    name: "Wrapped Ether",
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    symbol: "WETH",
    decimals: 18,
    chainId: 1,
    logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  },
  {
    name: "USDCoin",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    symbol: "USDC",
    decimals: 6,
    chainId: 1,
    logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  },
  {
    name: "Tether USD",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    symbol: "USDT",
    decimals: 6,
    chainId: 1,
    logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
  },
  {
    name: "Uniswap",
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    symbol: "UNI",
    decimals: 18,
    chainId: 1,
    logoURI: "ipfs://QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg",
  },
];

const POLYGON_BASE_TOKENS = [
  {
    name: "USD Coin",
    symbol: "USDC",
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    chainId: 137,
    decimals: 6,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
  },
  {
    name: 'Wrapped Ether',
    address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    symbol: 'WMATIC',
    decimals: 18,
    chainId: 137,
    logoURI:
      'https://static.metaswap.codefi.network/api/v1/tokenIcons/137/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270.png',
  },
  {
    chainId: 137,
    name: "Tether USD",
    symbol: "USDT",
    decimals: 6,
    address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    logoURI: "https://wallet-asset.matic.network/img/tokens/usdt.svg",
  },
];

const ARBITRUM_BASE_TOKENS = [
  {
    name: "USD Coin",
    symbol: "USDC",
    address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    chainId: 42161,
    decimals: 6,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
  },
  {
    name: 'Wrapped Ether',
    address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    symbol: 'WETH',
    decimals: 18,
    chainId: 42161,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
  },
  {
    chainId: 42161,
    address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    name: "Tether",
    symbol: "USDT",
    decimals: 6,
    logoURI: "https://assets.coingecko.com/coins/images/325/thumb/Tether.png?1668148663"
  },
];

module.exports = [
  {
    name: "Wrapped BNB",
    symbol: "WBNB",
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    chainId: 56,
    decimals: 18,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png"
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    chainId: 56,
    decimals: 18,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
  },
  {
    name: "PancakeSwap",
    symbol: "Cake",
    address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
    chainId: 56,
    decimals: 18,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/7186.png"
  },
  {
    name: "Binance USD",
    symbol: "BUSD",
    address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    chainId: 56,
    decimals: 18,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/4687.png"
  },
  {
    name: "Bitcoin BEP20",
    symbol: "BTCB",
    address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
    chainId: 56,
    decimals: 18,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/4023.png"
  },
  {
    name: "Terra USD",
    symbol: "UST",
    address: "0x23396cF899Ca06c4472205fC903bDB4de249D6fC",
    chainId: 56,
    decimals: 18,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/7129.png"
  },
  {
    name: "Ethereum BEP20",
    symbol: "ETH",
    address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
    chainId: 56,
    decimals: 18,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
  },
  {
    name: "Binance-Peg USD Coin",
    symbol: "USDC",
    address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    chainId: 56,
    decimals: 18,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
  },
  ...TESTNET_BASE_TOKENS,
  ...ETHER_BASE_TOKENS,
  ...POLYGON_BASE_TOKENS,
  ...ARBITRUM_BASE_TOKENS,
];
