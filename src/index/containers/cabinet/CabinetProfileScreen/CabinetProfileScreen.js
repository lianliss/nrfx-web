import "./CabinetProfileScreen.less";

import React from "react";
import { connect } from "react-redux";
import * as UI from "../../../../ui";

import * as utils from "../../../../utils";
import PageContainer from "../../../components/cabinet/PageContainer/PageContainer";
import { ProfileSidebarItem } from "../../../components/cabinet/ProfileSidebar/ProfileSidebar";
import CabinetBaseScreen from "../CabinetBaseScreen/CabinetBaseScreen";
import LoadingStatus from "../../../components/cabinet/LoadingStatus/LoadingStatus";
import WalletBox from "../../../components/cabinet/WalletBox/WalletBox";
import WalletBalance from "../../../components/cabinet/WalletBalance/WalletBalance";
import DashboardItem from "./components/DashboardItem/DashboardItem";
import ChartProfit from "../../../components/cabinet/ChartProfit/ChartProfit";
import router from "../../../../router";
import PartnersSection from "./components/PartnersSection";
import RightPartnersSection from "./components/RightPartnersSection";
import { ReactComponent as SettingsSvg } from "../../../../asset/24px/settings.svg";
import { ReactComponent as UsersSvg } from "../../../../asset/24px/users.svg";
import * as PAGES from "../../../constants/pages";
import * as actions from "../../../../actions";
import * as walletsActions from "../../../../actions/cabinet/wallets";
import * as profileActions from "../../../../actions/cabinet/profile";

class CabinetProfileScreen extends CabinetBaseScreen {
  load = (section = null) => {
    switch (section || this.props.routerParams.section) {
      case "partners":
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
      case "partners":
        this.props.setTitle(utils.getLang("cabinet_header_partners"));
        break;
      default:
        this.props.setTitle(utils.getLang("cabinet_header_profile"));
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
          {this.props.adaptive && (
            <div className="floatingButtonPadding"> </div>
          )}
        </PageContainer>
      </div>
    );
  }

  __renderSideBarOptions() {
    if (this.props.adaptive) {
      return [
        <UI.FloatingButtonItem
          icon={require("../../../../asset/24px/settings.svg")}
          onClick={() => router.navigate("settings")}
        >
          {utils.getLang("cabinet_profileScreen_settings")}
        </UI.FloatingButtonItem>,
        <UI.FloatingButtonItem
          icon={require("../../../../asset/24px/users.svg")}
          onClick={() =>
            router.navigate(PAGES.DASHBOARD, { section: "partners" })
          }
        >
          {utils.getLang("cabinet_profileScreen_partners")}
        </UI.FloatingButtonItem>
      ];
    } else {
      return [
        <ProfileSidebarItem
          onClick={() => router.navigate("settings")}
          icon={<SettingsSvg />}
          label={utils.getLang("cabinet_profileScreen_settings")}
        />,
        <ProfileSidebarItem
          icon={<UsersSvg />}
          section="partners"
          label={utils.getLang("cabinet_profileScreen_partners")}
        />
      ];
    }
  }

  get wallets() {
    return this.props.wallets.sort((a, b) =>
      a.currency < b.currency ? -1 : 1
    );
  }

  __renderRightContent = show => {
    if (this.isLoading) {
      return null;
    }

    switch (this.props.routerParams.section) {
      case "partners": {
        return (
          <RightPartnersSection
            {...this.props.partner}
            adaptive={this.props.adaptive}
            wallets={this.props.partner.balances}
          />
        );
      }
      default: {
        if (
          !(this.props.adaptive && !show) &&
          !this.props.routerParams.section &&
          !this.isLoading &&
          this.props.dashboard.hasOwnProperty("chart")
        ) {
          return (
            <div>
              <div>
                <WalletBalance
                  title={utils.getLang("cabinet_walletBalance_name")}
                  adaptive={this.props.adaptive}
                  wallets={this.wallets}
                />
              </div>
              <div className="CabinetProfileScreen__height24"></div>
              {this.__renderChartProfit()}
            </div>
          );
        } else {
          return "";
        }
      }
    }
  };

  __renderChartProfit = () => {
    if (this.props.adaptive || !this.props.dashboard.hasOwnProperty("chart")) {
      return "";
    }
    return (
      <div>
        <ChartProfit chart={this.props.dashboard.chart} />
      </div>
    );
  };

  __renderContent = () => {
    if (this.isLoading) {
      return (
        <LoadingStatus
          status={this.loadingStatus}
          onRetry={() => this.load()}
        />
      );
    }

    switch (this.props.routerParams.section) {
      case "partners": {
        return (
          <div>
            <PartnersSection />
          </div>
        );
      }
      case "customers": {
        return "customers";
      }
      default: {
        return this.__getProfilePageContent();
      }
    }
  };

  __getProfilePageContent = () => {
    if (
      this.props.adaptive &&
      !this.props.routerParams.section &&
      !this.isLoading
    ) {
      return (
        <div>
          {this.__renderRightContent(true)}
          {this.__renderWallets()}
          <DashboardItem type="currency" />
          {this.__renderDashboard()}
        </div>
      );
    }
    return (
      <div>
        {this.__renderWallets()}
        {this.__renderDashboard()}
      </div>
    );
  };

  __renderWallets = () => {
    if (!this.wallets.length) {
      return null;
    }

    const rows = this.wallets.map((wallet, i) => {
      return (
        <WalletBox
          key={i}
          {...wallet}
          onClick={() => {
            this.__walletSelect(wallet);
          }}
        />
      );
    });
    return (
      <div className="CabinetProfileScreen__wallets">
        {this.props.adaptive ? (
          <div className="CabinetProfileScreen__walletsContentBox">{rows}</div>
        ) : (
          rows
        )}
      </div>
    );
  };

  __renderDashboard = () => {
    if (Object.keys(this.props.dashboard).length < 1) return;
    const rows = this.props.dashboard.stats.map((dashboardItem, i) => {
      return <DashboardItem key={i} {...dashboardItem} />;
    });
    return (
      <div className="CabinetProfileScreen__dashboard">
        <div className="CabinetProfileScreen__dashboard__wrapper">
          {!this.props.adaptive && <DashboardItem type="currency" />}
          <DashboardItem type="exchange" />
          {rows}
        </div>
      </div>
    );
  };

  __walletSelect = wallet => {
    actions.openModal("wallet", null, { wallet });
  };
}

export default connect(
  state => ({
    ...state.wallets,
    ...state.profile,
    ...state.default,
    adaptive: state.default.adaptive,
    translator: state.settings.translator,
    currentLang: state.default.currentLang
  }),
  {
    setTitle: actions.setTitle,
    loadWallets: walletsActions.loadWallets,
    loadDashboard: profileActions.loadDashboard,
    getPartner: profileActions.getPartner
  }
)(CabinetProfileScreen);
