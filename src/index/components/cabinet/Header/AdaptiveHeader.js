
import './Header.less';

import React from 'react';
import router from '../../../../router';
import UI from '../../../../ui';
import url from "url";
import {connect} from 'react-redux';
import * as internalNotifications from '../../../../actions/cabinet/internalNotifications';
import * as notificationsActions from '../../../../actions/cabinet/notifications';

class AdaptiveHeader extends React.Component {
  state = {activePage: null};

  render() {
    const { internalNotifications } = this.props;
    const internalNotification = internalNotifications.items.length ? internalNotifications.items[0] : null;
    return (
      <div className="CabinetHeaderContainer">
        <div className="CabinetHeader">
          <div className="CabinetHeader__leftContent">
            <div className="CabinetHeader__leftContent_icon">
              {this.props.leftContent}
            </div>
          </div>
          <div className="CabinetHeader__mainContent">
            <div className="CabinetHeader__mainContent_text">
              <span>{this.props.mainContent.content}</span>
            </div>
          </div>
          <div className="CabinetHeader__rightContent">
            {this.props.rightContent}
          </div>
        </div>
        {internalNotification && <UI.InternalNotification
          adaptive={true}
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
    )
  }
}

AdaptiveHeader.defaultProps = {
  leftContent: "",
  mainContent: {
    type: "logotype",
    content: ""
  },
  rightContent: ""
};

export default connect(state => ({
  internalNotifications: state.internalNotifications,
  profile: state.default.profile,
  notifications: state.notifications,
  router: state.router,
  langList: state.default.langList,
  title: state.default.title,
}), {
  dropInternalNotifications: internalNotifications.drop,
  loadNotifications: notificationsActions.loadNotifications,
  notificationAction: notificationsActions.submitAction,
})(AdaptiveHeader);
