import React from 'react';

import OpenDepositModal from './components/cabinet/OpenDepositModal/OpenDepositModal';
import WithdrawalModal from './components/cabinet/WithdrawalModal/WithdrawalModal';

export default function Modals(props) {

  const routeState = props.router.getState();
  const routerParams = routeState.params;
  const modal = routerParams.modal;

  let Component = false;

  switch (modal) {
    case 'open_deposit':
      Component = OpenDepositModal;
      break;
    case 'withdrawal':
      Component = WithdrawalModal;
      break;
    default:
      return null;
  }

  return (
    <Component {...routerParams} />
  );
}
