// styles
// external
import React from 'react';
// internal
import OpenDepositModal from './components/cabinet/OpenDepositModal/OpenDepositModal';
import WithdrawalModal from './components/cabinet/WithdrawalModal/WithdrawalModal';
import NewWalletModal from './components/cabinet/NewWalletModal/NewWalletModal';
import SendCoinsModal from './components/cabinet/SendCoinsModal/SendCoinsModal';
import ReceiveCoinsModal from './components/cabinet/ReceiveCoinsModal/ReceiveCoinsModal';
import WalletTransactionModal from './components/cabinet/WalletTransactionModal/WalletTransactionModal';
import LanguageModal from './components/site/LanguageModal/LanguageModal';
import ManageBalanceModal from './components/cabinet/ManageBalanceModal/ManageBalanceModal';
import ConfirmModal from './components/cabinet/ConfirmModal/ConfirmModal';
import router from './router';

export default function Modals(props) {

  const routeState = props.router.getState();
  const routerParams = routeState.params;
  const { options } = routeState.meta;
  const modal = routerParams.modal;

  let Component = false;

  switch (modal) {
    case 'open_deposit':
      Component = OpenDepositModal;
      break;
    case 'withdrawal':
      Component = WithdrawalModal;
      break;
    case 'new_wallet':
      Component = NewWalletModal;
      break;
    case 'send':
      Component = SendCoinsModal;
      break;
    case 'receive':
      Component = ReceiveCoinsModal;
      break;
    case 'transaction':
      Component = WalletTransactionModal;
      break;
    case 'language':
      Component = LanguageModal;
      break;
    case 'manage_balance':
      Component = ManageBalanceModal;
      break;
    case 'confirm':
      Component = ConfirmModal;
      break;
    default: return null;
  }

  return (
    <Component {...routerParams} {...options} onClose={() => {
      router.navigate(router.getState().name);
    }} />
  );
}
