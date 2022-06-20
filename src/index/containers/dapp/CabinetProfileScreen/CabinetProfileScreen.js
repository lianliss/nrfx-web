import "./CabinetProfileScreen.less";

import React from "react";
import { connect } from "react-redux";

import * as utils from "../../../../utils";
import PageContainer from "../../../components/cabinet/PageContainerOld/PageContainerOld";
import CabinetBaseScreen from "../CabinetBaseScreen/CabinetBaseScreen";
import LoadingStatus from "../../../components/cabinet/LoadingStatus/LoadingStatus";
import PartnersSection from "./components/PartnersSection";
import RightPartnersSection from "./components/RightPartnersSection";
import * as actions from "../../../../actions";
import * as walletsActions from "../../../../actions/cabinet/wallets";
import * as profileActions from "../../../../actions/cabinet/profile";
import COMPANY from "../../../constants/company";
import { Helmet } from "react-helmet";

class CabinetProfileScreen extends CabinetBaseScreen {
  load = (section = null) => {
    this.props.loadWallets();
    this.props.getPartner();
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
    this.props.setTitle(utils.getLang("cabinet_header_partners"));
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>
            {[COMPANY.name, utils.getLang("cabinet_header_profile")].join(
              " - "
            )}
          </title>
        </Helmet>
        <PageContainer leftContent={this.__renderRightContent()}>
          {this.__renderContent()}
          {this.props.adaptive && (
            <div className="floatingButtonPadding"> </div>
          )}
        </PageContainer>
      </div>
    );
  }

  get wallets() {
    return this.props.wallets.sort((a, b) =>
      a.currency < b.currency ? -1 : 1
    );
  }

  __renderRightContent = show => {
    if (this.isLoading || this.props.loadingStatus.partners) {
      return null;
    }

    return (
      <RightPartnersSection
        {...this.props.partner}
        adaptive={this.props.adaptive}
        wallets={this.props.partner.balances}
        rates={this.props.rates}
      />
    );
  };

  __renderContent = () => {
    if (this.isLoading || this.props.loadingStatus.partners) {
      return (
        <LoadingStatus
          status={this.loadingStatus || this.props.loadingStatus.partners}
          onRetry={() => this.load()}
        />
      );
    }

    return (
      <div>
        <PartnersSection />
      </div>
    );
  };
}

export default connect(
  state => ({
    ...state.wallets,
    ...state.profile,
    ...state.default,
    adaptive: state.default.adaptive,
    translator: state.settings.translator,
    currentLang: state.default.currentLang,
    rates: state.web3.rates,
  }),
  {
    setTitle: actions.setTitle,
    loadWallets: walletsActions.loadWallets,
    loadDashboard: profileActions.loadDashboard,
    getPartner: profileActions.getPartner
  }
)(CabinetProfileScreen);
