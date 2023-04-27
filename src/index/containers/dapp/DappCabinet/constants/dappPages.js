import * as PAGES from 'src/index/constants/pages';
import {
  ETHEREUM_MAINNET,
  BSC_MAINNET,
  BSC_TESTNET,
  POLYGON_MAINNET,
  POLYGON_MUMBAI,
  ARBITRUM_MAINNET,
} from 'src/services/multichain/chains';
import company from 'src/index/constants/company';

export default [
  {
    name: PAGES.DAPP_WALLET,
    chains: [BSC_MAINNET, BSC_TESTNET],
  },
  {
    name: PAGES.DAPP_CURRENCY,
    chains: [
      ETHEREUM_MAINNET,
      BSC_MAINNET,
      BSC_TESTNET,
      POLYGON_MAINNET,
      POLYGON_MUMBAI,
      ARBITRUM_MAINNET,
    ],
  },
  {
    name: PAGES.DAPP_EXCHANGE,
    chains: [
      ETHEREUM_MAINNET,
      BSC_MAINNET,
      BSC_TESTNET,
      POLYGON_MAINNET,
      POLYGON_MUMBAI,
      ARBITRUM_MAINNET,
    ],
  },
  {
    name: PAGES.DAPP_TRANSACTION_HISTORY,
    chains: [
      ETHEREUM_MAINNET,
      BSC_MAINNET,
      BSC_TESTNET,
      POLYGON_MAINNET,
      POLYGON_MUMBAI,
      ARBITRUM_MAINNET,
    ],
  },
  {
    name: PAGES.DAPP_SWAP,
    chains: [BSC_MAINNET, BSC_TESTNET, POLYGON_MUMBAI],
  },
  {
    name: PAGES.DAPP_PRO_DEX,
    chains: [
      ETHEREUM_MAINNET,
      BSC_MAINNET,
      BSC_TESTNET,
      POLYGON_MAINNET,
      POLYGON_MUMBAI,
      ARBITRUM_MAINNET,
    ],
  },
  {
    name: PAGES.LIQUIDITY,
    chains: [
      ETHEREUM_MAINNET,
      BSC_MAINNET,
      BSC_TESTNET,
      POLYGON_MAINNET,
      POLYGON_MUMBAI,
      ARBITRUM_MAINNET,
    ],
  },
  {
    name: PAGES.TRANSACTIONS,
    chains: [
      ETHEREUM_MAINNET,
      BSC_MAINNET,
      BSC_TESTNET,
      POLYGON_MAINNET,
      POLYGON_MUMBAI,
      ARBITRUM_MAINNET,
    ],
  },
  {
    name: PAGES.FARMING,
    chains: [
      ETHEREUM_MAINNET,
      BSC_MAINNET,
      BSC_TESTNET,
      POLYGON_MAINNET,
      POLYGON_MUMBAI,
      ARBITRUM_MAINNET,
    ],
  },
  {
    name: PAGES.DAPP_VALIDATOR,
    chains: [
      ETHEREUM_MAINNET,
      BSC_MAINNET,
      BSC_TESTNET,
      POLYGON_MAINNET,
      POLYGON_MUMBAI,
      ARBITRUM_MAINNET,
    ],
  },
  {
    name: PAGES.DAPP_REFERRAL,
    chains: [
      ETHEREUM_MAINNET,
      BSC_MAINNET,
      BSC_TESTNET,
      POLYGON_MAINNET,
      POLYGON_MUMBAI,
      ARBITRUM_MAINNET,
    ],
  },
  {
    name: PAGES.DAPP_REFERRAL_EXCHANGER,
    chains: [
      ETHEREUM_MAINNET,
      BSC_MAINNET,
      BSC_TESTNET,
      POLYGON_MAINNET,
      POLYGON_MUMBAI,
      ARBITRUM_MAINNET,
    ],
  },
  {
    name: PAGES.DAPP_REFERRAL_FARMING,
    chains: [
      ETHEREUM_MAINNET,
      BSC_MAINNET,
      BSC_TESTNET,
      POLYGON_MAINNET,
      POLYGON_MUMBAI,
      ARBITRUM_MAINNET,
    ],
  },
  {
    name: PAGES.DAPP_SOCIAL_MEDIA,
    chains: [
      ETHEREUM_MAINNET,
      BSC_MAINNET,
      BSC_TESTNET,
      POLYGON_MAINNET,
      POLYGON_MUMBAI,
      ARBITRUM_MAINNET,
    ],
  },
  {
    name: PAGES.DAPP_TEAM,
    chains: [
      ETHEREUM_MAINNET,
      BSC_MAINNET,
      BSC_TESTNET,
      POLYGON_MAINNET,
      POLYGON_MUMBAI,
      ARBITRUM_MAINNET,
    ],
  },
  {
    name: PAGES.P2P,
    chains:
      window.location.host === company.host ||
      window.location.host === company.testnetHost
        ? []
        : [1, 56, 97],
  },
  {
    name: PAGES.P2P_ORDERS,
    chains:
      window.location.host === company.host ||
      window.location.host === company.testnetHost
        ? []
        : [1, 56, 97],
  },
];
