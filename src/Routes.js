import React from 'react';

import * as pages from './constants/pages';
import SiteMainScreen from './containers/site/SiteMainScreen/SiteMainScreen';
import SiteAboutScreen from './containers/site/SiteAboutScreen/SiteAboutScreen';
import SiteWalletScreen from './containers/site/SiteWalletScreen/SiteWalletScreen';
import SiteRobotsScreen from './containers/site/SiteRobotsScreen/SiteRobotsScreen';
import SiteCommerceScreen from './containers/site/SiteCommerceScreen/SiteCommerceScreen';
import SiteTechnologyScreen from './containers/site/SiteTechnologyScreen/SiteTechnologyScreen';
import SiteSafetyScreen from './containers/site/SiteSafetyScreen/SiteSafetyScreen';
import SiteExchangeScreen from './containers/site/SiteExchangeScreen/SiteExchangeScreen';
import SiteInvestmentScreen from './containers/site/SiteInvestmentScreen/SiteInvestmentScreen';
import SiteContactScreen from './containers/site/SiteContactScreen/SiteContactScreen';
import SiteFaqScreen from './containers/site/SiteFaqScreen/SiteFaqScreen';
import UIKitScreen from './containers/UIKit/UIKitScreen';


export default function Routes(props) {

  let actions = {};
  let state = {};
  let Component = false;

  switch (props.state.default.page) {
    case pages.MAIN:
      Component = SiteMainScreen;
      break;
    case pages.ABOUT:
      Component = SiteAboutScreen;
      break;
    case pages.EXCHANGE:
      Component = SiteExchangeScreen;
      break;
    case pages.WALLET:
      Component = SiteWalletScreen;
      break;
    case pages.ROBOTS:
      Component = SiteRobotsScreen;
      break;
    case pages.TECHNOLOGY:
      Component = SiteTechnologyScreen;
      break;
    case pages.SAFETY:
      Component = SiteSafetyScreen;
      break;
    case pages.COMMERCE:
      Component = SiteCommerceScreen;
      break;
    case pages.INVESTMENT:
      Component = SiteInvestmentScreen;
      break;
    case pages.CONTACT:
      Component = SiteContactScreen;
      break;
    case pages.FAQ:
      Component = SiteFaqScreen;
      break;
    case pages.UIKIT:
      Component = UIKitScreen;
      break;
    default:
      Component = UIKitScreen;
      break;
  }

  if (!Component) {
    return <h1>404 Not Found</h1>;
  }

  const defaultProps = {
    state: props.state.default
  };

  return <Component {...defaultProps} {...actions} {...state} />;
}
