import './Header.less';

import React from 'react';
import SVG from 'react-inlinesvg';
import { BaseLink } from 'react-router5';

import DropDown from './components/Dropdown';
import Badge from '../Badge/Badge';
import router from '../../../router';
import * as pages from '../../../constants/pages';
import * as storeUtils from '../../../storeUtils';
import * as CLASSES from "../../../constants/classes";
import UI from "../../../ui/index";

const DropDownLinks = [
  {
    title: <SVG src={require('../../../asset/cabinet/settings.svg')} />,
    children: [
      {
        title: "Settings",
        route: pages.SETTINGS
      },
      {
        title: "FAQ",
        route: pages.FAQ
      },
      {
        title: "Exit",
        route: pages.WALLET
      },
    ]
  }
];

class Header extends React.Component {
  state = {
    activePage: null,
    visibleNotifications: false
  };

  componentDidMount() {
    this.props.loadNotifications();
  }

  handleNavigate = (route) => {
    router.navigate(route);
  };

  toggleNotifications = () => {
    this.setState({visibleNotifications: !this.state.visibleNotifications});
  }

  render() {
    const { notifications, unreadCount } = this.props.notifications;
    return (
      <div className="CabinetHeaderContainer">
        <div className="CabinetHeader">
          <div className="CabinetHeader__content">
            <div className="CabinetHeader__logo" />
            <div className="CabinetHeader__links">

              <BaseLink router={router} routeName={pages.PROFILE} className="CabinetHeader__link" activeClassName="active" onClick={() => {this.setState({activePage:pages.PROFILE})}}>
                <SVG src={require('../../../asset/cabinet/user.svg')} />
                Profile
              </BaseLink>

              <BaseLink router={router} routeName={pages.CABINET_WALLET} className="CabinetHeader__link" activeClassName="active" onClick={() => {this.setState({activePage:pages.CABINET_WALLET})}}>
                <SVG src={require('../../../asset/cabinet/wallet_icon.svg')} />
                Wallets
              </BaseLink>

              <BaseLink router={router} routeName={pages.INVESTMENTS} className="CabinetHeader__link" activeClassName="active" onClick={() => {this.setState({activePage:pages.INVESTMENTS})}}>
                <SVG src={require('../../../asset/cabinet/investment_icon.svg')} />
                Investments
              </BaseLink>

              <div className="CabinetHeader__link" style={{display:'none'}}>
                <SVG src={require('../../../asset/cabinet/bots_icon.svg')} />
                Bots
              </div>

              <div className="CabinetHeader__link" style={{display:'none'}}>
                <SVG src={require('../../../asset/cabinet/exchange_icon.svg')} />
                Exchange
              </div>

              <div className="CabinetHeader__link" style={{display:'none'}}>
                <SVG src={require('../../../asset/cabinet/commerce_icon.svg')} />
                Commerce
              </div>
            </div>
            <div className="CabinetHeader__icons">
              <div className="CabinetHeader__icon">
                <UI.Notifications
                  visible={this.state.visibleNotifications}
                  onClose={this.toggleNotifications.bind(this)}
                >
                  {notifications.sort(n => n.unread ? -1 : 1).map((n, i) => (
                    <div key={n.id}>
                      { i > 0 &&  n.unread !== notifications[i - 1].unread &&
                        <UI.NotificationSeparator title="Просмотренные" />
                      }
                      <UI.Notification
                        unread={n.unread}
                        message={n.message}
                        date={n.created_at}
                      />
                    </div>
                  ))}
                </UI.Notifications>
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
                  key={DropDownLinks[0].title}
                  title={DropDownLinks[0].title}
                  onNavigate={this.handleNavigate}
                  subItems={DropDownLinks[0].children}
                  className={"CabinetHeader__DropDown_settings"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default storeUtils.getWithState(
  CLASSES.COMPONENT_CABINET_HEADER,
  Header
);