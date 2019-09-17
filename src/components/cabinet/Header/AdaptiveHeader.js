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

class AdaptiveHeader extends React.Component {
  state = {activePage: null};

  handleNavigate = (route) => {
    router.navigate(route);
  };

  render() {
    return (
      <div className="CabinetHeaderContainer">
        <div className="CabinetHeader">
          234
        </div>
      </div>
    )
  }
}

export default storeUtils.getWithState(
  CLASSES.COMPONENT_CABINET_HEADER,
  AdaptiveHeader
);