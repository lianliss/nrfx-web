import './MenuScreen.less';
import CabinetBaseScreen from '../CabinetBaseScreen/CabinetBaseScreen';
import React from 'react';
import * as CLASSES from "../../../constants/classes";
import * as storeUtils from "../../../storeUtils";

class MenuScreen extends CabinetBaseScreen {
  render() {
    if (!this.props.adaptive) {
      return '0';
    }
    return '1';
  }
}

export default storeUtils.getWithState(
  CLASSES.CABINET_MENU_SCREEN,
  MenuScreen
);