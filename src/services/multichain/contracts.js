import { noderealRPC } from '../multiwallets/multiwalletsDifference';
import {
  ETHEREUM_MAINNET,
  BSC_MAINNET, BSC_TESTNET,
  POLYGON_MAINNET,
  ARBITRUM_MAINNET,
} from './chains';

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
    exchangerRouter: '0xe847015B4B7C2A7844703E654415B96534fE772D',
    narfexOracle: '0xBaBfFCe575929DDd7aD29DEEeb5B7A5F5dee4Ab6',
    providerAddress: noderealRPC[ETHEREUM_MAINNET],
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
    exchangerRouter: '0x4F7446aE07c1A4AF09Bc6c3dCAf28FAF351C02D5',
    narfexOracle: '0xE948F3AE41105118A48B0a656f59C5B4113d404e',
    providerAddress: noderealRPC[BSC_MAINNET],
  },
  [POLYGON_MAINNET]: {
    factoryAddress: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    factoryInitCodeHash:
      '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
    routerAddress: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    masterChefAddress: '',
    narfexToken: '',
    tokenSale: '',
    saleFactory: '',
    fiatFactory: '0xAD1Fc0E22C13159884Cf9FD1d46e3C2Ad60C8F36',
    exchangerRouter: '0xEcF8DeF47948321Ab0594462D154E9B78625AA20',
    narfexOracle: '0xC8f30866816fdab9Bb6BDbbb03d4a54103145c99',
    providerAddress: noderealRPC[POLYGON_MAINNET],
  },
  [ARBITRUM_MAINNET]: {
    factoryAddress: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    factoryInitCodeHash:
      '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
    routerAddress: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    masterChefAddress: '',
    narfexToken: '',
    tokenSale: '',
    saleFactory: '',
    fiatFactory: '0x79f3b7770093444573D64972E67312d03E9A6f3c',
    exchangerRouter: '0x7A052032AeecBa4e723Fee660Df7Ff5CA59B08C6',
    narfexOracle: '0xcDA8eD22bB27Fe84615f368D09B5A8Afe4a99320',
    providerAddress: noderealRPC[ARBITRUM_MAINNET],
  },
};

export const POOLS_LIST = {
  [ETHEREUM_MAINNET]: [],
  [BSC_MAINNET]: [
    '0xe38004a2124abe97f972b2af12e888962fae464b',
    '0x4f191eff08dd7074f3a6584c2024290968ba94db',
  ],
  [BSC_TESTNET]: [],
  [POLYGON_MAINNET]: [],
  [ARBITRUM_MAINNET]: [],
};

export const TOKEN_ABI = {
  [ETHEREUM_MAINNET]: require('src/index/constants/ABI/Erc20Token'),
  [BSC_MAINNET]: require('src/index/constants/ABI/Bep20Token'),
  [BSC_TESTNET]: require('src/index/constants/ABI/Bep20Token'),
  [POLYGON_MAINNET]: require('src/index/constants/ABI/Erc20Token'),
  [ARBITRUM_MAINNET]: require('src/index/constants/ABI/Erc20Token'),
};
