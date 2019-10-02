// wallets
import SendCoinsModal from '../components/cabinet/SendCoinsModal/SendCoinsModal';
import ReceiveCoinsModal from '../components/cabinet/ReceiveCoinsModal/ReceiveCoinsModal';
import WalletTransactionModal from '../components/cabinet/WalletTransactionModal/WalletTransactionModal';
import NewWalletModal from '../components/cabinet/NewWalletModal/NewWalletModal';

// investments
import OpenDepositModal from '../components/cabinet/OpenDepositModal/OpenDepositModal';
import DepositInfoModal from '../components/cabinet/DepositInfoModal/DepositInfoModal';
import WithdrawalModal from '../components/cabinet/WithdrawalModal/WithdrawalModal';

// settings
import GAConfirmModal from '../components/cabinet/GAConfirmModal/GAConfirmModal';
import ChangeEmailModal from '../components/cabinet/ChangeEmailModal/ChangeEmailModal';
import ChangeNumberModal from '../components/cabinet/ChangeNumberModal/ChangeNumberModal';
import SecretKeyInfoModal from '../components/cabinet/SecretKeyInfoModal/SecretKeyInfoModal';
import SecretKeyDescModal from '../components/cabinet/SecretKeyDescModal/SecretKeyDescModal';

// profile
import ChangeSecretKeyModal from '../components/cabinet/ChangeSecretKeyModal/ChangeSecretKeyModal';
import GoogleCodeModal from '../components/cabinet/GoogleCodeModal/GoogleCodeModal';

const Modals = {
  SendCoinsModal: {children: SendCoinsModal},
  ReceiveCoinsModal: {children: ReceiveCoinsModal},
  WalletTransactionModal: {children: WalletTransactionModal},
  NewWalletModal: {children: NewWalletModal},
  DepositInfoModal: {children: DepositInfoModal},
  OpenDepositModal: {children: OpenDepositModal},
  GAConfirmModal: {children: GAConfirmModal},
  ChangeEmailModal: {children: ChangeEmailModal},
  ChangeNumberModal: {children: ChangeNumberModal},
  WithdrawalModal: {children: WithdrawalModal},
  SecretKeyInfoModal: {children: SecretKeyInfoModal},
  SecretKeyDescModal: {children: SecretKeyDescModal},
  ChangeSecretKeyModal: {children: ChangeSecretKeyModal},
  GoogleCodeModal: {children: GoogleCodeModal}
};

export const MODALGROUP_ROUTES = {
  profile: {
    send: Modals.SendCoinsModal,
    receive: Modals.ReceiveCoinsModal,
    change_secret_key: Modals.ChangeSecretKeyModal,
    secret_key: Modals.SecretKeyDescModal,
    google_code: Modals.GoogleCodeModal
  },
  cabinet_wallet: {
    send: Modals.SendCoinsModal,
    receive: Modals.ReceiveCoinsModal,
    transaction: Modals.WalletTransactionModal,
    new_wallet: Modals.NewWalletModal,
  },
  investments: {
    deposit_info: Modals.DepositInfoModal,
    open_deposit: Modals.OpenDepositModal,
    withdrawal: Modals.WithdrawalModal
  },
  settings: {
    change_email: Modals.ChangeEmailModal,
    change_number: Modals.ChangeNumberModal,
    secret_key_info: Modals.SecretKeyInfoModal,
  },
  menu: {},
  exchange: {}
};