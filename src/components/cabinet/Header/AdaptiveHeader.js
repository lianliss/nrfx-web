import './Header.less';

import React from 'react';
import SVG from 'react-inlinesvg';
import router from '../../../router';
import * as storeUtils from '../../../storeUtils';
import * as CLASSES from "../../../constants/classes";
import * as utils from "../../../utils/";
import UI from '../../../ui';
import url from "url";

class AdaptiveHeader extends React.Component {
  state = {activePage: null};

  handleNavigate = (route) => {
    router.navigate(route);
  };

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
            {utils.switchMatch(this.props.mainContent.type, {
              'logotype': <div className="CabinetHeader__mainContent_logo">
                <SVG src={require("../../../asset/logo_full_adaptive.svg")} />
              </div>,
              'default': <div className="CabinetHeader__mainContent_text">
                <span>
                  {this.props.mainContent.content}
                </span>
              </div>
            })}
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

export default storeUtils.getWithState(
  CLASSES.COMPONENT_CABINET_HEADER,
  AdaptiveHeader
);