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

// Utils
import * as PAGES from 'src/index/constants/pages';

export class DappCabinet extends Component {
  render() {
    const { route, adaptive } = this.props;

    // Set page component
    let Component = CabinetWallets;

    switch (route.name) {
      case PAGES.WALLET:
        Component = CabinetWallets;
        break;
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
      default:
        Component = CabinetWallets;
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
