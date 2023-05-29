import * as pages from '../pages';

const routes = [
  {
    name: pages.DAPP,
    path: '/dapp',
  },
  {
    name: pages.DAPP_WALLET,
    path: '/dapp/wallet',
  },
  {
    name: pages.DAPP_CURRENCY,
    path: '/dapp/currency',
  },
  {
    name: pages.DAPP_EXCHANGE,
    path: '/dapp/exchange',
  },
  {
    name: pages.DAPP_TRANSACTION_HISTORY,
    path: '/dapp/transaction_history',
  },
  {
    name: pages.DAPP_REFERRAL,
    path: '/dapp/referral',
  },
  {
    name: pages.DAPP_REFERRAL_EXCHANGER,
    path: '/dapp/referral/exchanger',
  },
  {
    name: pages.DAPP_REFERRAL_FARMING,
    path: '/dapp/referral/farming',
  },
  {
    name: pages.DAPP_SOCIAL_MEDIA,
    path: '/dapp/social_media',
  },
  {
    name: pages.DAPP_SWAP,
    path: '/dapp/swap',
  },
  {
    name: pages.LIQUIDITY,
    path: '/dapp/liquidity',
  },
  {
    name: pages.TRANSACTIONS,
    path: '/dapp/transactions',
  },
  {
    name: pages.FARMING,
    path: '/dapp/farming',
  },
  {
    name: pages.DAPP_VALIDATOR,
    path: '/dapp/validator',
  },
  {
    name: pages.DAPP_TEAM,
    path: '/dapp/team',
  },
  {
    name: pages.TOKEN_MIGRATION,
    path: '/token_migration',
  },
  {
    name: pages.P2P,
    path: '/dapp/p2p',
  },
  {
    name: pages.P2P_ORDERS,
    path: '/dapp/p2p/orders',
  },
  {
    name: pages.P2P_ORDER,
    path: '/dapp/p2p/order/:offerAddress/:clientAddress',
  },
  {
    name: pages.P2P_USER_CENTER,
    path: '/dapp/p2p/user_center',
  },
  {
    name: pages.P2P_ADVERTISER_DETAIL,
    path: '/dapp/p2p/advertiser_detail',
  },
];

export default routes;
