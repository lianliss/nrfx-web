import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import DappContainer from '../../../components/cabinet/DappContainer/DappContainer';
import CabinetSidebar from 'src/index/components/dapp/CabinetSidebar/CabinetSidebar';
import TestnetOverlay from 'dapp/TestnetOverlay/TestnetOverlay';

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

// Utils
import * as PAGES from 'src/index/constants/pages';
import router from 'src/router';

export class DappCabinet extends Component {
  componentDidMount() {
    if (this.props.route.name === PAGES.DAPP) {
      router.navigate(PAGES.DAPP_EXCHANGE);
    }
  }

  render() {
    const { route, adaptive } = this.props;

    // Set page component
    let Component = Exchanger;
    let mainnetOnly = false;
    let testnetOnly = false;

    switch (route.name) {
      case PAGES.DAPP_WALLET:
        Component = CabinetWallets;
        mainnetOnly = true;
        break;
      case PAGES.DAPP_CURRENCY:
        Component = Currency;
        mainnetOnly = true;
        break;
      case PAGES.DAPP_EXCHANGE:
        Component = Exchanger;
        mainnetOnly = false;
        break;
      case PAGES.DAPP_TRANSACTION_HISTORY:
        Component = TransactionHistory;
        mainnetOnly = true;
        break;
      case PAGES.DAPP_SWAP:
      case PAGES.LIQUIDITY:
      case PAGES.TRANSACTIONS:
        Component = SwitchPage;
        mainnetOnly = true;
        break;
      case PAGES.FARMING:
        Component = Farming;
        testnetOnly = true;
        break;
      case PAGES.DAPP_VALIDATOR:
        Component = CabinetValidator;
        break;
      case PAGES.DAPP_REFERRAL:
      case PAGES.DAPP_REFERRAL_EXCHANGER:
      case PAGES.DAPP_REFERRAL_FARMING:
        Component = Referral;
        mainnetOnly = true;
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
        {testnetOnly && <TestnetOverlay testnetOnly networks={[97]} />}
        {mainnetOnly && <TestnetOverlay mainnetOnly networks={[56]} />}
      </DappContainer>
    );
  }
}

export default connect((state) => ({
  route: state.router.route,
  adaptive: state.default.adaptive,
}))(DappCabinet);
