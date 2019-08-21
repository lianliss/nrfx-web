// wallets
import SendCoinsModal from '../components/cabinet/SendCoinsModal/SendCoinsModal';
import ReceiveCoinsModal from '../components/cabinet/ReceiveCoinsModal/ReceiveCoinsModal';
import WalletTransactionModal from '../components/cabinet/WalletTransactionModal/WalletTransactionModal';
import NewWalletModal from '../components/cabinet/NewWalletModal/NewWalletModal';

// investments
import OpenDepositModal from '../components/cabinet/OpenDepositModal/OpenDepositModal';
import DepositInfoModal from '../components/cabinet/DepositInfoModal/DepositInfoModal';

// settings
import GAConfirmModal from '../components/cabinet/GAConfirmModal/GAConfirmModal';
import ChangeEmailModal from '../components/cabinet/ChangeEmailModal/ChangeEmailModal';
import ChangeNumberModal from '../components/cabinet/ChangeNumberModal/ChangeNumberModal';

const Modals = {
  SendCoinsModal: {children: SendCoinsModal},
  ReceiveCoinsModal: {children: ReceiveCoinsModal},
  WalletTransactionModal: {children: WalletTransactionModal},
  NewWalletModal: {children: NewWalletModal},
  DepositInfoModal: {children: DepositInfoModal},
  OpenDepositModal: {children: OpenDepositModal},
  GAConfirmModal: {children: GAConfirmModal},
  ChangeEmailModal: {children: ChangeEmailModal},
  ChangeNumberModal: {children: ChangeNumberModal}
};

export const MODALGROUP_ROUTES = {
  profile: {
    send: Modals.SendCoinsModal,
    receive: Modals.ReceiveCoinsModal
  },
  cabinet_wallet: {
    send: Modals.SendCoinsModal,
    receive: Modals.ReceiveCoinsModal,
    transaction: Modals.WalletTransactionModal,
    new_wallet: Modals.NewWalletModal,
  },
  investments: {
    deposit_info: Modals.DepositInfoModal,
    open_deposit: Modals.OpenDepositModal
  },
  settings: {
    change_email: Modals.ChangeEmailModal,
    change_number: Modals.ChangeNumberModal,
  }
};