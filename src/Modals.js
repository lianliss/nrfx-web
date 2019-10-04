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
import NewInviteLinkModal from './components/cabinet/NewInviteLinkModal/NewInviteLinkModal';
import PartnerInfoModal from './components/cabinet/PartnerInfoModal/PartnerInfoModal';

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
    case 'invite_link':
      Component = NewInviteLinkModal;
      break;
    case 'partner_info':
      Component = PartnerInfoModal;
      break;
    default: return null;
  }

  return (
    <Component {...routerParams} />
  );
}
