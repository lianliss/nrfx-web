import baseTokens from './baseTokens';

const networks = {
  56: {
    factoryAddress: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
    routerAddress: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
    masterChefAddress: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
    narfexToken: '0x3764Be118a1e09257851A3BD636D48DFeab5CAFE',
    tokenSale: '0x2bFeCcE60E39Ed14ebbF2b8Fd8e4Ca364b3e6AD0',
    saleFactory: '0x2c87f1f2896092d0660D32Ee69aE2e3227BCD6dB',
    wrapBNB: {
      name: "Wrapped BNB",
      symbol: "WBNB",
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      chainId: 56,
      decimals: 18,
      logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png"
    },
    tokens: [
      {
        name: "Narfex",
        symbol: "NRFX",
        address: "0x3764Be118a1e09257851A3BD636D48DFeab5CAFE",
        chainId: 56,
        decimals: 18,
        logoURI: "https://static.narfex.com/img/currencies/nrfx_pancake.svg"
      },
      {
        name: "Tether",
        symbol: "USDT",
        address: "0x55d398326f99059fF775485246999027B3197955",
        chainId: 56,
        decimals: 18,
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
      },
      {
        name: "Binance Coin",
        symbol: "BNB",
        address: null,
        chainId: 56,
        decimals: 18,
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png"
      },
      ...baseTokens,
    ],
  },
  97: {
    factoryAddress: '0xb7926c0430afb07aa7defde6da862ae0bde767bc',
    routerAddress: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
    masterChefAddress: '0x75e8563615f71C8078B6eD3CC86B24B976F2Ad1F',
    narfexToken: '0xcDA8eD22bB27Fe84615f368D09B5A8Afe4a99320',
    tokenSale: '0x33b6bFa80ed5C8f935D6F745787Cc5EAa4736b55',
    saleFactory: '0x2a5045f00C5AeDAFFb888c039a1596a49E7eBF56',
    wrapBNB: {
      name: "Wrapped BNB",
      symbol: "WBNB",
      address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
      chainId: 97,
      decimals: 18,
      logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png"
    },
    tokens: [
      {
        name: "Narfex",
        symbol: "NRFX",
        address: "0xcDA8eD22bB27Fe84615f368D09B5A8Afe4a99320",
        chainId: 97,
        decimals: 18,
        logoURI: "https://static.narfex.com/img/currencies/nrfx_pancake.svg"
      },
      {
        name: "Binance USD",
        symbol: "BUSD",
        address: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        chainId: 97,
        decimals: 18,
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/4687.png"
      },
      {
        name: "Binance Coin",
        symbol: "BNB",
        address: null,
        chainId: 97,
        decimals: 18,
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png"
      },
      {
        name: "Wrapped BNB",
        symbol: "WBNB",
        address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
        chainId: 97,
        decimals: 18,
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png"
      },
      {
        name: "Tether",
        symbol: "USDT",
        address: "0x7ef95a0fee0dd31b22626fa2e10ee6a223f8a684",
        chainId: 97,
        decimals: 18,
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
      },
    ],
  }
};

export default networks;
