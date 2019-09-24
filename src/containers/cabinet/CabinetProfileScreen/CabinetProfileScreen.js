import './CabinetProfileScreen.less';

import React from 'react';

import PageContainer from '../../../components/cabinet/PageContainer/PageContainer';
import {ProfileSidebarItem} from '../../../components/cabinet/ProfileSidebar/ProfileSidebar';
import CabinetBaseScreen from '../CabinetBaseScreen/CabinetBaseScreen';
import LoadingStatus from '../../../components/cabinet/LoadingStatus/LoadingStatus';

import WalletBox from '../../../components/cabinet/WalletBox/WalletBox';
import * as storeUtils from "../../../storeUtils";
import * as CLASSES from "../../../constants/classes";
import WalletBalance from '../../../components/cabinet/WalletBalance/WalletBalance';
import DashboardItem from './components/DashboardItem';
import * as utils from "../../../utils";
import ChartProfit from "../../../components/cabinet/ChartProfit/ChartProfit";
import { classNames } from '../../../utils';
import router from "../../../router";

import { ReactComponent as SettingsSvg } from '../../../asset/24px/settings.svg';

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

  componentDidMount() {
    this.props.setTitle(utils.getLang("cabinet_header_profile"));
    this.load();
  }

  render() {
    if (this.isLoading) {
      return <LoadingStatus status={this.props.loadingStatus[this.section]} onRetry={() => this.__load()} />;
    }

    return (
      <div>
        <PageContainer
          leftContent={!this.props.adaptive && !this.props.routerParams.section && !this.isLoading && this.__renderRightContent()}
          sidebarOptions={!this.props.adaptive && [
            <ProfileSidebarItem
              onClick={() => {router.navigate('settings')}}
              icon={<SettingsSvg />}
              label={utils.getLang('cabinet_profileScreen_settings')}
            />
            // <ProfileSidebarItem icon={require('../../../asset/24px/id-badge.svg')} label="Customers" />,
            // <ProfileSidebarItem icon={require('../../../asset/24px/user.svg')} label="Partners" />
          ]}
        >
          {this.__renderContent()}
        </PageContainer>
      </div>
    )
  }

  get wallets() {
    return this.props.wallets.sort((a, b) => {
      return (a.currency < b.currency) ? -1 : 1;
    });
  }

  __renderRightContent = () => {
    if (!this.props.dashboard.hasOwnProperty('chart')) {
      return '';
    }

    return <div>
      <div>
        <WalletBalance adaptive={this.props.adaptive} wallets={this.wallets} walletSelected={this.state.walletSelected} />
      </div>
      <div className="CabinetProfileScreen__height24">
      </div>
      {this.__renderChartProfit()}
    </div>
  };

  __renderChartProfit = () => {
    if (this.props.adaptive || !this.props.dashboard.hasOwnProperty('chart')) {
      return '';
    }
    return <div>
      <ChartProfit chart={this.props.dashboard.chart} />
    </div>
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
    if (this.props.adaptive && !this.props.routerParams.section && !this.isLoading) {
      return (
        <div>
          {this.__renderRightContent()}
          {this.__renderWallets()}
          {this.__renderDashboard()}
        </div>
      )
    }
    return (
      <div>
        {this.__renderWallets()}
        <div className="CabinetProfileScreen__height_padding"> </div>
        {this.__renderDashboard()}
      </div>
    )
  };

  __renderWallets = () => {
    const rows = this.wallets.map((wallet, i) => {
      return <WalletBox
        key={i}
        {...wallet}
        onClick={() => {this.__walletSelect(wallet)}}
        walletSelected={this.state.walletSelected}
      />
    });
    return (
      <div className="CabinetProfileScreen__wallets">
        {this.props.adaptive ? <div className="CabinetProfileScreen__walletsContentBox">
          {rows}
        </div> : rows}
      </div>
    )
  };

  __renderDashboard = () => {
    if (Object.keys(this.props.dashboard).length < 1) return;
    const rows = this.props.dashboard.stats.map((dashboardItem, i) => {
      return <DashboardItem
        key={i}
        {...dashboardItem}
      />
    });
    return (
      <div className="CabinetProfileScreen__dashboard">
        <div className="CabinetProfileScreen__dashboard__wrapper">
          {rows}
          <DashboardItem
            key={3}
            type="commerce"
          />
          <div className="fakeItem">
          </div>
        </div>
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

export default storeUtils.getWithState(
  CLASSES.CABINET_PFOFILE_SCREEN,
  CabinetProfileScreen
);