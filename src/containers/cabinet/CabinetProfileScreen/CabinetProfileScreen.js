import './CabinetProfileScreen.less';

import React from 'react';

import PageContainer from '../../../components/cabinet/PageContainer/PageContainer';
import {ProfileSidebarItem} from '../../../components/cabinet/ProfileSidebar/ProfileSidebar';
import CabinetBaseScreen from '../CabinetBaseScreen/CabinetBaseScreen';
import LoadingStatus from '../../../components/cabinet/LoadingStatus/LoadingStatus';

import WalletBox from '../../../components/cabinet/WalletBox/WalletBox';
import * as pages from '../../../constants/pages';
import * as storeUtils from "../../../storeUtils";
import * as CLASSES from "../../../constants/classes";
import WalletBalance from '../../../components/cabinet/WalletBalance/WalletBalance';
import DashboardItem from './components/dashboardItem';
import * as modalGroupActions from "../../../actions/modalGroup";

class CabinetProfileScreen extends CabinetBaseScreen {
  state = {
    walletSelected: null
  };

  load = (section = null) => {
    switch (section || this.props.routerParams.section) {
      default:
        this.props.loadWallets();
        this.props.loadDashboard();
        break;
    }
  };

  render() {
    if (this.isLoading) {
      return <LoadingStatus status={this.props.loadingStatus[this.section]} onRetry={() => this.__load()} />;
    }

    return (
      <div>
        <PageContainer
          leftContent={!this.props.routerParams.section && !this.isLoading && this.__renderRightContent()}
          sidebarOptions={this.props.sidebarOptions}
        >
          {this.__renderContent()}
        </PageContainer>
      </div>
    )
  }

  __renderRightContent = () => {
    return <WalletBalance wallets={this.props.wallets} walletSelected={this.state.walletSelected} />;
  };

  __renderContent = () => {
    if (this.isLoading) {
      return <LoadingStatus status={this.props.loadingStatus[this.section]} onRetry={() => this.load()} />;
    }

    switch (this.props.routerParams.section) {
      case 'partners': {
        return 'partners';
      }
      case 'customers': {
        return 'customers';
      }
      default: {
        return this.__getProfilePageContent();
      }
    }
  };

  __getProfilePageContent = () => {
    return (
      <div>
        {this.__renderWallets()}
        <div className="CabinetProfileScreen__height_padding"> </div>
        {this.__renderDashboard()}
      </div>
    )
  };

  __renderWallets = () => {
    const rows = this.props.wallets.map((wallet, i) => {
      return <WalletBox
        key={i}
        {...wallet}
        onClick={() => {this.__walletSelect(wallet)}}
        walletSelected={this.state.walletSelected}
      />
    });
    return (
      <div className="CabinetProfileScreen__wallets">
        {rows}
      </div>
    )
  };

  __renderDashboard = () => {
    if (this.props.dashboard.length < 1) return;
    const rows = this.props.dashboard.stats.map((dashboardItem, i) => {
      return <DashboardItem
        key={i}
        {...dashboardItem}
      />
    });
    return (
      <div className="CabinetProfileScreen__dashboard">
        {rows}
      </div>
    )
  };

  __walletSelect = (wallet) => {
    let walletSelected = wallet;
    if (wallet === this.state.walletSelected) {
      walletSelected = null;
    }

    this.setState({walletSelected});
  };
}

export const sidebarOptions = {
  items: [
    <ProfileSidebarItem
      icon={require('../../../asset/24px/settings.svg')}
      label="Settings"
    />
  ]
  // <ProfileSidebarItem icon={require('../../../asset/24px/id-badge.svg')} label="Customers" />,
  // <ProfileSidebarItem icon={require('../../../asset/24px/user.svg')} label="Partners" />
};

export default storeUtils.getWithState(
  CLASSES.CABINET_PFOFILE_SCREEN,
  CabinetProfileScreen
);