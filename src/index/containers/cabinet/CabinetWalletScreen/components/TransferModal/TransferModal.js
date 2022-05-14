import './TransferModal.less';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getFinePrice from 'utils/get-fine-price';
import Lang from 'components/Lang/Lang';
import web3Backend from 'services/web3-backend';
import { web3Update, web3SetData } from 'actions/cabinet/web3';
import * as UI from 'ui';
import SVG from 'utils/svg-wrap';
import qrIcon from './assets/Icon.svg';
import { getLang } from 'utils';
import { WEI_ETHER } from 'src/index/constants/cabinet';
import { timeout } from 'utils';
import * as toastsActions from 'src/actions/toasts';
import QRScannerModal from '../../../../../components/cabinet/QRScannerModal/QRScannerModal';
class TransferModal extends React.PureComponent {
  state = {
    isLoading: false,
    isError: false,
    address: '',
    amount: null,
    isQRModal: false,
  };
  componentDidMount() {
    this._mounted = true;
  }
  componentWillUnmount() {
    this._mounted = false;
  }
  renderLoading() {
    return (
      <div className="TransferModal-loading">
        <SVG src={require(`src/asset/cabinet/loading_34.svg`)} />
        <div className="TransferModal-loading-text">
          {getLang('cabinetWalletTransfer_loading')}
        </div>
      </div>
    );
  }
  renderForm() {
    const { onClose, balance, currency } = this.props;
    const { address, amount } = this.state;
    return (
      <div className="TransferModal-form">
        <form onSubmit={this.transfer.bind(this)}>
          <h3>{getLang('cabinetWalletTransfer_address')}</h3>
          <div className="TransferModal__address">
            <UI.Input
              value={address}
              onChange={(event) =>
                this.setState({ address: event.currentTarget.value })
              }
            />
            <SVG
              src={qrIcon}
              className="TransferModal__address-icon"
              onClick={() => {
                this.setState({ isQRModal: true });
              }}
            />
          </div>
          <h3>
            <span>{getLang('cabinetWalletTransfer_amount')}</span>
            <span
              className="active"
              onClick={() => this.setState({ amount: balance })}
            >
              <UI.NumberFormat number={balance} currency={currency} />
            </span>
          </h3>
          <UI.Input
            value={amount}
            type="number"
            onChange={(event) =>
              this.setState({ amount: Number(event.currentTarget.value) })
            }
          />
        </form>
        <center>
          <UI.Button onClick={this.transfer.bind(this)}>
            {getLang('cabinetWalletTransfer_submit')}
          </UI.Button>
        </center>
        {this.state.isQRModal && (
          <QRScannerModal
            adaptive={this.props.adaptive}
            onResult={(result) => this.setState({ address: result })}
            onClose={() => {
              this.setState({ isQRModal: false });
            }}
            toastPush={this.props.toastPush}
          />
        )}
      </div>
    );
  }
  transfer() {
    const { wallets, onClose, web3SetData, currency } = this.props;
    const { address, amount } = this.state;
    const network = _.get(this.props, 'network', 'BEP20');
    this.setState({ isLoading: true });
    (async () => {
      try {
        // Transfer tokens
        const data = await web3Backend.transfer(
          address,
          currency,
          Number(amount)
        );
        onClose();
        // Wait 3 seconds before getting balance
        await timeout(3000);
        // Get the balance
        const walletAddress = _.get(wallets, '[0].address');
        const balance = await web3Backend.getBalances(walletAddress);
        const balances = [
          {
            address: walletAddress,
            items: balance,
          },
        ];
        web3SetData({ balances });
      } catch (error) {
        switch (error.data.name) {
          case 'error_noGas': {
            this.props.toastPush(getLang('error_noGas'), 'warning');
            break;
          }
          default: {
            break;
          }
        }
        console.error('[TransferModal]', error);
        this.setState({
          isLoading: false,
          isError: true,
        });
      }
    })();
  }
  render() {
    const { onClose, currency } = this.props;
    const { isLoading } = this.state;
    return (
      <UI.Modal isOpen={true} onClose={onClose} className="TransferModal">
        <UI.ModalHeader>
          {getLang('cabinetWalletTransfer_header')} {currency.toUpperCase()}
        </UI.ModalHeader>
        <div className="TransferModal-content">
          {isLoading ? this.renderLoading() : this.renderForm()}
        </div>
      </UI.Modal>
    );
  }
}
export default connect(
  (state) => ({
    wallets: state.web3.wallets,
    balances: state.web3.balances,
    currencies: state.cabinet.currencies,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        web3Update,
        web3SetData,
        toastPush: toastsActions.toastPush,
      },
      dispatch
    ),
  null,
  { pure: true }
)(TransferModal);
