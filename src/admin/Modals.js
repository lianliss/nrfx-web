// styles
// external
import React from 'react';
import { connect } from 'react-redux';
// internal
import router from '../router';
import AuthModal from '../components/AuthModal/AuthModal';
import ConfirmModal from '../index/components/cabinet/ConfirmModal/ConfirmModal';

function Modals(props) {
  const routerParams = props.route.params;
  delete routerParams.ref;
  const { options } = props.route.meta;
  const modal = routerParams.modal;

  let Component = false;

  switch (modal) {
    case 'test':
      Component = () => (<div>Test</div>);
      break;
    case 'auth':
      Component = AuthModal;
      break;
    case 'confirm':
      Component = ConfirmModal;
      break;
    default: return null;
  }

  return (
    <Component
      {...routerParams}
      {...options}
      onBack={() => {
        window.history.back();
      }}
      onClose={() => {
        const route = router.getState();
        const params = { ...route.params };
        delete params.modal;
        router.navigate(route.name, params)
      }}
    />
  );
}

export default connect(state => ({
  route: state.router.route
}))(Modals);
