import React from 'react';

// Components
import Login from '../Login/Login';

// Utils
import router from 'src/router';
import * as pages from 'src/index/constants/pages';

// Styles
import './Main.less';

function Main(props) {
  const route = router.getState();
  let Component = Login;

  switch (route.name) {
    case pages.VALIDATOR:
      Component = Login;
    default:
      break;
  }

  return (
    <div className="Validator">
      <Component {...props} />
    </div>
  );
}

export default Main;
