import React from 'react';

// Components
import Preview from '../Preview/Preview';
import CreateTrade from '../CreateTrade/CreateTrade';

// Utils
import router from 'src/router';
import * as pages from 'src/index/constants/pages';

// Styles
import './Main.less';

function Main(props) {
  const route = router.getState();
  let Component = Preview;

  switch (route.name) {
    case pages.VALIDATOR:
      Component = Preview;
    case pages.VALIDATOR_CREATE_TRADE:
      Component = CreateTrade
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
