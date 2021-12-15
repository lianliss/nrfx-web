import "./CabinetInvestmentsScreen.less";
//
import React from "react";
import { connect } from "react-redux";
//
import * as UI from "../../../../ui";
import router from "../../../../router";
import PageContainer from "../../../components/cabinet/PageContainerOld/PageContainerOld";
import Balances from "./components/Balances";
import WithdrawaHistorylTable from "./components/WithdrawaHistorylTable";
import ProfitHistorylTable from "./components/ProfitHistorylTable";
import DepositTable from "./components/DepositTable";
import CurrentPayments from "./components/CurrentPayments";
import AllPayments from "./components/AllPayments";
import { ProfileSidebarItem } from "../../../components/cabinet/ProfileSidebar/ProfileSidebar";
import ChartProfit from "../../../components/cabinet/ChartProfit/ChartProfit";
import LoadingStatus from "../../../components/cabinet/LoadingStatus/LoadingStatus";
import Paging from "../../../components/cabinet/Paging/Paging";
import InvestSvg from "../../../../asset/24px/invest.svg";
import SendSvg from "../../../../asset/24px/send.svg";
import CalcSvg from "../../../../asset/24px/calc.svg";
import * as PAGES from "../../../constants/pages";
import * as actions from "../../../../actions";
import * as utils from "../../../../utils";
import Show from "../../../components/hoc/ShowContent";
import * as investmentsActions from "../../../../actions/cabinet/investments";
import { Helmet } from "react-helmet";
import COMPANY from "../../../constants/company";

class CabinetInvestmentsScreen extends React.PureComponent {
  get section() {
    return this.props.routerParams.section || "default";
  }

  get isLoading() {
    return !!this.props.loadingStatus[this.section];
  }

  componentDidMount() {
    this.__load();
    this.props.setTitle(utils.getLang("site__headerInvestment"));
  }

  componentWillUpdate(nextProps) {
    if (nextProps.routerParams.section !== this.props.routerParams.section) {
      this.__load(nextProps.routerParams.section || "default");
    }
  }

  __load = (section = null) => {
    switch (section || this.props.routerParams.section) {
      case "profits":
        this.props.loadProfitHistory();
        break;
      case "withdrawals":
        this.props.loadWithdrawalHistory();
        break;
      default:
        this.props.loadInvestments();
        break;
    }
  };

  render() {
    return (
      <>
        <Helmet>
          <title>
            {[
              COMPANY.name,
              utils.getLang("cabinet_header_investments", true)
            ].join(" - ")}
          </title>
        </Helmet>
        <div>
          <PageContainer
            leftContent={
              !this.props.adaptive &&
              !this.props.routerParams.section &&
              !this.isLoading &&
              this.__renderRightContent()
            }
            sidebarOptions={
              this.props.adaptive
                ? [
                    <UI.FloatingButtonItem
                      icon={require("../../../../asset/24px/invest.svg")}
                      onClick={() => {
                        router.navigate(PAGES.INVESTMENTS, {
                          section: "profits"
                        });
                      }}
                    >
                      {utils.getLang("cabinet_investmentsProfit")}
                    </UI.FloatingButtonItem>,
                    <UI.FloatingButtonItem
                      onClick={() => {
                        router.navigate(PAGES.INVESTMENTS, {
                          section: "withdrawals"
                        });
                      }}
                      icon={require("../../../../asset/24px/send.svg")}
                    >
                      {utils.getLang("cabinet_investmentsScreen_withdrawals")}
                    </UI.FloatingButtonItem>,
                    <UI.FloatingButtonItem
                      onClick={() => {
                        actions.openModal("calc_deposit");
                      }}
                      icon={require("../../../../asset/24px/calc.svg")}
                    >
                      {utils.getLang("cabinet_calculate")}
                    </UI.FloatingButtonItem>
                  ]
                : [
                    <ProfileSidebarItem
                      section="profits"
                      icon={<InvestSvg />}
                      label={utils.getLang("cabinet_investmentsProfit")}
                    />,
                    <ProfileSidebarItem
                      section="withdrawals"
                      icon={<SendSvg />}
                      label={utils.getLang(
                        "cabinet_investmentsScreen_withdrawals"
                      )}
                    />,
                    <ProfileSidebarItem
                      onClick={() => {
                        actions.openModal("calc_deposit");
                      }}
                      icon={<CalcSvg />}
                      label={utils.getLang("cabinet_calculate")}
                    />
                  ]
            }
          >
            <Show
              showIf={
                this.props.adaptive &&
                !this.props.routerParams.section &&
                !this.isLoading
              }
            >
              {this.__renderRightContent()}
            </Show>
            {this.__renderContent()}
            <Show showIf={this.props.adaptive}>
              <div className="Investment__heightPadding"> </div>
            </Show>
          </PageContainer>
        </div>
        {this.props.adaptive && <div className="floatingButtonPadding"> </div>}
      </>
    );
  }

  __renderContent() {
    if (this.isLoading) {
      return (
        <LoadingStatus
          status={this.props.loadingStatus[this.section]}
          onRetry={() => this.__load()}
        />
      );
    }

    switch (this.props.routerParams.section) {
      case "profits": {
        return this.__renderProfitHistory();
      }
      case "withdrawals": {
        return this.__renderWithdrawalHistory();
      }
      default: {
        return this.__renderMainContent();
      }
    }
  }

  __renderMainContent() {
    return (
      <div>
        {this.__renderBalances()}
        <DepositTable
          deposits={this.props.deposits}
          adaptive={this.props.adaptive}
        />
      </div>
    );
  }

  __renderProfitHistory() {
    const { profits, profitsTotal } = this.props;

    return (
      <div>
        <Paging
          isCanMore={
            !!profits.next &&
            !(this.props.loadingStatus.profitsAppend === "loading")
          }
          onMore={this.props.loadMoreProfitHistory}
          moreButton={!!profits.next}
          isLoading={this.props.loadingStatus.profitsAppend === "loading"}
        >
          <ProfitHistorylTable
            adaptive={this.props.adaptive}
            profits={profits}
            total={profitsTotal}
          />
        </Paging>
      </div>
    );
  }

  __renderWithdrawalHistory() {
    const { withdrawals, withdrawalsTotalCount } = this.props;
    return (
      <div>
        <Paging
          isCanMore={!!withdrawals.next && !withdrawals.isLoadingMore}
          onMore={this.props.loadMoreWithdrawalHistory}
          moreButton={!!withdrawals.next}
          isLoading={withdrawals.isLoadingMore}
        >
          <WithdrawaHistorylTable
            adaptive={this.props.adaptive}
            withdrawals={withdrawals}
            withdrawalsTotalCount={withdrawalsTotalCount}
          />
        </Paging>
      </div>
    );
  }

  __renderRightContent = () => {
    if (!this.props.chart.hasOwnProperty("data")) {
      return <LoadingStatus status="loading" />;
    }

    return (
      <>
        <ChartProfit chart={this.props.chart} adaptive={this.props.adaptive} />
        {this.__renderCurrentPayments()}
        {this.__renderAllPayments()}
      </>
    );
  };

  __renderBalances() {
    return (
      <Show showIf={this.props.balances.length > 0}>
        <div className="Investments__balances">
          <Balances data={this.props.balances} />
        </div>
      </Show>
    );
  }

  __renderAllPayments = () => {
    if (!this.props.payments.length) {
      return null;
    }

    const notEmptyPayments = this.props.payments.filter(
      item => item.available || item.invested_amount || item.profit
    );

    return (
      <Show showIf={notEmptyPayments.length > 0}>
        <AllPayments
          payments={notEmptyPayments}
          adaptive={this.props.adaptive}
        />
      </Show>
    );
  };

  __renderCurrentPayments = () => {
    if (!this.props.payments.length) {
      return null;
    }

    const notEmptyPayments = this.props.payments.filter(
      item => item.available || item.invested_amount || item.profit
    );

    return (
      <Show showIf={notEmptyPayments.length > 0}>
        <div className="Investment__heightPadding"> </div>
        <div className="Investments__payments">
          <CurrentPayments
            payments={notEmptyPayments}
            adaptive={this.props.adaptive}
          />
        </div>
      </Show>
    );
  };
}

export default connect(
  state => ({
    ...state.investments,
    adaptive: state.default.adaptive,
    translator: state.settings.translator,
    currentLang: state.default.currentLang
  }),
  {
    setTitle: actions.setTitle,
    loadInvestments: investmentsActions.loadInvestments,
    loadProfitHistory: investmentsActions.loadProfitHistory,
    loadWithdrawalHistory: investmentsActions.loadWithdrawalHistory,
    loadMoreWithdrawalHistory: investmentsActions.loadMoreWithdrawalHistory,
    loadMoreProfitHistory: investmentsActions.loadMoreProfitHistory
  }
)(CabinetInvestmentsScreen);
