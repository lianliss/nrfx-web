import "./Header.less";

import React from "react";
import SVG from "react-inlinesvg";
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
import Notification from "../Notification/Notification";
import InternalNotification from "../InternalNotification/InternalNotification";
import * as notificationsActions from "../../../../actions/cabinet/notifications";
import Lang from "../../../../components/Lang/Lang";
import { userRole } from "../../../../actions/cabinet/profile";

class Header extends React.Component {
  state = {
    activePage: null,
    visibleNotifications: false
  };

  handleNavigate = route => {
    router.navigate(route);
  };

  toggleNotifications = () => {
    if (
      !this.props.notifications.notifications.length &&
      !this.state.visibleNotifications
    ) {
      this.props.loadNotifications();
    }
    this.setState({ visibleNotifications: !this.state.visibleNotifications });
  };

  render() {
    const isLogged = !!this.props.profile.user;
    const { notifications } = this.props.notifications;
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
              routeName={isLogged ? pages.WALLET : pages.MAIN}
            >
              <UI.Logo />
            </BaseLink>
            {isLogged && (
              <div className="CabinetHeader__links">
                {(this.props.profile.has_deposits || userRole("agent")) && (
                  <BaseLink
                    router={router}
                    routeName={pages.PARTNERS}
                    className="CabinetHeader__link"
                    activeClassName="active"
                    onClick={() => {
                      this.setState({ activePage: pages.PARTNERS });
                    }}
                  >
                    <SVG src={require("src/asset/24px/users.svg")} />
                    <Lang name="cabinet_header_partners" />
                  </BaseLink>
                )}

                {/*<BaseLink*/}
                {/*  router={router}*/}
                {/*  routeName={pages.FIAT}*/}
                {/*  className="CabinetHeader__link"*/}
                {/*  activeClassName="active"*/}
                {/*  onClick={() => {*/}
                {/*    this.setState({ activePage: pages.FIAT });*/}
                {/*  }}*/}
                {/*>*/}
                {/*  <SVG src={require("src/asset/24px/fiat.svg")} />*/}
                {/*  <Lang name="cabinet_header_fiat" />*/}
                {/*</BaseLink>*/}

                {/*<BaseLink*/}
                {/*  router={router}*/}
                {/*  routeName={pages.CABINET_WALLET}*/}
                {/*  className="CabinetHeader__link"*/}
                {/*  activeClassName="active"*/}
                {/*  onClick={() => {*/}
                {/*    this.setState({ activePage: pages.CABINET_WALLET });*/}
                {/*  }}*/}
                {/*>*/}
                {/*  <SVG*/}
                {/*    src={require("../../../../asset/cabinet/wallet_icon.svg")}*/}
                {/*  />*/}
                {/*  <Lang name="cabinet_header_wallets" />*/}
                {/*</BaseLink>*/}

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
                <div className="CabinetHeader__icon">
                  {this.state.visibleNotifications && (
                    <UI.Notifications
                      emptyText={<Lang name="no_update" />}
                      visible={true}
                      pending={this.props.notifications.pending}
                      onClose={this.toggleNotifications.bind(this)}
                    >
                      {notifications
                        .filter(item => !item.deleted)
                        .sort(n => (n.unread ? -1 : 1))
                        .map((n, i) => [
                          i > 0 && n.unread !== notifications[i - 1].unread && (
                            <UI.NotificationSeparator
                              key={Math.random()}
                              title={<Lang name="cabinet_header_viewed" />}
                            />
                          ),
                          <Notification {...n} />
                        ])}
                    </UI.Notifications>
                  )}
                  <Badge
                    onClick={this.toggleNotifications.bind(this)}
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
                      // { title: utils.getLang('global_darkMode'), onClick: actions.toggleTheme, subContent: <UI.Switch on={this.props.theme === 'dark'} /> },
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
    loadNotifications: notificationsActions.loadNotifications,
    notificationAction: notificationsActions.submitAction
  }
)(Header);
