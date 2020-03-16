// styles
// external
import React from "react";
import { connect } from "react-redux";
// internal
import SiteMainScreen from "./containers/site/SiteMainScreen/SiteMainScreen";
import SiteAboutScreen from "./containers/site/SiteAboutScreen/SiteAboutScreen";
import SiteWalletScreen from "./containers/site/SiteWalletScreen/SiteWalletScreen";
// import SiteRobotsScreen from './containers/site/SiteRobotsScreen/SiteRobotsScreen';
// import SiteCommerceScreen from './containers/site/SiteCommerceScreen/SiteCommerceScreen';
import SiteTechnologyScreen from "./containers/site/SiteTechnologyScreen/SiteTechnologyScreen";
import SiteSafetyScreen from "./containers/site/SiteSafetyScreen/SiteSafetyScreen";
import SiteExchangeScreen from "./containers/site/SiteExchangeScreen/SiteExchangeScreen";
// import SiteInvestmentScreen from './containers/site/SiteInvestmentScreen/SiteInvestmentScreen';
import SiteContactScreen from "./containers/site/SiteContactScreen/SiteContactScreen";
import SiteFaqScreen from "./containers/site/SiteFaqScreen/SiteFaqScreen";
import SiteNotFoundScreen from "./containers/site/SiteNotFoundScreen/SiteNotFoundScreen";
import UIKitScreen from "./containers/UIKit/UIKitScreen";
import SiteWrapper from "../wrappers/Site/SiteWrapper";
import CabinetWrapper from "../wrappers/Cabinet/CabinetWrapper";
import DocumentationWrapper from "../wrappers/Documentation/DocumentationWrapper";

import * as pages from "./constants/pages";
import * as CabinetWalletScreen from "./containers/cabinet/CabinetWalletScreen/CabinetWalletScreen";
import * as CabinetFiatScreen from "./containers/cabinet/CabinetFiatScreen/CabinetFiatScreen";
import * as CabinetProfileScreen from "./containers/cabinet/CabinetProfileScreen/CabinetProfileScreen";
import * as CabinetInvestmentsScreen from "./containers/cabinet/CabinetInvestmentsScreen/CabinetInvestmentsScreen";
import * as CabinetSettingsScreen from "./containers/cabinet/CabinetSettingsScreen/CabinetSettingsScreen";
import * as CabinetChangeEmail from "./containers/cabinet/CabinetChangeEmailScreen/CabinetChangeEmailScreen";
import * as CabinetRegister from "./containers/cabinet/CabinetRegisterScreen/CabinetRegisterScreen";
import * as CabinetResetPassword from "./containers/site/SiteResetPasswordScreen/SiteResetPasswordScreen";
import * as MenuScreen from "./containers/cabinet/adaptive/MenuScreen/MenuScreen";
import * as NotificationsScreen from "./containers/cabinet/adaptive/NotificationsScreen/NotificationsScreen";
import CabinetExchangeScreen from "./containers/cabinet/CabinetExchangeScreen/CabinetExchangeScreen";
import CabinetMerchantStatusScreen from "./containers/cabinet/CabinetMerchantStatusScreen/CabinetMerchantStatusScreen";
import SiteFeeScreen from "./containers/site/SiteFeeScreen/SiteFeeScreen";
import TraderScreen from "./containers/cabinet/TraderScreen/TraderScreen";
import DocumentationPage from "./containers/documentation/Page/Page";
import DocumentationMethod from "./containers/documentation/Method/Method";
import * as actions from "../actions/index";
import router from "../router";

function Routes(props) {
  const routeState = props.route;
  const routerParams = routeState.params;
  const route = routeState.name;

  let Component = false;
  let WrapperComponent = CabinetWrapper;
  let needAuthorization = false;

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
    // case pages.ROBOTS:
    //   Component = SiteRobotsScreen;
    //   WrapperComponent = SiteWrapper;
    //   break;
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
    // case pages.INVESTMENT:
    //   Component = SiteInvestmentScreen;
    //   WrapperComponent = SiteWrapper;
    //   break;
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
      needAuthorization = true;
      Component = CabinetWalletScreen.default;
      break;
    case pages.FIAT:
      needAuthorization = true;
      Component = CabinetFiatScreen.default;
      break;
    case pages.DASHBOARD:
      needAuthorization = true;
      Component = CabinetProfileScreen.default;
      break;
    case pages.SETTINGS:
      needAuthorization = true;
      Component = CabinetSettingsScreen.default;
      break;
    case pages.INVESTMENTS:
      needAuthorization = true;
      Component = props.profile.has_deposits
        ? CabinetInvestmentsScreen.default
        : SiteNotFoundScreen;
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
      needAuthorization = true;
      Component = MenuScreen.default;
      break;
    case pages.NOTIFICATIONS:
      needAuthorization = true;
      Component = NotificationsScreen.default;
      break;
    case pages.EXCHANGE:
      Component = CabinetExchangeScreen;
      break;
    case pages.MERCHANT:
      WrapperComponent = props => <>{props.children}</>;
      Component = CabinetMerchantStatusScreen;
      break;
    case pages.TRADER:
      needAuthorization = true;
      Component = TraderScreen;
      break;
    case pages.DOCUMENTATION:
      WrapperComponent = DocumentationWrapper;
      Component = DocumentationPage;
      break;
    case pages.DOCUMENTATION_API:
      WrapperComponent = DocumentationWrapper;
      Component = DocumentationPage;
      break;
    case pages.DOCUMENTATION_API_GROUP:
      WrapperComponent = DocumentationWrapper;
      Component = DocumentationPage;
      break;
    case pages.DOCUMENTATION_API_GROUP_METHOD:
      WrapperComponent = DocumentationWrapper;
      Component = DocumentationMethod;
      break;
    default:
      Component = SiteNotFoundScreen;
      break;
  }

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

  if (
    needAuthorization === true &&
    !props.profile.pending &&
    !props.profile.user
  ) {
    router.navigate(pages.MAIN);
    return null;
  }

  actions.setCabinet(WrapperComponent === CabinetWrapper); // HACK

  return (
    <WrapperComponent
      isHomepage={route === pages.MAIN}
      withOrangeBg={isWithOrangeBg}
    >
      <Component routerParams={routerParams} />
    </WrapperComponent>
  );
}

export default connect(state => ({
  profile: state.default.profile,
  route: state.router.route
}))(Routes);
