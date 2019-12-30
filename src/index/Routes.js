// styles
// external
import React from 'react';
// internal
import SiteMainScreen from './containers/site/SiteMainScreen/SiteMainScreen';
import SiteAboutScreen from './containers/site/SiteAboutScreen/SiteAboutScreen';
import SiteWalletScreen from './containers/site/SiteWalletScreen/SiteWalletScreen';
import SiteRobotsScreen from './containers/site/SiteRobotsScreen/SiteRobotsScreen';
// import SiteCommerceScreen from './containers/site/SiteCommerceScreen/SiteCommerceScreen';
import SiteTechnologyScreen from './containers/site/SiteTechnologyScreen/SiteTechnologyScreen';
import SiteSafetyScreen from './containers/site/SiteSafetyScreen/SiteSafetyScreen';
import SiteExchangeScreen from './containers/site/SiteExchangeScreen/SiteExchangeScreen';
import SiteInvestmentScreen from './containers/site/SiteInvestmentScreen/SiteInvestmentScreen';
import SiteContactScreen from './containers/site/SiteContactScreen/SiteContactScreen';
import SiteFaqScreen from './containers/site/SiteFaqScreen/SiteFaqScreen';
import SiteNotFoundScreen from './containers/site/SiteNotFoundScreen/SiteNotFoundScreen';
import UIKitScreen from './containers/UIKit/UIKitScreen';
import SiteWrapper from '../wrappers/Site/SiteWrapper';
import CabinetWrapper from '../wrappers/Cabinet/CabinetWrapper';

import * as pages from './constants/pages';
import * as CabinetWalletScreen from './containers/cabinet/CabinetWalletScreen/CabinetWalletScreen';
import * as CabinetProfileScreen from './containers/cabinet/CabinetProfileScreen/CabinetProfileScreen';
import * as CabinetInvestmentsScreen from './containers/cabinet/CabinetInvestmentsScreen/CabinetInvestmentsScreen';
import * as CabinetSettingsScreen from './containers/cabinet/CabinetSettingsScreen/CabinetSettingsScreen';
import * as CabinetChangeEmail from './containers/cabinet/CabinetChangeEmailScreen/CabinetChangeEmailScreen';
import * as CabinetRegister from './containers/cabinet/CabinetRegisterScreen/CabinetRegisterScreen';
import * as CabinetResetPassword from './containers/site/SiteResetPasswordScreen/SiteResetPasswordScreen';
import * as MenuScreen from './containers/cabinet/adaptive/MenuScreen/MenuScreen';
import * as NotificationsScreen from './containers/cabinet/adaptive/NotificationsScreen/NotificationsScreen';
// import CabinetExchangeScreen from './containers/cabinet/CabinetExchangeScreen/CabinetExchangeScreen';
import CabinetMerchantStatusScreen from './containers/cabinet/CabinetMerchantStatusScreen/CabinetMerchantStatusScreen';
import SiteFeeScreen from './containers/site/SiteFeeScreen/SiteFeeScreen';

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
    case pages.SITE_EXCHANGE:
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
    // case pages.COMMERCE:
    //   Component = SiteCommerceScreen;
    //   WrapperComponent = SiteWrapper;
    //   break;
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
    case pages.FEE:
      Component = SiteFeeScreen;
      WrapperComponent = SiteWrapper;
      break;
    case pages.UIKIT:
      if (process.env.NODE_ENV === `development`) {
        Component = UIKitScreen;
      }
      break;
    // Cabinet
    case pages.CABINET_WALLET:
      Component = CabinetWalletScreen.default;
      break;
    case pages.PROFILE:
      Component = CabinetProfileScreen.default;
      break;
    case pages.SETTINGS:
      Component = CabinetSettingsScreen.default;
      break;
    case pages.INVESTMENTS:
      Component = CabinetInvestmentsScreen.default;
      break;
    case pages.CHANGE_EMAIL:
      Component = CabinetChangeEmail.default;
      break;
    case pages.REGISTER:
      Component = CabinetRegister.default;
      break;
    case pages.RESET_PASSWORD:
      Component = CabinetResetPassword.default;
      break;
    case pages.MENU:
      Component = MenuScreen.default;
      break;
    case pages.NOTIFICATIONS:
      Component = NotificationsScreen.default;
      break;
    // case pages.EXCHANGE:
    //   Component = CabinetExchangeScreen;
    //   break;
    case pages.MERCHANT:
      WrapperComponent = props => (<>{props.children}</>);
      Component = CabinetMerchantStatusScreen;
      break;
    default:
      Component = SiteNotFoundScreen;
      break;
  }

  const defaultProps = {
    state: props.state.default,
    router: props.router,
  };

  const isWithOrangeBg = [
    pages.CONTACT,
    pages.FAQ,
    pages.ABOUT,
    pages.HISTORY,
    pages.MISSION,
    pages.NOT_FOUND,
    pages.SAFETY,
    pages.TECHNOLOGY,
    pages.FEE
  ].includes(route);

  return (
    <WrapperComponent isHomepage={route === pages.MAIN} withOrangeBg={isWithOrangeBg}>
      <Component {...defaultProps} {...actions} routerParams={routerParams} />
    </WrapperComponent>
  );
}
