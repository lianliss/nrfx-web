import './CabinetProfileScreen.less';

import React from 'react';
import UI from '../../../../ui';

import * as storeUtils from "../../../storeUtils";
import * as utils from "../../../../utils";
import * as CLASSES from "../../../constants/classes";
import PageContainer from '../../../components/cabinet/PageContainer/PageContainer';
import {ProfileSidebarItem} from '../../../components/cabinet/ProfileSidebar/ProfileSidebar';
import CabinetBaseScreen from '../CabinetBaseScreen/CabinetBaseScreen';
import LoadingStatus from '../../../components/cabinet/LoadingStatus/LoadingStatus';
import WalletBox from '../../../components/cabinet/WalletBox/WalletBox';
import WalletBalance from '../../../components/cabinet/WalletBalance/WalletBalance';
import DashboardItem from './components/DashboardItem';
import ChartProfit from "../../../components/cabinet/ChartProfit/ChartProfit";
import router from "../../../../router";
import PartnersSection from './components/PartnersSection';
import RightPartnersSection from './components/RightPartnersSection';
import {ReactComponent as SettingsSvg} from '../../../../asset/24px/settings.svg';
import {ReactComponent as UsersSvg} from '../../../../asset/24px/users.svg';
import * as PAGES from '../../../constants/pages';

class CabinetProfileScreen extends CabinetBaseScreen {
  state = {
    walletSelected: null
  };

  load = (section = null) => {
    switch (section || this.props.routerParams.section) {
      case 'partners':
        this.props.loadWallets();
        this.props.getPartner();
        break;
      default:
        this.props.loadWallets();
        this.props.loadDashboard();
        break;
    }
  };

  componentDidMount() {
    this.__updateTitle();
    this.load();
  }

  componentDidUpdate(prevProps) {
    if (this.props.routerParams.section !== prevProps.routerParams.section) {
      this.__updateTitle();
    }
  }

  __updateTitle() {
    switch (this.props.routerParams.section) {
      case 'partners':
        this.props.setTitle(utils.getLang('cabinet_header_partners'));
        break;
      default:
        this.props.setTitle(utils.getLang('cabinet_header_profile'));
        break;
    }
  }

  render() {
    return (
      <div>
        <PageContainer
          leftContent={this.__renderRightContent()}
          sidebarOptions={this.__renderSideBarOptions()}
        >
          {this.__renderContent()}
          {this.props.adaptive && <div className="floatingButtonPadding"> </div>}
        </PageContainer>
      </div>
    )
  }

  __renderSideBarOptions() {
    if (this.props.adaptive) {
      return [
        <UI.FloatingButtonItem
          icon={require('../../../../asset/24px/settings.svg')}
          onClick={() => router.navigate('settings')}
        >
          {utils.getLang('cabinet_profileScreen_settings')}
        </UI.FloatingButtonItem>,
        <UI.FloatingButtonItem
          icon={require('../../../../asset/24px/users.svg')}
          onClick={() => router.navigate(PAGES.PROFILE, { section: 'partners' })}
        >
          {utils.getLang('cabinet_profileScreen_partners')}
        </UI.FloatingButtonItem>,
      ]
    } else {
      return [
        <ProfileSidebarItem
          onClick={() => router.navigate('settings')}
          icon={<SettingsSvg />}
          label={utils.getLang('cabinet_profileScreen_settings')}
        />,
        <ProfileSidebarItem
          icon={<UsersSvg />}
          section="partners"
          label={utils.getLang('cabinet_profileScreen_partners')}
        />
      ];
    }
  }

  get wallets() {
    return this.props.wallets.sort(
      (a, b) => a.currency < b.currency ? -1 : 1
    );
  }

  __renderRightContent = show => {
    if (this.isLoading) {
      return null;
    }

    switch (this.props.routerParams.section) {
      case 'partners': {
        return (
          <RightPartnersSection
            {...this.props.partner}
            adaptive={this.props.adaptive}
            wallets={this.props.partner.balances}
            walletSelected={this.state.walletSelected}
          />
        )
      }
      default: {
        if (!(this.props.adaptive && !show) && !this.props.routerParams.section && !this.isLoading && this.props.dashboard.hasOwnProperty('chart')) {
          return <div>
            <div>
              <WalletBalance
                title={utils.getLang('cabinet_walletBalance_name')}
                adaptive={this.props.adaptive}
                wallets={this.wallets}
                walletSelected={this.state.walletSelected}
              />
            </div>
            <div className="CabinetProfileScreen__height24">
            </div>
            {this.__renderChartProfit()}
          </div>
        } else {
          return '';
        }
      }
    }
  };

  __renderChartProfit = () => {
    if (this.props.adaptive || !this.props.dashboard.hasOwnProperty('chart')) {
      return '';
    }
    return <div>
      <ChartProfit
        chart={this.props.dashboard.chart}
      />
    </div>
  };

  __renderContent = () => {
    if (this.isLoading) {
      return <LoadingStatus status={this.loadingStatus} onRetry={() => this.load()} />;
    }

    switch (this.props.routerParams.section) {
      case 'partners': {
        return <div>
          <PartnersSection />
        </div>
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
          {this.__renderRightContent(true)}
          {this.__renderWallets()}
          {this.__renderDashboard()}
        </div>
      )
    }
    return <div>
      {this.__renderWallets()}
      <div className="CabinetProfileScreen__height_padding"> </div>
      {this.__renderDashboard()}
    </div>
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
    return <div className="CabinetProfileScreen__wallets">
      {this.props.adaptive ? <div className="CabinetProfileScreen__walletsContentBox">
        {rows}
      </div> : rows}
    </div>
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
          <div className="fakeItem"> </div>
        </div>
      </div>
    )
  };

  __walletSelect = wallet => this.setState({
    walletSelected: wallet === this.state.walletSelected ? null : wallet
  });
}

export default storeUtils.getWithState(
  CLASSES.CABINET_PFOFILE_SCREEN,
  CabinetProfileScreen
);