// styles
// external
import React from "react";
import { connect } from "react-redux";
// internal
// import OpenDepositModal from './components/cabinet/OpenDepositModal/OpenDepositModal';
import RateDetailsModal from "./components/cabinet/RateDetailsModal/RateDetailsModal";
import WithdrawalModal from "./components/cabinet/WithdrawalModal/WithdrawalModal";
import NewWalletModal from "./components/cabinet/NewWalletModal/NewWalletModal";
import SendCoinsModal from "./components/cabinet/SendCoinsModal/SendCoinsModal";
import SecretKeyDescModal from "./components/cabinet/SecretKeyDescModal/SecretKeyDescModal";
import SecretKeyInfoModal from "./components/cabinet/SecretKeyInfoModal/SecretKeyInfoModal";
import ChangeSecretKeyModal from "./components/cabinet/ChangeSecretKeyModal/ChangeSecretKeyModal";
import SendCoinsConfirmModal from "./components/cabinet/SendCoinsConfirmModal/SendCoinsConfirmModal";
import ReceiveCoinsModal from "./components/cabinet/ReceiveCoinsModal/ReceiveCoinsModal";
import WalletTransactionModal from "./components/cabinet/WalletTransactionModal/WalletTransactionModal";
import DepositWithdrawModal from "./components/cabinet/DepositWithdrawModal/DepositWithdrawModal";
import LanguageModal from "./components/site/LanguageModal/LanguageModal";
import TranslatorModal from "./components/cabinet/TranslatorModal/TranslatorModal";
import NewInviteLinkModal from "./components/cabinet/NewInviteLinkModal/NewInviteLinkModal";
import PartnerInfoModal from "./components/cabinet/PartnerInfoModal/PartnerInfoModal";
import ManageBalanceModal from "./components/cabinet/ManageBalanceModal/ManageBalanceModal";
import ChooseMarketModal from "./components/cabinet/ChooseMarketModal/ChooseMarketModal";
import ConfirmModal from "./components/cabinet/ConfirmModal/ConfirmModal";
import GAConfirmModal from "./components/cabinet/GAConfirmModal/GAConfirmModal";
import GoogleCodeModal from "./components/cabinet/GoogleCodeModal/GoogleCodeModal";
import DepositInfoModal from "./components/cabinet/DepositInfoModal/DepositInfoModal";
import CalcDepositModal from "./components/cabinet/CalcDepositModal/CalcDepositModal";
import AuthModal from "../components/AuthModal/AuthModal";
import MerchantModal from "../index/components/cabinet/MerchantModal/MerchantModal";
import FiatWithdrawalModal from "../index/components/cabinet/FiatWithdrawalModal/FiatWithdrawalModal";
import FiatRefillModal from "../index/components/cabinet/FiatRefillModal/FiatRefillModal";
import FiatOperationModal from "../index/components/cabinet/FiatOperationModal/FiatOperationModal";
import DepositPoolSuccessModal from "../index/components/cabinet/DepositPoolSuccessModal/DepositPoolSuccessModal";
import StaticContentModal from "./components/site/StaticContentModal/StaticContentModal";
import UserBlockModal from "../index/components/cabinet/UserBlockModal/UserBlockModal";
import VerificationModal from "../index/components/cabinet/VerificationModal/VerificationModal";
import TraderNewBotModal from "./components/cabinet/TraderNewBotModal/TraderNewBotModal";
import WalletModal from "./components/cabinet/WalletModal/WalletModal";
import ChangeEmailModal from "./components/cabinet/ChangeEmailModal/ChangeEmailModal";
import CheckNewEmailModal from "./components/cabinet/CheckNewEmailModal/CheckNewEmailModal";
import UploadAvatarModal from "./components/cabinet/UploadAvatarModal/UploadAvatarModal";
import NrfxPresaleModal from "./components/cabinet/NrfxPresaleModal/NrfxPresaleModal";
import LoadingStatus from "./components/cabinet/LoadingStatus/LoadingStatus";
import { closeModal } from "src/actions/index";
import { Modal } from "../ui";

function Modals(props) {
  const routerParams = props.route.params;
  delete routerParams.ref;
  const { options } = props.route.meta;
  const modal = props.modal.name || routerParams.modal;

  let Component = false;

  switch (modal) {
    // case 'open_deposit':
    //   Component = OpenDepositModal;
    //   break;
    case "merchant":
      Component = MerchantModal;
      break;
    case "rate_details":
      Component = RateDetailsModal;
      break;
    case "auth":
      Component = AuthModal;
      break;
    case "static_content":
      Component = StaticContentModal;
      break;
    case "deposit_info":
      Component = DepositInfoModal;
      break;
    case "calc_deposit":
      Component = CalcDepositModal;
      break;
    case "withdrawal":
      Component = WithdrawalModal;
      break;
    case "fiat_refill":
      Component = FiatRefillModal;
      break;
    case "fiat_withdrawal":
      Component = FiatWithdrawalModal;
      break;
    case "new_wallet":
      Component = NewWalletModal;
      break;
    case "send":
      Component = SendCoinsModal;
      break;
    case "send_confirm":
      Component = SendCoinsConfirmModal;
      break;
    case "receive":
      Component = ReceiveCoinsModal;
      break;
    case "transaction":
      Component = WalletTransactionModal;
      break;
    case "language":
      Component = LanguageModal;
      break;
    case "invite_link":
      Component = NewInviteLinkModal;
      break;
    case "partner_info":
      Component = PartnerInfoModal;
      break;
    case "manage_balance":
      Component = ManageBalanceModal;
      break;
    case "confirm":
      Component = ConfirmModal;
      break;
    case "choose_market":
      Component = ChooseMarketModal;
      break;
    case "fiat_operation":
      Component = FiatOperationModal;
      break;
    case "deposit_pool_success":
      Component = DepositPoolSuccessModal;
      break;
    case "trader_new_bot":
      Component = TraderNewBotModal;
      break;
    case "user_block":
      Component = UserBlockModal;
      break;
    case "translator":
      Component = TranslatorModal;
      break;
    case "verification":
      Component = VerificationModal;
      break;
    case "change_secret_key":
      Component = ChangeSecretKeyModal;
      break;
    case "change_email":
      Component = ChangeEmailModal;
      break;
    case "check_change_email":
      Component = CheckNewEmailModal;
      break;
    case "secret_key":
      Component = SecretKeyDescModal;
      break;
    case "secret_key_info":
      Component = SecretKeyInfoModal;
      break;
    case "deposit_withdraw":
      Component = DepositWithdrawModal;
      break;
    case "ga_code":
      Component = GAConfirmModal;
      break;
    case "google_code":
      Component = GoogleCodeModal;
      break;
    case "upload_avatar":
      Component = UploadAvatarModal;
      break;
    case "nrfx_presale":
      Component = NrfxPresaleModal;
      break;
    case "wallet":
      Component = WalletModal;
      break;
    default:
      return null;
  }

  return (
    <Component
      {...routerParams}
      {...props.modal.params}
      {...options}
      onBack={() => {
        // console.log(router.getState());
        // debugger;
        window.history.back();
      }}
      onClose={closeModal}
    />
  );
}

class ModalsWrapper extends React.Component {
  state = {};
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: {
        name: error.name,
        message: error.message
      }
    });
  }

  render() {
    return this.state.error ? (
      <Modal
        onClose={() => {
          this.setState({ error: null });
          closeModal();
        }}
      >
        <LoadingStatus
          inline
          description={this.state.error.message}
          status={this.state.error.name}
        />
      </Modal>
    ) : (
      <Modals {...this.props} />
    );
  }
}

export default connect(state => ({
  route: state.router.route,
  modal: state.modal
}))(ModalsWrapper);
