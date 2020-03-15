import React from "react";
import { connect } from "react-redux";

import CabinetBaseScreen from "../../../CabinetBaseScreen/CabinetBaseScreen";

import * as UI from "../../../../../../ui";
import PageContainer from "../../../../../components/cabinet/PageContainer/PageContainer";
import { ProfileSidebarItem } from "../../../../../components/cabinet/ProfileSidebar/ProfileSidebar";

import { ReactComponent as PlusCircleSvg } from "../../../../../../asset/24px/plus-circle.svg";
import * as actions from "../../../../../../actions";
import * as traderActions from "../../../../../../actions/cabinet/trader";
import BotsTable from "../../components/BotsTable/BotsTable";
import LoadingStatus from "../../../../../components/cabinet/LoadingStatus/LoadingStatus";

class Index extends CabinetBaseScreen {
  load() {
    this.props.loadBots();
  }

  render() {
    if (this.isLoading) {
      return (
        <LoadingStatus
          status={this.loadingStatus}
          onRetry={() => this.load()}
        />
      );
    }

    return (
      <PageContainer
        leftContent={this.__renderRightContent()}
        sidebarOptions={[
          <ProfileSidebarItem
            onClick={() => actions.openModal("trader_new_bot")}
            icon={<PlusCircleSvg />}
            label={"Create Bot"}
          />
        ]}
      >
        {this.__renderContent()}
      </PageContainer>
    );
  }

  __renderContent() {
    return <BotsTable bots={this.props.bots} />;
  }
  __renderRightContent() {
    return (
      <UI.ContentBox>
        <h2>Profit</h2>
      </UI.ContentBox>
    );
  }
}

export default connect(
  state => ({
    ...state.trader
  }),
  {
    loadBots: traderActions.loadBots
  }
)(Index);
