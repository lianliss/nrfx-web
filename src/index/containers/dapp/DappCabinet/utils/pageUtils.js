// Pages
import {
  TransactionHistory,
  Farming,
  SwitchPage,
  Exchanger,
  CabinetValidator,
  CabinetWallets,
  Currency,
  Referral,
  SocialMedia,
  Team,
} from 'src/index/components/dapp';
import * as p2p from 'src/index/containers/p2p';

import * as PAGES from 'src/index/constants/pages';
import dappPages from '../constants/dappPages';
import _ from 'lodash';

export const getFinePage = (routeName) => {
  // Set page component
  let Component = Exchanger;
  let mainnetOnly = false;
  let testnetOnly = false;

  switch (routeName) {
    case PAGES.DAPP_WALLET:
      Component = CabinetWallets;
      mainnetOnly = false;
      break;
    case PAGES.DAPP_CURRENCY:
      Component = Currency;
      mainnetOnly = false;
      break;
    case PAGES.DAPP_EXCHANGE:
      Component = Exchanger;
      mainnetOnly = false;
      break;
    case PAGES.DAPP_TRANSACTION_HISTORY:
      Component = TransactionHistory;
      mainnetOnly = false;
      break;
    case PAGES.DAPP_SWAP:
    case PAGES.LIQUIDITY:
    case PAGES.TRANSACTIONS:
      Component = SwitchPage;
      mainnetOnly = false;
      break;
    case PAGES.FARMING:
      Component = Farming;
      testnetOnly = false;
      break;
    case PAGES.DAPP_VALIDATOR:
      Component = CabinetValidator;
      break;
    case PAGES.DAPP_REFERRAL:
    case PAGES.DAPP_REFERRAL_EXCHANGER:
    case PAGES.DAPP_REFERRAL_FARMING:
      Component = Referral;
      mainnetOnly = false;
      break;
    case PAGES.DAPP_SOCIAL_MEDIA:
      Component = SocialMedia;
      break;
    case PAGES.DAPP_TEAM:
      Component = Team;
      break;
    case PAGES.P2P:
      Component = p2p.Orders;
      break;
    case PAGES.P2P_ORDERS:
      Component = p2p.Orders;
      break;
    default:
      Component = Exchanger;
  }

  return { Component, mainnetOnly, testnetOnly };
};

export const pageIsFine = (routeName, chainId) => {
  const dappPage = dappPages.find((page) => page.name === routeName);

  // If there is no value for compare.
  if (!dappPage) return true;

  const dappPageChains = _.get(dappPage, 'chains', []);
  const isFine = dappPageChains.includes(chainId);

  return isFine;
};
