import "./CabinetFiatScreen.less";
//
import React from "react";
import { connect } from "react-redux";
//
import PageContainer from "../../../components/cabinet/PageContainer/PageContainer";
import LoadingStatus from "../../../components/cabinet/LoadingStatus/LoadingStatus";
import WalletBox from "../../../components/cabinet/WalletBox/WalletBox";
import CabinetBaseScreen from "../CabinetBaseScreen/CabinetBaseScreen";
import WalletBalance from "../../../components/cabinet/WalletBalance/WalletBalance";
import Paging from "../../../components/cabinet/Paging/Paging";
import * as utils from "../../../../utils";
import { setTitle } from "../../../../actions";
import FiatMarketForm from "./components/FiatMarketForm/FiatMarketForm";
import FiatHistoryTable from "./components/FiatHistoryTable/FiatHistoryTable";
import { openModal } from "../../../../actions";
import * as actions from "src/actions/cabinet/fiat";
import { Helmet } from "react-helmet";
import COMPANY from "../../../constants/company";
import RefillBlock from "./components/RefillBlock/RefillBlock";

class CabinetFiatScreen extends CabinetBaseScreen {
  load = () => {
    this.props.getFiatWallets();
  };

  componentDidMount() {
    setTitle(utils.getLang("cabinet_header_fiatWallets"));
    this.load();
  }

  render() {
    if (this.props.loadingStatus.default) {
      return <LoadingStatus status={this.props.loadingStatus.default} />;
    }

    const wallets = this.props.balances.map((balance, i) => (
      <WalletBox
        key={i}
        {...balance}
        isFiat
        onClick={() => this.__balanceSelect(balance)}
      />
    ));

    return (
      <div>
        <Helmet>
          <title>
            {[COMPANY.name, utils.getLang("cabinet_header_fiat", true)].join(
              " - "
            )}
          </title>
        </Helmet>
        <PageContainer leftContent={this.__renderRightContent()}>
          <div className="CabinetWalletScreen__wallets">
            {this.props.adaptive ? (
              <div className="CabinetWalletsScreen__walletsContentBox">
                {wallets}
              </div>
            ) : (
              wallets
            )}
          </div>
          {this.props.adaptive && (
            <>
              <FiatMarketForm />
              <div className="CabinetProfileScreen__height24" />
            </>
          )}
          <Paging
            isCanMore={
              !this.props.loadingStatus.history &&
              this.props.history.next !== null
            }
            onMore={this.props.getHistoryMore}
            moreButton={this.props.history.next !== null}
            isLoading={this.props.loadingStatus.history}
          >
            <FiatHistoryTable />
          </Paging>
        </PageContainer>
        {/*{this.props.adaptive && <div className="floatingButtonPadding"> </div>}*/}
      </div>
    );
  }

  __renderRightContent = () => {
    return (
      <div>
        <WalletBalance
          title={utils.getLang("cabinet_walletFiatBalance_name")}
          adaptive={this.props.adaptive}
          isFiat
          wallets={this.props.balances}
        />
        {this.props.reservedCard &&
          this.props.reservedCard.card.expire_in * 1000 > Date.now() && (
            <>
              <div className="CabinetProfileScreen__height24" />
              <RefillBlock />
            </>
          )}

        {!this.props.adaptive && (
          <>
            <div className="CabinetProfileScreen__height24" />
            <FiatMarketForm />
          </>
        )}
      </div>
    );
  };

  __balanceSelect = wallet => {
    openModal("wallet", null, { wallet });
  };
}

export default connect(
  store => ({
    ...store.fiat,
    adaptive: store.default.adaptive,
    translator: store.settings.translator
  }),
  {
    getHistoryMore: actions.getHistoryMore,
    getFiatWallets: actions.getFiatWallets
  }
)(CabinetFiatScreen);
