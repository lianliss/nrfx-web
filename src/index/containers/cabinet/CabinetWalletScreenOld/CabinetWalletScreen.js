import "./CabinetWalletScreen.less";
//
import React from "react";
import { connect } from "react-redux";
//
import * as UI from "../../../../ui";
import router from "../../../../router";
import Show from "../../../components/hoc/ShowContent";
import PageContainer from "../../../components/cabinet/PageContainerOld/PageContainerOld";
import { ProfileSidebarItem } from "../../../components/cabinet/ProfileSidebar/ProfileSidebar";
import LoadingStatus from "../../../components/cabinet/LoadingStatus/LoadingStatus";
import WalletBox from "../../../components/cabinet/WalletBox/WalletBox";
import WalletBoxNew from "../../../components/cabinet/WalletBox/WalletBoxNew";
import CabinetBaseScreen from "../CabinetBaseScreen/CabinetBaseScreen";
import HistoryTable from "./components/HistoryTable/HistoryTable";
import WalletBalance from "../../../components/cabinet/WalletBalance/WalletBalance";
import Paging from "../../../components/cabinet/Paging/Paging";
import { ReactComponent as PlusCircleSvg } from "../../../../asset/24px/plus-circle.svg";
import { ReactComponent as HistorySvg } from "../../../../asset/24px/history.svg";
import { ReactComponent as SendSvg } from "../../../../asset/24px/send.svg";
import { ReactComponent as ReceiveSvg } from "../../../../asset/24px/receive.svg";
import * as actions from "../../../../actions";
import * as PAGES from "../../../constants/pages";
import * as walletsActions from "../../../../actions/cabinet/wallets";
import * as utils from "../../../../utils";
import { Helmet } from "react-helmet";
import COMPANY from "../../../constants/company";

class CabinetWalletScreen extends CabinetBaseScreen {
  load = (section = null) => {
    switch (section || this.props.routerParams.section) {
      default:
        this.props.loadWallets();
        break;
    }
  };

  get wallets() {
    return this.props.wallets.sort((a, b) =>
      a.currency < b.currency ? -1 : 1
    );
  }

  componentDidMount() {
    this.props.setTitle(utils.getLang("cabinet_header_wallets"));
    this.load();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>
            {[COMPANY.name, utils.getLang("cabinet_header_wallets", true)].join(
              " - "
            )}
          </title>
        </Helmet>
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
                    icon={require("../../../../asset/24px/receive.svg")}
                    onClick={() => {
                      actions.openModal("receive");
                    }}
                  >
                    {utils.getLang("cabinet_walletScreen_receive")}
                  </UI.FloatingButtonItem>,

                  <UI.FloatingButtonItem
                    icon={require("../../../../asset/24px/send.svg")}
                    onClick={() => {
                      actions.openModal("send", { currency: "btc" });
                    }}
                  >
                    {utils.getLang("site__contactSend")}
                  </UI.FloatingButtonItem>,

                  <UI.FloatingButtonItem
                    icon={require("../../../../asset/24px/history.svg")}
                    onClick={() => {
                      router.navigate(PAGES.CABINET_WALLET, {
                        section: "transfers"
                      });
                    }}
                  >
                    {utils.getLang("cabinet_walletScreen_transfers")}
                  </UI.FloatingButtonItem>,

                  !!walletsActions.getNoGeneratedCurrencies().length && (
                    <UI.FloatingButtonItem
                      icon={require("../../../../asset/24px/plus-circle.svg")}
                      onClick={() => {
                        actions.openModal("new_wallet");
                      }}
                    >
                      {utils.getLang("cabinet_walletBox_create")}
                    </UI.FloatingButtonItem>
                  )
                ]
              : [
                  !!walletsActions.getNoGeneratedCurrencies().length && (
                    <ProfileSidebarItem
                      onClick={() => {
                        actions.openModal("new_wallet");
                      }}
                      icon={<PlusCircleSvg />}
                      label={utils.getLang("cabinet_walletBox_create")}
                    />
                  ),
                  <ProfileSidebarItem
                    onClick={() => {
                      actions.openModal("receive");
                    }}
                    icon={<ReceiveSvg />}
                    label={utils.getLang("cabinet_walletScreen_receive")}
                  />,
                  <ProfileSidebarItem
                    onClick={() => {
                      actions.openModal("send", { currency: "btc" });
                    }}
                    icon={<SendSvg />}
                    label={utils.getLang("site__contactSend")}
                  />,
                  <ProfileSidebarItem
                    section="transfers"
                    icon={<HistorySvg />}
                    label={utils.getLang("cabinet_walletScreen_transfers")}
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
        </PageContainer>
        {this.props.adaptive && <div className="floatingButtonPadding"> </div>}
      </div>
    );
  }

  __renderRightContent = () => {
    return (
      <div>
        <WalletBalance
          title={utils.getLang("cabinet_walletBalance_name")}
          adaptive={this.props.adaptive}
          wallets={this.wallets}
        />
        <Show showIf={this.props.adaptive}>
          <div className="CabinetWalletScreen__height_padding"> </div>
        </Show>
      </div>
    );
  };

  __renderContent = () => {
    if (this.isLoading) {
      return (
        <LoadingStatus
          status={this.props.loadingStatus[this.section]}
          onRetry={() => this.load()}
        />
      );
    }

    switch (this.props.routerParams.section) {
      case "transfers": {
        return this.__getTransfersPageContent();
      }
      default: {
        return this.__getWalletsPageContent();
      }
    }
  };

  __getTransfersPageContent = () => {
    return (
      <div>
        {this.__renderTransfers()}
        <div className="CabinetWalletScreen__height_padding"> </div>
      </div>
    );
  };

  __getWalletsPageContent = () => {
    return (
      <div>
        {this.__renderWallets()}
        <div className="CabinetWalletScreen__transactions_padding">
          {this.__getTransactions()}
        </div>
      </div>
    );
  };

  __getTransactions = () => {
    return (
      <div>
        <Paging
          isCanMore={
            !!this.props.transactions.next &&
            !this.props.transactionsLoadingMore
          }
          onMore={this.props.loadMoreTransactions}
          moreButton={!!this.props.transactions.next}
          isLoading={this.props.transactionsLoadingMore}
        >
          <HistoryTable
            type="transaction"
            header={utils.getLang("global_transactions")}
            adaptive={this.props.adaptive}
            history={
              "items" in this.props.transactions
                ? this.props.transactions.items
                : []
            }
          />
        </Paging>
        <div className="CabinetWalletScreen__height_padding"> </div>
      </div>
    );
  };

  __renderTransfers = () => {
    return (
      <div>
        <Paging
          isCanMore={
            !!this.props.transfers.next && !this.props.transfersLoadingMore
          }
          onMore={this.props.loadMoreTransfers}
          moreButton={!!this.props.transfers.next}
          isLoading={this.props.transfersLoadingMore}
        >
          <HistoryTable
            type="transfer"
            header={utils.getLang("cabinet_walletScreen_transfers")}
            adaptive={this.props.adaptive}
            history={
              "items" in this.props.transfers ? this.props.transfers.items : []
            }
          />
        </Paging>
      </div>
    );
  };

  __renderWallets = () => {
    const rows = this.wallets.map(wallet => {
      return (
        <WalletBox
          key={wallet.id}
          {...wallet}
          onClick={() => {
            this.__walletSelect(wallet);
          }}
        />
      );
    });

    return (
      <div className="CabinetWalletScreen__wallets">
        {this.props.adaptive ? (
          <div className="CabinetWalletsScreen__walletsContentBox">{rows}</div>
        ) : (
          rows
        )}
        <Show showIf={walletsActions.getNoGeneratedCurrencies().length > 0}>
          <WalletBoxNew />
        </Show>
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
    adaptive: state.default.adaptive,
    translator: state.settings.translator,
    currencies: state.cabinet.currencies,
    currentLang: state.default.currentLang
  }),
  {
    setTitle: actions.setTitle,
    loadWallets: walletsActions.loadWallets,
    loadMoreTransactions: walletsActions.loadMoreTransactions,
    loadMoreTransfers: walletsActions.loadMoreTransfers
  }
)(CabinetWalletScreen);