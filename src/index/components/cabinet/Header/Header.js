import './Header.less';

import React from 'react';
import SVG from 'react-inlinesvg';
import { BaseLink } from 'react-router5';
import url from 'url';

import Badge from '../Badge/Badge';
import router from '../../../../router';
import * as pages from '../../../constants/pages';
import * as utils from '../../../../utils';
import UI from "../../../../ui/index";
import * as auth from '../../../../actions/auth';
import * as steps from '../../../../components/AuthModal/fixtures';
import * as actions from '../../../../actions';
import {getLang} from '../../../../services/lang';
import COMPANY from '../../../constants/company';
import {connect} from 'react-redux';
import * as internalNotifications from '../../../../actions/cabinet/internalNotifications';
import * as notificationsActions from '../../../../actions/cabinet/notifications';


class Header extends React.Component {
  state = {
    activePage: null,
    visibleNotifications: false,
  };

  handleNavigate = (route) => {
    router.navigate(route);
  };

  toggleNotifications = () => {
    if (!this.props.notifications.notifications.length && !this.state.visibleNotifications) {
      this.props.loadNotifications();
    }
    this.setState({visibleNotifications: !this.state.visibleNotifications});
  };

  render() {
    const isLogged = this.props.profile.role;
    const { internalNotifications, isExchangeEnabled } = this.props;
    const internalNotification = internalNotifications.items.length ? internalNotifications.items[0] : null;
    const { notifications } = this.props.notifications;

    const currentLang = getLang();
    const lang = this.props.langList.find(l => l.value === currentLang) || this.props.langList[0] || {}; // hack

    return (
      <div className="CabinetHeaderContainer">
        <div className="CabinetHeader">
          <div className="CabinetHeader__content">
            <BaseLink router={router} routeName={isLogged ? pages.PROFILE : pages.MAIN}>
              <UI.Logo />
            </BaseLink>
            { isLogged && <div className="CabinetHeader__links">
              <BaseLink router={router} routeName={pages.PROFILE} className="CabinetHeader__link" activeClassName="active" onClick={() => {this.setState({activePage:pages.PROFILE})}}>
                <SVG src={require('../../../../asset/cabinet/user.svg')} />
                {utils.getLang('cabinet_header_profile')}
              </BaseLink>

              <BaseLink router={router} routeName={pages.CABINET_WALLET} className="CabinetHeader__link" activeClassName="active" onClick={() => {this.setState({activePage:pages.CABINET_WALLET})}}>
                <SVG src={require('../../../../asset/cabinet/wallet_icon.svg')} />
                {utils.getLang('cabinet_header_wallets')}
              </BaseLink>

              <BaseLink router={router} routeName={pages.INVESTMENTS} className="CabinetHeader__link" activeClassName="active" onClick={() => {this.setState({activePage:pages.INVESTMENTS})}}>
                <SVG src={require('../../../../asset/cabinet/investment_icon.svg')} />
                {utils.getLang('cabinet_header_investments')}
              </BaseLink>

              <div className="CabinetHeader__link" style={{display:'none'}}>
                <SVG src={require('../../../../asset/cabinet/bots_icon.svg')} />
                {utils.getLang('cabinet_header_bots')}
              </div>

              <BaseLink router={router} routeName={pages.EXCHANGE} className="CabinetHeader__link" activeClassName="active" onClick={() => {this.setState({activePage:pages.CABINET_WALLET})}}>
                <SVG src={require('../../../../asset/cabinet/exchange_icon.svg')} />
                {utils.getLang('cabinet_header_exchange')}
              </BaseLink>

              <div className="CabinetHeader__link" style={{display:'none'}}>
                <SVG src={require('../../../../asset/cabinet/commerce_icon.svg')} />
                {utils.getLang('cabinet_header_commerce')}
              </div>
            </div> }
            { isLogged && <div className="CabinetHeader__icons">
              <div className="CabinetHeader__icon">
                { this.state.visibleNotifications && <UI.Notifications
                  emptyText={utils.getLang('no_update')}
                  visible={true}
                  pending={this.props.notifications.pending}
                  onClose={this.toggleNotifications.bind(this)}
                >
                  {notifications.filter(item => !item.deleted).sort(n => n.unread ? -1 : 1).map((n, i) => (
                    [
                      ( i > 0 &&  n.unread !== notifications[i - 1].unread &&
                        <UI.NotificationSeparator key={Math.random()} title={utils.getLang('cabinet_header_viewed')} />
                      ),
                      <UI.Notification
                        key={i}
                        icon={n.icon}
                        unread={n.unread}
                        actions={n.actions}
                        onAction={(action) => this.props.notificationAction(n.id, action)}
                        message={n.message}
                        date={utils.dateFormat(n.created_at, false).fromNow()}
                      />
                    ]
                  ))}
                </UI.Notifications>}
                <div onClick={this.toggleNotifications.bind(this)}>
                  <Badge count={!!this.props.profile.has_notifications ? 1 : null}>
                    <SVG src={require('../../../../asset/cabinet/notification.svg')} />
                  </Badge>
                </div>
              </div>
              <div className="CabinetHeader__icon">
                <UI.ActionSheet position="left" items={[
                  { title: utils.getLang('cabinet_header_settings'), onClick: () => router.navigate(pages.SETTINGS) },
                  { title: "FAQ", onClick: () => window.open(COMPANY.faqUrl) },
                  { title: lang.title, onClick: () => actions.openModal('language'), subContent: (
                    <SVG src={require(`../../../../asset/site/lang-flags/${lang.value}.svg`)} />
                  )},
                  { title: utils.getLang('cabinet_header_exit'), onClick: auth.logout },
                ]}>
                  <SVG src={require('../../../../asset/cabinet/settings.svg')} />
                </UI.ActionSheet>
              </div>
            </div>}
            { !isLogged && <div className="CabinetHeader__controls">
              <UI.Button onClick={() => actions.openModal('auth', {type: steps.LOGIN})} className="login" size="middle" type="lite">{utils.getLang('site__authModalLogInBtn')}</UI.Button>
              <UI.Button onClick={() => actions.openModal('auth', {type: steps.REGISTRATION})}  size="middle" type="outline">{utils.getLang('site__authModalSignUpBtn')}</UI.Button>
            </div> }
          </div>
          {internalNotification && <UI.InternalNotification
            acceptText={internalNotification.button_text}
            message={internalNotification.caption}
            onAccept={() => {
              const link = url.parse(internalNotification.link, true);
              router.navigate(link.pathname.substr(1), link.query, internalNotification.params, () => {
                this.props.dropInternalNotifications(internalNotification.type);
              });
            }}
            onClose={() => {
              this.props.dropInternalNotifications(internalNotification.type)
            }}
          />}
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  internalNotifications: state.internalNotifications,
  profile: state.default.profile,
  notifications: state.notifications,
  router: state.router,
  langList: state.default.langList,
  title: state.default.title,
  translate: state.settings.translaterSetting
}), {
  dropInternalNotifications: internalNotifications.drop,
  loadNotifications: notificationsActions.loadNotifications,
  notificationAction: notificationsActions.submitAction,
})(Header);
