import { noderealRPC } from '../multiwallets/multiwalletsDifference';
import {
  ETHEREUM_MAINNET,
  BSC_MAINNET, BSC_TESTNET,
  POLYGON_MAINNET,
  POLYGON_MUMBAI,
  ARBITRUM_MAINNET,
} from './chains';

export const CONTRACT_ADDRESSES = {
  [ETHEREUM_MAINNET]: {
    factoryAddress: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    factoryInitCodeHash:
      '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
    routerAddress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    masterChefAddress: '0x0000000000000000000000000000000000000000',
    narfexToken: '0x01b443495834D667b42f54d2b77eEd6951eD94a4',
    tokenSale: '0x0000000000000000000000000000000000000000',
    saleFactory: '0x0000000000000000000000000000000000000000',
    fiatFactory: '0xcDA8eD22bB27Fe84615f368D09B5A8Afe4a99320',
    exchangerRouter: '0xe847015B4B7C2A7844703E654415B96534fE772D',
    narfexOracle: '0xBaBfFCe575929DDd7aD29DEEeb5B7A5F5dee4Ab6',
    providerAddress: noderealRPC[ETHEREUM_MAINNET],
    narfexToken2: '0xCc17e34794B6c160a0F61B58CF30AA6a2a268625',
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
  [BSC_TESTNET]: {
    factoryAddress: '0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc',
    factoryInitCodeHash:
      '0xecba335299a6693cb2ebc4782e74669b84290b6378ea3a3873c7231a8d7d1074',
    routerAddress: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
    masterChefAddress: '0xDf8951a64a0eaF51216B72C4f4Fdd2BE8d98589E',
    narfexToken: '0xfa76d0dc8E020098B3f22f67d8AADda6FDc7164e',
    tokenSale: '0x0af7288b81176212aA52B2eEa1Ee63551E39cE80',
    saleFactory: '0x0E956a98907Af40cffC365a5609316442854e77B',
    fiatFactory: '0xF9ceb479201054d2B301f9052A5fFBe47D652358',
    exchangerRouter: '0x96E163D8E6f3C1D128Ce9EBA81fF7AD5E3054f4d',
    narfexOracle: '0x5bA23078FaB7Dd3A6d7b5049a2C711Ef8ba7E8d0',
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
  [POLYGON_MUMBAI]: {
    factoryAddress: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    factoryInitCodeHash:
      '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
    routerAddress: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    masterChefAddress: '0x00A4A639EC536C3Bb9436e710b38120856Fa95ec',
    narfexToken: '0xe48d1C63199aca7B4b4B39068098A0ED27840a8d',
    tokenSale: '',
    saleFactory: '',
    fiatFactory: '0xC8f30866816fdab9Bb6BDbbb03d4a54103145c99',
    exchangerRouter: '0x90A5bf543E4B3C62eAEefdFB16AaeA43eaFde5b6',
    narfexOracle: '0xe56f902B21d540FC031531C1Da4b50f4377aFE81',
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
  [BSC_TESTNET]: [
    '0x571839f49403f92483078e0bbc918cec3bae28f7',
  ],
  [POLYGON_MAINNET]: [],
  [ARBITRUM_MAINNET]: [],
  [POLYGON_MUMBAI]: [
    '0xe19E7E35c52169d27a515781e83FF90422e5b7b7',
  ],
};

export const TOKEN_ABI = {
  [ETHEREUM_MAINNET]: require('src/index/constants/ABI/Erc20Token'),
  [BSC_MAINNET]: require('src/index/constants/ABI/Bep20Token'),
  [BSC_TESTNET]: require('src/index/constants/ABI/Bep20Token'),
  [POLYGON_MAINNET]: require('src/index/constants/ABI/Erc20Token'),
  [ARBITRUM_MAINNET]: require('src/index/constants/ABI/Erc20Token'),
};
