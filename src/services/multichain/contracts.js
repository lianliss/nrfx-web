import { BSC_MAINNET, BSC_TESTNET, ETHEREUM_MAINNET } from './chains';

export const CONTRACT_ADDRESSES = {
  [ETHEREUM_MAINNET]: {
    factoryAddress: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    factoryInitCodeHash:
      '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
    routerAddress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    masterChefAddress: '0x0000000000000000000000000000000000000000',
    narfexToken: '0x155cd154b4c3Afc2719601b617e52526a520d301',
    tokenSale: '0x0000000000000000000000000000000000000000',
    saleFactory: '0x0000000000000000000000000000000000000000',
    fiatFactory: '0xcDA8eD22bB27Fe84615f368D09B5A8Afe4a99320',
    exchangerRouter: '0x60c68cb00C77AA0f46Af9eaB32695E4eFBEbd45C',
    narfexOracle: '0x043C37847dEE7f0657C45f4b7379DeE320aD9F18',
  },
  [BSC_MAINNET]: {
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
  },
  [BSC_TESTNET]: {
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
  },
};

export const POOLS_LIST = {
  [ETHEREUM_MAINNET]: [],
  [BSC_MAINNET]: [
    '0xe38004a2124abe97f972b2af12e888962fae464b',
    '0x4f191eff08dd7074f3a6584c2024290968ba94db',
  ],
  [BSC_TESTNET]: [],
};

export const TOKEN_ABI = {
  [ETHEREUM_MAINNET]: require('src/index/constants/ABI/Erc20Token'),
  [BSC_MAINNET]: require('src/index/constants/ABI/Bep20Token'),
  [BSC_TESTNET]: require('src/index/constants/ABI/Bep20Token'),
};
