// styles
// external
import React from "react";
import { connect } from "react-redux";

// Favicons
import faviconSmallDefault from "src/asset/favicon.png";
import faviconLargeDefault from "src/asset/favicon-32x32.png";
import faviconSmallNRFX_token from "src/asset/NRFX_logo.svg";
import faviconLargeNRFX_token from "src/asset/NRFX_logo-large.svg";

// internal
import SiteMainScreen from "src/landing/containers/MainScreen/MainScreen";
import BuyBitcoinScreen from "src/landing/containers/BuyBitcoin/BuyBitcoin";
import SiteAboutScreen from "../landing/containers/Company/Company";
import TokenLanding from "../token_landing/containers/TokenLanding/TokenLanding";
import NarfexDAO from "../landings/Narfex_DAO/NarfexDAO";
import FarmingInstruction from "../landings/FarmingInstruction/FarmingInstruction";
// import SiteWalletScreen from "./containers/site/SiteWalletScreen/SiteWalletScreen";
// import SiteRobotsScreen from './containers/site/SiteRobotsScreen/SiteRobotsScreen';
// import SiteCommerceScreen from './containers/site/SiteCommerceScreen/SiteCommerceScreen';
// import SiteTechnologyScreen from "./containers/site/SiteTechnologyScreen/SiteTechnologyScreen";
// import SiteSafetyScreen from "./containers/site/SiteSafetyScreen/SiteSafetyScreen";
import SiteExchangeScreen from "../landing/containers/Exchange/Exchange";
// import SiteInvestmentScreen from './containers/site/SiteInvestmentScreen/SiteInvestmentScreen';
import SiteContactScreen from "../landing/containers/Contacts/Contacts";
// import SiteFaqScreen from "./containers/site/SiteFaqScreen/SiteFaqScreen";
import SiteNotFoundScreen from "./containers/site/SiteNotFoundScreen/SiteNotFoundScreen";
// import UIKitScreen from "./containers/UIKit/UIKitScreen";
// import SiteWrapper from "../wrappers/Site/SiteWrapper";
import CabinetWrapper from "../wrappers/Cabinet/CabinetWrapper";
import DappWrapper from "../wrappers/Dapp/DappWrapper";
import LandingWrapper from "../wrappers/Landing/LandingWrapper";
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
import SiteFeeScreen from "../landing/containers/Fee/SiteFeeScreen";
import SiteTokenScreen from "./containers/site/SiteTokenScreen/SiteTokenScreen";
import TokenSale from "./containers/dapp/TokenSale/TokenSale";
import TraderScreen from "./containers/cabinet/TraderScreen/TraderScreen";
import DocumentationPageScreen from "./containers/documentation/Page/Page";
import DocumentationMethodScreen from "./containers/documentation/Method/Method";
import DocumentationMethodListScreen from "./containers/documentation/MethodList/MethodList";
import DappCabinet from "./containers/dapp/DappCabinet/DappCabinet";
import * as actions from "../actions/index";
import router from "../router";
import PrivatePools from "./containers/dapp/PrivatePools/PrivatePools";

function Routes(props) {
  const routeState = props.route;
  const routerParams = routeState.params;
  const route = routeState.name;

  let Component = false;
  let WrapperComponent = CabinetWrapper;
  let needAuthorization = false;

  // Favicon
  const favicon16 = document.getElementById('favicon-16');
  const favicon32 = document.getElementById('favicon-32');
  
  // Have to set to props array of prev pages, then
  // set default favicon.
  const setDefaultFavicon = (routeNames = []) => {
    const {previousRoute} = props.router;
    if (previousRoute) {
      // Each all routes.
      routeNames.map((routeName) => {
        if (previousRoute.name === routeName) {
          favicon16.href = faviconSmallDefault;
          favicon32.href = faviconLargeDefault;
          return true;
        }
      });
    }
  }

  React.useEffect(() => {
    setDefaultFavicon([pages.TOKEN]);
  }, [route]);


  switch (route) {    
    case pages.MAIN:
      Component = SiteMainScreen;
      WrapperComponent = LandingWrapper;
      break;
    case pages.BUY_BITCOIN:
      Component = BuyBitcoinScreen;
      WrapperComponent = LandingWrapper;
      break;
    case pages.ABOUT:
      Component = SiteAboutScreen;
      WrapperComponent = LandingWrapper;
      break;
    // case pages.MISSION:
    //   Component = SiteAboutScreen;
    //   WrapperComponent = SiteWrapper;
    //   break;
    // case pages.HISTORY:
    //   Component = SiteAboutScreen;
    //   WrapperComponent = SiteWrapper;
    //   break;
    case pages.SITE_EXCHANGE:
      Component = SiteExchangeScreen;
      WrapperComponent = LandingWrapper;
      break;
    // case pages.WALLET:
    //   Component = SiteWalletScreen;
    //   WrapperComponent = SiteWrapper;
    //   break;
    // case pages.ROBOTS:
    //   Component = SiteRobotsScreen;
    //   WrapperComponent = SiteWrapper;
    //   break;
    // case pages.TECHNOLOGY:
    //   Component = SiteTechnologyScreen;
    //   WrapperComponent = SiteWrapper;
    //   break;
    // case pages.SAFETY:
    //   Component = SiteSafetyScreen;
    //   WrapperComponent = SiteWrapper;
    //   break;

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
      WrapperComponent = LandingWrapper;
      break;
    // case pages.FAQ:
    //   Component = SiteFaqScreen;
    //   WrapperComponent = SiteWrapper;
    //   break;
    case pages.FEE:
      Component = SiteFeeScreen;
      WrapperComponent = LandingWrapper;
      break;
    case pages.TOKEN:
      Component = TokenLanding;
      WrapperComponent = LandingWrapper;

      favicon16.href = faviconSmallNRFX_token;
      favicon32.href = faviconLargeNRFX_token;
      break;
    // case pages.UIKIT:
    //   if (process.env.NODE_ENV === `development`) {
    //     Component = UIKitScreen;
    //   }
    //   break;
    // // Cabinet
    case pages.WALLET:
    case pages.WALLET_SWAP:
    case pages.WALLET_CRYPTO:
    case pages.WALLET_FIAT:
      needAuthorization = true;
      Component = CabinetWalletScreen.default;
      break;
    case pages.DAPP:
    case pages.DAPP_WALLET:
    case pages.DAPP_CURRENCY:
    case pages.DAPP_SWAP:
    case pages.DAPP_EXCHANGE:
    case pages.FARMING:
    case pages.LIQUIDITY:
    case pages.TRANSACTIONS:
    case pages.VALIDATOR:
    case pages.DAPP_REFERRAL:
    case pages.DAPP_REFERRAL_EXCHANGER:
    case pages.DAPP_REFERRAL_FARMING:
      needAuthorization = false;
      WrapperComponent = DappWrapper;
      Component = DappCabinet;
      break;
    case pages.FIAT:
      needAuthorization = true;
      Component = CabinetFiatScreen.default;
      break;
    case pages.PARTNERS:
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
      Component = DocumentationPageScreen;
      break;
    case pages.DOCUMENTATION_PAGE:
      WrapperComponent = DocumentationWrapper;
      Component = DocumentationPageScreen;
      break;
    case pages.DOCUMENTATION_API:
      WrapperComponent = DocumentationWrapper;
      Component = DocumentationMethodListScreen;
      break;
    case pages.DOCUMENTATION_API_LIST:
      WrapperComponent = DocumentationWrapper;
      Component = DocumentationMethodListScreen;
      break;
    case pages.DOCUMENTATION_API_METHOD:
      WrapperComponent = DocumentationWrapper;
      Component = DocumentationMethodScreen;
      break;
    case pages.TOKEN_LANDING:
      Component = TokenLanding;
      WrapperComponent = LandingWrapper;
      favicon16.href = faviconSmallNRFX_token;
      favicon32.href = faviconLargeNRFX_token;
      break;
    case pages.NARFEX_DAO:
      Component = NarfexDAO;
      WrapperComponent = LandingWrapper;
      break;
    case pages.FARMING_INSTRUCTION:
      Component = FarmingInstruction;
      WrapperComponent = LandingWrapper;
      break;
    case pages.PRIVATE_POOLS:
      Component = PrivatePools;
      WrapperComponent = LandingWrapper;
      break;
    case pages.TOKENSALE:
      Component = TokenSale;
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
      <Component currentLang={props.currentLang} routerParams={routerParams} />
    </WrapperComponent>
  );
}

export default connect(state => ({
  currentLang: state.default.currentLang,
  profile: state.default.profile,
  route: state.router.route,
  router: state.router
}))(Routes);
