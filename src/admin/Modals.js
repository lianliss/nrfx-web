// styles
// external
import React from 'react';
// internal
import router from '../router';
import AuthModal from '../components/AuthModal/AuthModal';
import ConfirmModal from '../index/components/cabinet/ConfirmModal/ConfirmModal';

export default function Modals(props) {
  const routeState = props.router.getState();
  const routerParams = routeState.params;
  delete routerParams.ref;
  const { options } = routeState.meta;
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
