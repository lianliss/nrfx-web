import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import DappContainer from '../../../components/cabinet/DappContainer/DappContainer';
import CabinetSidebar from 'src/index/components/dapp/CabinetSidebar/CabinetSidebar';

// Pages
import Farming from 'src/index/components/dapp/Farming/Farming';
import SwitchPage from 'src/index/components/dapp/SwitchPage/SwitchPage';
import Exchanger from 'src/index/components/dapp/Exchanger/Exchanger';
import CabinetValidator from 'src/index/components/dapp/CabinetValidator/CabinetValidator';
import CabinetWallets from 'src/index/components/dapp/CabinetWallets/CabinetWallets';
import Currency from 'src/index/components/dapp/Currency/Currency';
import Referral from 'src/index/components/dapp/Referral/Referral';
import SocialMedia from 'src/index/components/dapp/SocialMedia/SocialMedia';
import Team from '../../../components/dapp/Team/Team';

// Utils
import * as PAGES from 'src/index/constants/pages';
import router from 'src/router';

export class DappCabinet extends Component {
  componentDidMount() {
    if(this.props.route.name === PAGES.DAPP) {
      router.navigate(PAGES.DAPP_EXCHANGE);
    }
  }
  
  render() {
    const { route, adaptive } = this.props;

    // Set page component
    let Component = Exchanger;

    switch (route.name) {
      // case PAGES.DAPP_WALLET:
      //   Component = CabinetWallets;
      //   break;
      // case PAGES.DAPP_CURRENCY:
      //   Component = Currency;
      //   break;
      case PAGES.DAPP_EXCHANGE:
        Component = Exchanger;
        break;
      case PAGES.DAPP_SWAP:
      case PAGES.LIQUIDITY:
      case PAGES.TRANSACTIONS:
        Component = SwitchPage;
        break;
      case PAGES.FARMING:
        Component = Farming;
        break;
      case PAGES.VALIDATOR:
        Component = CabinetValidator;
        break;
      case PAGES.DAPP_REFERRAL:
      case PAGES.DAPP_REFERRAL_EXCHANGER:
      case PAGES.DAPP_REFERRAL_FARMING:
        Component = Referral;
        break;
      case PAGES.DAPP_SOCIAL_MEDIA:
        Component = SocialMedia;
        break;
      case PAGES.DAPP_TEAM:
        Component = Team;
        break;
      default:
        Component = Exchanger;
    }
    // ------

    return (
      <DappContainer
        className="CabinetWalletScreen"
        sideBar={<CabinetSidebar />}
      >
        <Component route={route.name} adaptive={adaptive} />
      </DappContainer>
    );
  }
}

export default connect((state) => ({
  route: state.router.route,
  adaptive: state.default.adaptive,
}))(DappCabinet);
