import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import PageContainer from '../../../components/cabinet/PageContainer/PageContainer';
import CabinetSidebar from 'src/index/components/cabinet/CabinetSidebar/CabinetSidebar';

// Pages
import Farming from './components/Farming/Farming';
import SwitchPage from './components/SwitchPage/SwitchPage';
import CabinetValidator from '../../../components/cabinet/CabinetValidator/CabinetValidator';
import CabinetWallets from '../../../components/cabinet/CabinetWallets/CabinetWallets';

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
      <PageContainer
        className="CabinetWalletScreen"
        sideBar={<CabinetSidebar />}
      >
        <Component route={route.name} adaptive={adaptive} />
      </PageContainer>
    );
  }
}

export default connect((state) => ({
  route: state.router.route,
  adaptive: state.default.adaptive,
}))(DappCabinet);
