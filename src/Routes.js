import React from 'react';

import * as pages from './constants/pages';
import SiteMainScreen from './containers/site/SiteMainScreen/SiteMainScreen';
import SiteWalletScreen from './containers/site/SiteWalletScreen/SiteWalletScreen';
import SiteRobotsScreen from './containers/site/SiteRobotsScreen/SiteRobotsScreen';
import UIKitScreen from './containers/UIKit/UIKitScreen';


export default function Routes(props) {
  switch (props.state.default.page) {
    case pages.MAIN:
      return <SiteMainScreen {...props.state.test} {...props.testActions} />;
    case pages.WALLET:
      return <SiteWalletScreen {...props.state.test} {...props.testActions} />;
    case pages.ROBOTS:
      return <SiteRobotsScreen {...props.state.test} {...props.testActions} />;
    case pages.UIKIT:
      return <UIKitScreen {...props.state.test} {...props.testActions} />;
    case pages.HELLO:
      return <h2>Hello</h2>;
    default:
      return <h1>404 Not Found</h1>;
  }
}
