import './Header.less';

import React from 'react';
import SVG from 'react-inlinesvg';
import { BaseLink } from 'react-router5';
import url from 'url';

import * as emitter from '../../../services/emitter';
import DropDown from './components/Dropdown';
import Badge from '../Badge/Badge';
import router from '../../../router';
import * as pages from '../../../constants/pages';
import * as storeUtils from '../../../storeUtils';
import * as utils from '../../../utils';
import * as CLASSES from "../../../constants/classes";
import UI from "../../../ui/index";
import * as auth from '../../../actions/auth';

function getDropDownLinks() {
  return [
    {
      title: <SVG src={require('../../../asset/cabinet/settings.svg')} />,
      children: [
        {
          title: utils.getLang('cabinet_header_settings'),
          route: pages.SETTINGS
        },
        {
          title: "FAQ",
          route: 'https://bitcoinbot.wiki/',
          useLocation: true
        },
        {
          title: utils.getLang('cabinet_header_exit'),
          route: pages.MAIN,
          action: () => {
            auth.logout();
          }
        },
      ]
    }
  ]
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.DropDownLinks = getDropDownLinks();
    this.updater = emitter.addListener('headerUpdate', this.__update);
  }

  __update = e => {
    this.DropDownLinks = getDropDownLinks();
    this.setState({update: !this.state.update});
  };

  state = {
    activePage: null,
    visibleNotifications: false,
    update: false
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
    const { internalNotifications } = this.props;
    const internalNotification = internalNotifications.items.length ? internalNotifications.items[0] : null;
    const { notifications, unreadCount } = this.props.notifications;
    return (
      <div className="CabinetHeaderContainer">
        <div className="CabinetHeader">
          <div className="CabinetHeader__content">
            <BaseLink router={router} routeName={isLogged ? pages.PROFILE : pages.MAIN} className="CabinetHeader__logo" />
            { isLogged && <div className="CabinetHeader__links">
              <BaseLink router={router} routeName={pages.PROFILE} className="CabinetHeader__link" activeClassName="active" onClick={() => {this.setState({activePage:pages.PROFILE})}}>
                <SVG src={require('../../../asset/cabinet/user.svg')} />
                {utils.getLang('cabinet_header_profile')}
              </BaseLink>

              <BaseLink router={router} routeName={pages.CABINET_WALLET} className="CabinetHeader__link" activeClassName="active" onClick={() => {this.setState({activePage:pages.CABINET_WALLET})}}>
                <SVG src={require('../../../asset/cabinet/wallet_icon.svg')} />
                {utils.getLang('cabinet_header_wallets')}
              </BaseLink>

              <BaseLink router={router} routeName={pages.INVESTMENTS} className="CabinetHeader__link" activeClassName="active" onClick={() => {this.setState({activePage:pages.INVESTMENTS})}}>
                <SVG src={require('../../../asset/cabinet/investment_icon.svg')} />
                {utils.getLang('cabinet_header_investments')}
              </BaseLink>

              <div className="CabinetHeader__link" style={{display:'none'}}>
                <SVG src={require('../../../asset/cabinet/bots_icon.svg')} />
                {utils.getLang('cabinet_header_bots')}
              </div>

              {/*<BaseLink router={router} routeName={pages.EXCHANGE} className="CabinetHeader__link" activeClassName="active" onClick={() => {this.setState({activePage:pages.CABINET_WALLET})}}>*/}
              {/*  <SVG src={require('../../../asset/cabinet/exchange_icon.svg')} />*/}
              {/*  {utils.getLang('cabinet_header_exchange')}*/}
              {/*</BaseLink>*/}

              <div className="CabinetHeader__link" style={{display:'none'}}>
                <SVG src={require('../../../asset/cabinet/commerce_icon.svg')} />
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
                  {notifications.sort(n => n.unread ? -1 : 1).map((n, i) => (
                    [
                      ( i > 0 &&  n.unread !== notifications[i - 1].unread &&
                        <UI.NotificationSeparator key={Math.random()} title={utils.getLang('cabinet_header_viewed')} />
                      ),
                      <UI.Notification
                        key={i}
                        icon={n.icon}
                        unread={n.unread}
                        message={n.message}
                        date={n.created_at}
                      />
                    ]
                  ))}
                </UI.Notifications>}
                <div onClick={this.toggleNotifications.bind(this)}>
                  <Badge count={unreadCount || null}>
                    <SVG src={require('../../../asset/cabinet/notification.svg')} />
                  </Badge>
                </div>
              </div>
              {/*<div className="CabinetHeader__icon">*/}
              {/*<SVG src={require('../../../asset/cabinet/social.svg')} />*/}
              {/*</div>*/}
              <div className="CabinetHeader__icon">
                <DropDown
                  key={this.DropDownLinks[0].title}
                  title={this.DropDownLinks[0].title}
                  onNavigate={this.handleNavigate}
                  subItems={this.DropDownLinks[0].children}
                  className="CabinetHeader__DropDown_settings"
                />
              </div>
            </div>}
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

export default storeUtils.getWithState(
  CLASSES.COMPONENT_CABINET_HEADER,
  Header
);