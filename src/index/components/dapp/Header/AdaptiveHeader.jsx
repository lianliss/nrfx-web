import "./Header.less";

import React from "react";
import { connect } from "react-redux";
import InternalNotification from "../InternalNotification/InternalNotification";

class AdaptiveHeader extends React.Component {
  state = { activePage: null };

  render() {
    return (
      <div className="DappHeaderContainer">
        <div className="DappHeader">
          <div className="DappHeader__leftContent">
            <div className="DappHeader__leftContent_icon">
              {this.props.leftContent && this.props.leftContent}
            </div>
          </div>
          <div className="DappHeader__mainContent">
            <div className="DappHeader__mainContent_text">
              <span>{this.props.mainContent.content}</span>
            </div>
          </div>
          <div className="DappHeader__rightContent">
            {this.props.rightContent}
          </div>
        </div>
        <InternalNotification />
      </div>
    );
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

export default connect(
  state => ({
    profile: state.default.profile,
    notifications: state.notifications,
    router: state.router,
    langList: state.default.langList,
    title: state.default.title
  }),
  {
    // loadNotifications: notificationsActions.loadNotifications,
  }
)(AdaptiveHeader);
