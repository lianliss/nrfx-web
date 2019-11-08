// styles
// external
import React from 'react';
import { connect } from 'react-redux';
// internal
import action from '../actions/admin';
import MainScreen from './containers/MainScreen/MainScreen';
import PanelScreen from './containers/PanelScreen/PanelScreen';
import * as pages from './constants/pages';
import SiteNotFoundScreen from '../index/containers/site/SiteNotFoundScreen/SiteNotFoundScreen';
import AdminWrapper from '../wrappers/Admin/AdminWrapper';
import router from '../router';

router.addListener((state, prevState)  => {
  if (!state.params.modal) {
    action({
      type: 'show_page',
      params: {
        page: router.getState().params.page
      }
    });
  }
});

function Routes(props) {
  const routeState = props.router.getState();
  const routerParams = routeState.params;
  const route = routeState.name;

  let actions = {};
  let Component = null;
  let WrapperComponent = props => <>{props.children}</>;

  if (route !== pages.MAIN && !props.user) {
    router.navigate(pages.MAIN);
  }

  switch (route) {
    case pages.MAIN:
      Component = MainScreen;
      break;
    case pages.PANEL:
      Component = PanelScreen;
      WrapperComponent = AdminWrapper;
      break;
    default:
      Component = SiteNotFoundScreen;
      break;
  }

  const defaultProps = {
    state: props.state.default,
    router: props.router,
  };

  return (
    <WrapperComponent>
      <Component {...defaultProps} {...actions} routerParams={routerParams} />
    </WrapperComponent>
  );
}

export default connect(state => ({
  user: state.default.profile.user
}))(Routes);