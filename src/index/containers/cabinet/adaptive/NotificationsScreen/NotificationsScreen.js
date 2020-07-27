import "./NotificationsScreen.less";
//
import React from "react";
import { connect } from "react-redux";
//
import * as UI from "../../../../../ui";
import CabinetBaseScreen from "../../CabinetBaseScreen/CabinetBaseScreen";
import * as utils from "../../../../../utils";
import * as actions from "../../../../../actions";
import * as notificationsActions from "../../../../../actions/cabinet/notifications";
import Lang from "../../../../../components/Lang/Lang";
import Notification from "../../../../components/cabinet/Notification/Notification";
import LoadingStatus from "../../../../components/cabinet/LoadingStatus/LoadingStatus";

class Notifications extends CabinetBaseScreen {
  componentDidMount() {
    this.props.setTitle(utils.getLang("global_notifications"));
    this.props.loadNotifications(); // TODO
  }

  render() {
    const { notifications, pending } = this.props.notifications;

    if (pending) {
      return <LoadingStatus inline status="loading" />;
    }

    if (!notifications.length) {
      return (
        <div className="NotificationsList__empty">
          <div
            style={{
              backgroundImage: `url(${require("../../../../../asset/120/info.svg")})`
            }}
            className="NotificationsList__empty__icon"
          ></div>
          <div className="">{utils.getLang("no_update")}</div>
        </div>
      );
    }

    return (
      <div className="NotificationsList Content_box">
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
      </div>
    );
  }
}

export default connect(
  state => ({
    notifications: state.notifications
  }),
  {
    setTitle: actions.setTitle,
    loadNotifications: notificationsActions.loadNotifications
  }
)(Notifications);
