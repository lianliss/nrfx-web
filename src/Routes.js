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
import SiteNotFoundScreen from './containers/site/SiteNotFoundScreen/SiteNotFoundScreen';
import UIKitScreen from './containers/UIKit/UIKitScreen';

import CabinetWalletScreen from './containers/cabinet/CabinetWalletScreen/CabinetWalletScreen';
import CabinetStartProfileScreen from './containers/cabinet/CabinetStartProfileScreen/CabinetStartProfileScreen';
import CabinetInvestmentsScreen from './containers/cabinet/CabinetInvestmentsScreen/CabinetInvestmentsScreen';
import SiteWrapper from './wrappers/Site/SiteWrapper';
import CabinetWrapper from './wrappers/Cabinet/CabinetWrapper';


export default function Routes(props) {

  const routeState = props.router.getState();
  const routerParams = routeState.params;
  const route = routeState.name;

  let actions = {};
  let Component = false;
  let WrapperComponent = CabinetWrapper;

  switch (route) {
    case pages.MAIN:
      Component = SiteMainScreen;
      WrapperComponent = SiteWrapper;
      break;
    case pages.ABOUT:
      Component = SiteAboutScreen;
      WrapperComponent = SiteWrapper;
      break;
    case pages.MISSION:
      Component = SiteAboutScreen;
      WrapperComponent = SiteWrapper;
      break;
    case pages.HISTORY:
      Component = SiteAboutScreen;
      WrapperComponent = SiteWrapper;
      break;
    case pages.EXCHANGE:
      Component = SiteExchangeScreen;
      WrapperComponent = SiteWrapper;
      break;
    case pages.WALLET:
      Component = SiteWalletScreen;
      WrapperComponent = SiteWrapper;
      break;
    case pages.ROBOTS:
      Component = SiteRobotsScreen;
      WrapperComponent = SiteWrapper;
      break;
    case pages.TECHNOLOGY:
      Component = SiteTechnologyScreen;
      WrapperComponent = SiteWrapper;
      break;
    case pages.SAFETY:
      Component = SiteSafetyScreen;
      WrapperComponent = SiteWrapper;
      break;
    case pages.COMMERCE:
      Component = SiteCommerceScreen;
      WrapperComponent = SiteWrapper;
      break;
    case pages.INVESTMENT:
      Component = SiteInvestmentScreen;
      WrapperComponent = SiteWrapper;
      break;
    case pages.CONTACT:
      Component = SiteContactScreen;
      WrapperComponent = SiteWrapper;
      break;
    case pages.FAQ:
      Component = SiteFaqScreen;
      WrapperComponent = SiteWrapper;
      break;
    case pages.UIKIT:
      Component = UIKitScreen;
      break;
    // Cabinet
    case pages.CABINET_WALLET:
      Component = CabinetWalletScreen;
      break;
    case pages.START_PROFILE:
      Component = CabinetStartProfileScreen;
      break;
    case pages.INVESTMENTS:
      Component = CabinetInvestmentsScreen;
      break;
    default:
      Component = SiteNotFoundScreen;
      break;
  }

  if (!Component) {
    return <h1>404 Not Found</h1>;
  }

  const defaultProps = {
    state: props.state.default,
    router: props.router
  };

  const isWithOrangeBg = route === pages.CONTACT || route === pages.FAQ || route === pages.ABOUT || route === pages.HISTORY || route === pages.MISSION || route === pages.NOT_FOUND || route === pages.SAFETY || route === pages.TECHNOLOGY;

  return (
    <WrapperComponent isHomepage={route === pages.MAIN} withOrangeBg={isWithOrangeBg}>
      <Component {...defaultProps} {...actions} routerParams={routerParams} />;
    </WrapperComponent>
  );
}
