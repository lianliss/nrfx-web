import React from 'react';

import * as pages from './constants/pages';
import SiteMainScreen from './containers/site/SiteMainScreen/SiteMainScreen';
import SiteWalletScreen from './containers/site/SiteWalletScreen/SiteWalletScreen';
import SiteRobotsScreen from './containers/site/SiteRobotsScreen/SiteRobotsScreen';
import UIKitScreen from './containers/UIKit/UIKitScreen';


export default function Routes(props) {

  let actions = {};
  let state = {};
  let Component = false;

  switch (props.state.default.page) {
    case pages.MAIN:
      Component = SiteMainScreen;
      break;
    case pages.WALLET:
      Component = SiteWalletScreen;
      break;
    case pages.ROBOTS:
      Component = SiteRobotsScreen;
      break;
    case pages.UIKIT:
      Component = UIKitScreen;
      break;
  }

  if (!Component) {
    return <h1>404 Not Found</h1>;
  }

  const defaultProps = {
    state: props.state.index
  };

  return <Component {...defaultProps} {...actions} {...state} />;
}
