// styles
// external
import React from 'react';
// internal
import OpenDepositModal from './components/cabinet/OpenDepositModal/OpenDepositModal';
import RateDetailsModal from './components/cabinet/RateDetailsModal/RateDetailsModal';
import WithdrawalModal from './components/cabinet/WithdrawalModal/WithdrawalModal';
import NewWalletModal from './components/cabinet/NewWalletModal/NewWalletModal';
import SendCoinsModal from './components/cabinet/SendCoinsModal/SendCoinsModal';
import SendCoinsConfirmModal from './components/cabinet/SendCoinsConfirmModal/SendCoinsConfirmModal';
import ReceiveCoinsModal from './components/cabinet/ReceiveCoinsModal/ReceiveCoinsModal';
import WalletTransactionModal from './components/cabinet/WalletTransactionModal/WalletTransactionModal';
import LanguageModal from './components/site/LanguageModal/LanguageModal';
import NewInviteLinkModal from './components/cabinet/NewInviteLinkModal/NewInviteLinkModal';
import PartnerInfoModal from './components/cabinet/PartnerInfoModal/PartnerInfoModal';
import ManageBalanceModal from './components/cabinet/ManageBalanceModal/ManageBalanceModal';
import ChooseMarketModal from './components/cabinet/ChooseMarketModal/ChooseMarketModal';
import ConfirmModal from './components/cabinet/ConfirmModal/ConfirmModal';
import DepositInfoModal from './components/cabinet/DepositInfoModal/DepositInfoModal';
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
    case 'rate_details':
      Component = RateDetailsModal;
      break;
    case 'deposit_info':
      Component = DepositInfoModal;
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
    case 'send_confirm':
      Component = SendCoinsConfirmModal;
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
    case 'invite_link':
      Component = NewInviteLinkModal;
      break;
    case 'partner_info':
      Component = PartnerInfoModal;
      break;
    case 'manage_balance':
      Component = ManageBalanceModal;
      break;
    case 'confirm':
      Component = ConfirmModal;
      break;
    case 'choose_market':
      Component = ChooseMarketModal;
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
        router.navigate(route.name, null )
      }}
    />
  );
}
