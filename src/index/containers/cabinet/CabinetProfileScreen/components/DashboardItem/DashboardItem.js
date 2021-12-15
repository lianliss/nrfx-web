import "./DashboardItem.less";
import React from "react";
import * as utils from "../../../../../../utils";
import * as UI from "../../../../../../ui";
import router from "../../../../../../router";

import InvestSvg from "../../../../../../asset/24px/invest.svg";
import FiatPlusSvg from "../../../../../../asset/24px/fiat-plus.svg";
import ShoppingCartSvg from "../../../../../../asset/24px/shopping-cart.svg";

import TradeSvg from "../../../../../../asset/120/trade.svg";
import InviteSvg from "../../../../../../asset/120/invite.svg";
import { classNames as cn } from "../../../../../../utils";
import * as pages from "../../../../../constants/pages";
import InlineSVG from "react-inlinesvg";
import * as actions from "../../../../../../actions";

class DashboardItem extends React.Component {
  state = {
    invert: true
  };

  render() {
    const { props } = this;

    switch (props.type) {
      case "partners":
        this.icon = <InvestSvg />;
        this.show = false;
        this.content = {
          firstHeaderLeftContext: utils.getLang("cabinet_profileScreen_income"),
          firstMainContext: utils.formatDouble(props.profit.btc),
          firstMainContextInvert: utils.formatDouble(props.profit.usd, 2),
          secondHeaderLeftContext: utils.getLang("cabinet_profileScreen_count"),
          secondMainContext: props.count,
          secondMainContextInvert: props.count,
          emptyIcon: <InviteSvg />,
          emptyDescription: utils.getLang("global_inviteDescription")
        };
        this.button = {
          children: utils.getLang("global_invite"),
          onClick: () =>
            router.navigate(pages.PARTNERS, { section: "partners" })
        };
        if (props.count > 0) {
          this.show = true;
        }
        break;
      case "exchange":
        this.show = false;
        this.icon = <ShoppingCartSvg />;
        this.content = {
          label: "new",
          firstHeaderLeftContext: utils.getLang(
            "cabinet_profileScreen_revenue"
          ),
          firstMainContext: "0",
          firstMainContextInvert: "0",
          secondHeaderLeftContext: "",
          secondMainContext: "",
          secondMainContextInvert: "",
          emptyIcon: <TradeSvg />,
          emptyDescription: (
            <span>{utils.getLang("cabinet_profileScreen_exchangeCard")}</span>
          )
        };
        this.button = {
          children: utils.getLang("global_trade"),
          onClick: () => router.navigate(pages.EXCHANGE)
        };
        break;
      case "currency":
        return (
          <UI.ContentBox className={cn("DashboardItem", this.props.type)}>
            <div className="DashboardItem__label new">New</div>
            <div className="DashboardItem__content_header">
              <div className="DashboardItem__icon">
                <FiatPlusSvg />
              </div>
              <div className="DashboardItem__headerText">
                {utils.getLang("cabinet_profileScreenCurrency")}
              </div>
            </div>
            <ol className="DashboardItem__list">
              <li>{utils.getLang("cabinet_profileScreenCurrencyText1")}</li>
              <li>{utils.getLang("cabinet_profileScreenCurrencyText2")}</li>
            </ol>
            <div className="DashboardItem__buttonAction">
              <UI.Button
                type="secondary"
                onClick={() => router.navigate(pages.FIAT)}
                size="middle"
              >
                {utils.getLang("global_buy")}
              </UI.Button>
            </div>
          </UI.ContentBox>
        );
      case "token": {
        this.show = false;
        this.content = {
          label: "hot",
          emptyIcon: (
            <InlineSVG src={require("src/asset/token/dashboard.svg")} />
          )
        };
        this.button = {
          type: "normal",
          children: utils.getLang("token_buyToken"),
          onClick: () => actions.openModal("nrfx_presale")
        };
        break;
      }

      default:
        return null;
    }

    return utils.switchMatch(this.show, {
      false: (
        <UI.ContentBox className={cn("DashboardItem", this.props.type)}>
          {this.content.label && (
            <div
              className={utils.classNames(
                "DashboardItem__label",
                this.content.label
              )}
            >
              {this.content.label.toUpperCase()}
            </div>
          )}
          <div className="DashboardItemAction__icon">
            <div className="DashboardItemAction__icon_content">
              {this.content.emptyIcon}
            </div>
            <div className="DashboardItemAction__description">
              {this.content.emptyDescription}
            </div>
            <div className="DashboardItem__buttonAction">
              <UI.Button type="secondary" size="middle" {...this.button} />
            </div>
          </div>
        </UI.ContentBox>
      ),
      true: (
        <UI.ContentBox className={cn("DashboardItem", this.props.type)}>
          {this.props.type === "commerce" && (
            <div className="disabled">
              <span>{utils.getLang("cabinet_profileScreen_comingSoon")}</span>
            </div>
          )}
          <div className="DashboardItem__content_header">
            <div className="DashboardItem__icon">{this.icon}</div>
            <div className="DashboardItem__headerText">
              {{
                partners: utils.getLang("cabinet_partners")
                // TODO ?
              }[this.props.type] || utils.ucfirst(this.props.type)}
            </div>
          </div>
          <div className="DashboardItem__content_item">
            <div className="DashboardItem__content_item_header">
              <div className="DashboardItem__content_item_header_left">
                {this.content.firstHeaderLeftContext}
              </div>
              <div
                className="DashboardItem__content_item_header_right"
                onClick={() => {
                  this.setState({ invert: !this.state.invert });
                }}
              >
                {this.state.invert ? "BTC" : "USD"}
              </div>
            </div>
            <div className="DashboardItem__content_item_context">
              {this.state.invert
                ? this.content.firstMainContextInvert + " USD"
                : "~ " + this.content.firstMainContext + " BTC"}
            </div>
          </div>
          <div className="DashboardItem__content_item">
            <div className="DashboardItem__content_item_header">
              <div className="DashboardItem__content_item_header_left">
                {this.content.secondHeaderLeftContext}
              </div>
            </div>
            <div className="DashboardItem__content_item_context">
              {this.state.invert
                ? this.content.secondMainContextInvert
                : this.content.secondMainContext}
            </div>
          </div>
          <div className="DashboardItem__buttonAction">
            <UI.Button
              type={this.button.type || "secondary"}
              size="middle"
              {...this.button}
            />
          </div>
        </UI.ContentBox>
      )
    });
  }
}

export default DashboardItem;
