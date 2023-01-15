import baseTokens from './baseTokens';

const networks = {
  56: {
    factoryAddress: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
    factoryInitCodeHash: '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5',
    routerAddress: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
    masterChefAddress: '0x9032aEc2255680Ed14f832a7ba99603065C7a0ce',
    narfexToken: '0x3764Be118a1e09257851A3BD636D48DFeab5CAFE',
    tokenSale: '0x0af7288b81176212aA52B2eEa1Ee63551E39cE80',
    saleFactory: '0x0E956a98907Af40cffC365a5609316442854e77B',
    fiatFactory: '0xF9ceb479201054d2B301f9052A5fFBe47D652358',
    exchangerRouter: '0xF1211F8b7235EE6d1AC0989a781b44540a0dC5Ef',
    narfexOracle: '0xE948F3AE41105118A48B0a656f59C5B4113d404e',
    wrapBNB: {
      name: "Wrapped BNB",
      symbol: "WBNB",
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      chainId: 56,
      decimals: 18,
      logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png"
    },
    bnb: {
      name: "Binance Coin",
      symbol: "BNB",
      address: null,
      chainId: 56,
      decimals: 18,
      logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png"
    },
    usdt: {
      name: "Tether",
      symbol: "USDT",
      address: "0x55d398326f99059fF775485246999027B3197955",
      chainId: 56,
      decimals: 18,
      logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
    },
    poolsList: ["0xe38004a2124abe97f972b2af12e888962fae464b","0x4f191eff08dd7074f3a6584c2024290968ba94db"],
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
      ...baseTokens.filter(t => t.chainId === 56),
    ],
  },
  97: {
    factoryAddress: '0xb7926c0430afb07aa7defde6da862ae0bde767bc',
    factoryInitCodeHash: '0xecba335299a6693cb2ebc4782e74669b84290b6378ea3a3873c7231a8d7d1074',
    routerAddress: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
    masterChefAddress: '0x75e8563615f71C8078B6eD3CC86B24B976F2Ad1F',
    narfexToken: '0xcDA8eD22bB27Fe84615f368D09B5A8Afe4a99320',
    tokenSale: '0x19E27fea1fC3ee50ab6A5354B812E1D8E8940FDB',
    saleFactory: '0x7195274908d9c6A2991Ae17bD32e5245fD0b5d7b',
    fiatFactory: '0xF1f8206c94F38525E94919E7381889B3d6D57Ac5',
    exchangerRouter: '0x40b12e44Ec75307D18831f8B0AA636Af1De081fc',
    narfexOracle: '0x0CdCad1e2c9C59920E916aDC75B7b21B5c2f78D5',
    wrapBNB: {
      name: "Wrapped BNB",
      symbol: "WBNB",
      address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
      chainId: 97,
      decimals: 18,
      logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png"
    },
    bnb: {
      name: "Binance Coin",
      symbol: "BNB",
      address: null,
      chainId: 97,
      decimals: 18,
      logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png"
    },
    usdt: {
      name: "Tether",
      symbol: "USDT",
      address: "0x7ef95a0fee0dd31b22626fa2e10ee6a223f8a684",
      chainId: 97,
      decimals: 18,
      logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
    },
    poolsList: [

    ],
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
      {
        name: "Dai Token",
        symbol: "DAI",
        address: "0x8a9424745056Eb399FD19a0EC26A14316684e274",
        chainId: 97,
        decimals: 18,
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
      },
    ],
  }
};

export default networks;
