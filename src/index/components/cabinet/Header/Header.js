import "./Header.less";

import React from "react";
import SVG from "utils/svg-wrap";
import { BaseLink } from "react-router5";
import { classNames as cn } from "../../../../utils";
import Badge from "../../../../ui/components/Badge/Badge";
import router from "../../../../router";
import * as pages from "../../../constants/pages";
import * as utils from "../../../../utils";
import * as UI from "../../../../ui/index";
import * as auth from "../../../../actions/auth";
import * as steps from "../../../../components/AuthModal/fixtures";
import * as actions from "../../../../actions";
import { getLang } from "../../../../services/lang";
import COMPANY from "../../../constants/company";
import { connect } from "react-redux";
import InternalNotification from "../InternalNotification/InternalNotification";
import Lang from "../../../../components/Lang/Lang";
import Notifications from "../Notifications/Notifications";
import {Web3Context} from 'services/web3Provider';
import _ from 'lodash';

class Header extends React.PureComponent {
  static contextType = Web3Context;

  state = {
    activePage: null,
    visibleNotifications: false
  };

  toggleNotifications = () => {
    this.setState({ visibleNotifications: !this.state.visibleNotifications });
  };

  render() {
    const {isConnected, accountAddress} = this.context;
    const isLogged = !!this.props.profile.user;
    const currentPage = router.getState().name;
    const currentLang = getLang();
    const lang =
      this.props.langList.find(l => l.value === currentLang) ||
      this.props.langList[0] ||
      {}; // hack

    return (
      <div className="CabinetHeaderContainer">
        <div className="CabinetHeader">
          <div className="CabinetHeader__content">
            <BaseLink
              router={router}
              routeName={pages.MAIN}
            >
              <UI.Logo />
            </BaseLink>
            {isLogged && (
              <div className="CabinetHeader__links">
                {/*{(this.props.profile.has_deposits || userRole("agent")) && (*/}
                {/*  <BaseLink*/}
                {/*    router={router}*/}
                {/*    routeName={pages.PARTNERS}*/}
                {/*    className="CabinetHeader__link"*/}
                {/*    activeClassName="active"*/}
                {/*    onClick={() => {*/}
                {/*      this.setState({ activePage: pages.PARTNERS });*/}
                {/*    }}*/}
                {/*  >*/}
                {/*    <SVG src={require("src/asset/24px/users.svg")} />*/}
                {/*    <Lang name="cabinet_header_partners" />*/}
                {/*  </BaseLink>*/}
                {/*)}*/}

                <BaseLink
                  router={router}
                  routeName={pages.WALLET}
                  className={cn("CabinetHeader__link", {
                    // HACK
                    active: [
                      pages.WALLET_SWAP,
                      pages.WALLET_FIAT,
                      pages.WALLET_CRYPTO
                    ].includes(currentPage)
                  })}
                  activeClassName="active"
                  onClick={() => {
                    this.setState({ activePage: pages.WALLET });
                  }}
                >
                  <SVG
                    src={require("../../../../asset/cabinet/wallet_icon.svg")}
                  />
                  <Lang name="cabinet_header_wallet" />
                </BaseLink>

                {this.props.profile.has_deposits && (
                  <BaseLink
                    router={router}
                    routeName={pages.INVESTMENTS}
                    className="CabinetHeader__link"
                    activeClassName="active"
                    onClick={() => {
                      this.setState({ activePage: pages.INVESTMENTS });
                    }}
                  >
                    <SVG
                      src={require("../../../../asset/cabinet/investment_icon.svg")}
                    />
                    <Lang name="cabinet_header_investments" />
                  </BaseLink>
                )}

                <BaseLink
                  router={router}
                  routeName={pages.EXCHANGE}
                  className="CabinetHeader__link"
                  activeClassName="active"
                  onClick={() => {
                    this.setState({ activePage: pages.CABINET_WALLET });
                  }}
                >
                  <SVG src={require("../../../../asset/24px/candles.svg")} />
                  <Lang name="cabinet_header_exchange" />
                </BaseLink>

                <div
                  className="CabinetHeader__link"
                  style={{ display: "none" }}
                >
                  <SVG
                    src={require("../../../../asset/cabinet/commerce_icon.svg")}
                  />
                  <Lang name="cabinet_header_commerce" />
                </div>
              </div>
            )}
            {isLogged && (
              <div className="CabinetHeader__icons">
                {this.state.visibleNotifications && (
                  <Notifications
                    onClose={() => {
                      this.setState({ visibleNotifications: false });
                    }}
                  />
                )}
                <div className="CabinetHeader__icon">
                  <Badge
                    onClick={this.toggleNotifications}
                    count={!!this.props.profile.has_notifications ? 1 : null}
                  >
                    <SVG
                      className="CabinetHeader__icon__svg"
                      src={require("../../../../asset/cabinet/notification.svg")}
                    />
                  </Badge>
                </div>
                <div className="CabinetHeader__icon">
                  <UI.ActionSheet
                    position="left"
                    items={[
                      {
                        title: utils.getLang("cabinet_header_settings"),
                        onClick: () => router.navigate(pages.SETTINGS)
                      },
                      {
                        title: utils.getLang("cabinet_header_partners"),
                        onClick: () => router.navigate(pages.PARTNERS)
                      },
                      {
                        title: "FAQ",
                        onClick: () => window.open(COMPANY.faqUrl)
                      },
                      {
                        title: lang.title,
                        onClick: () => actions.openModal("language"),
                        subContent: (
                          <SVG
                            src={require(`../../../../asset/site/lang-flags/${lang.value}.svg`)}
                          />
                        )
                      },
                      { title: utils.getLang('global_darkMode'), onClick: actions.toggleTheme, subContent: <UI.Switch on={this.props.theme === 'dark'} /> },
                      {
                        title: utils.getLang("cabinet_header_exit"),
                        onClick: auth.logout
                      }
                    ]}
                  >
                    <SVG
                      className="CabinetHeader__icon__svg"
                      src={require("../../../../asset/cabinet/settings.svg")}
                    />
                  </UI.ActionSheet>
                </div>
                {/*{isConnected*/}
                  {/*? <div className="CabinetHeader__account-address">*/}
                    {/*{_.truncate(accountAddress, {length: 9})}{accountAddress.slice(-4)}*/}
                  {/*</div>*/}
                  {/*: <UI.Button*/}
                    {/*onClick={() =>*/}
                      {/*this.context.connectWallet()*/}
                    {/*}*/}
                    {/*size="middle"*/}
                    {/*type="secondary"*/}
                    {/*className="CabinetHeader__connect"*/}
                  {/*>*/}
                    {/*Connect wallet*/}
                  {/*</UI.Button>}*/}
              </div>
            )}
            {!isLogged && (
              <div className="CabinetHeader__controls">
                <UI.Button
                  onClick={() =>
                    actions.openModal("auth", null, { type: steps.LOGIN })
                  }
                  className="login"
                  size="middle"
                  type="lite"
                >
                  <Lang name="site__authModalLogInBtn" />
                </UI.Button>
                <UI.Button
                  onClick={() =>
                    actions.openModal("auth", null, {
                      type: steps.REGISTRATION
                    })
                  }
                  size="middle"
                  type="secondary"
                >
                  <Lang name="site__authModalSignUpBtn" />
                </UI.Button>
              </div>
            )}
          </div>

          <InternalNotification />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    profile: state.default.profile,
    notifications: state.notifications,
    router: state.router,
    langList: state.default.langList,
    title: state.default.title,
    theme: state.default.theme,
    translator: state.settings.translator
  }),
  {
    // loadNotifications: notificationsActions.loadNotifications,
  }
)(Header);
