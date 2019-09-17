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
import * as utils from "../../../utils/";

class AdaptiveHeader extends React.Component {
  constructor(props) {
    super(props);
    this.leftContent = props.leftContent;
    this.mainContent = props.mainContent;
    this.rightContent = props.rightContent;
  }
  state = {activePage: null};

  handleNavigate = (route) => {
    router.navigate(route);
  };

  render() {
    return (
      <div className="CabinetHeaderContainer">
        <div className="CabinetHeader">
          <div className="CabinetHeader__leftContent">
            <div className="CabinetHeader__leftContent_icon">
              {this.leftContent}
            </div>
          </div>
          <div className="CabinetHeader__mainContent">
            {utils.switchMatch(this.mainContent.type, {
              'logotype': <div className="CabinetHeader__mainContent_logo">
                <SVG src={require("../../../asset/logo_full_adaptive.svg")} />
              </div>,
              'default': <div className="CabinetHeader__mainContent_text">
                <span>
                  {this.mainContent.content}
                </span>
              </div>
            })}
          </div>
          <div className="CabinetHeader__rightContent">
            {this.rightContent}
          </div>
        </div>
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