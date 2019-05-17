import React from 'react';
import * as pages from './constants/pages';

import TestScreen from './containers/TestScreen';
import UIKitScreen from './containers/UIKit/UIKitScreen';

export default function Routes(props) {
  switch (props.state.default.page) {
    case pages.MAIN:
      return <TestScreen {...props.state.test} {...props.testActions} />;
    case pages.UIKIT:
      return <UIKitScreen {...props.state.test} {...props.testActions} />;
    case pages.HELLO:
      return <h2>Hello</h2>;
    default:
      return <h1>404 Not Found</h1>;
  }
}
