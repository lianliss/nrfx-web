import './NotificationsScreen.less';
//
import React from 'react';
//
import UI from '../../../../../ui';
import CabinetBaseScreen from '../../CabinetBaseScreen/CabinetBaseScreen';
import * as utils from '../../../../../utils';
import * as storeUtils from '../../../../storeUtils';
import * as CLASSES from '../../../../constants/classes';

class Notifications extends CabinetBaseScreen {
  componentDidMount() {
    this.props.setTitle(utils.getLang("global_notifications"));
    this.props.loadNotifications(); // TODO
  }

  render() {
    const {notifications, pending} = this.props.notifications;

    if (pending) {
      return null;
    }

    if (!notifications.length) {
      return <div className="NotificationsList__empty">
        <div
          style={{backgroundImage: `url(${ require('../../../../../asset/120/info.svg')})`}}
          className="NotificationsList__empty__icon">
        </div>
        <div className="">{utils.getLang("no_update")}</div>
      </div>
    }

    return (
      <div className="NotificationsList Content_box">
        {notifications.sort(n => n.unread ? -1 : 1).map((n, i) => (
          [
            ( i > 0 &&  n.unread !== notifications[i - 1].unread &&
              <UI.NotificationSeparator title={utils.getLang('cabinet_header_viewed')} />
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
      </div>
    )
  }
}

export default storeUtils.getWithState(
  CLASSES.CABINET_NOTIFICATIONS_SCREEN,
  Notifications
);