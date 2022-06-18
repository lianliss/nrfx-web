import "./DeleteWalletModal.less";

import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import getFinePrice from 'utils/get-fine-price';
import Lang from "components/Lang/Lang";
import web3Backend from "services/web3-backend";
import {
  web3Update,
  web3SetData,
} from 'actions/cabinet/web3';
import * as UI from "ui";
import SVG from "utils/svg-wrap";
import {
  getLang,
} from 'utils';

class DeleteWalletModal extends React.PureComponent {

  state = {
    isLoading: false,
    isError: false,
  };

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  renderLoading() {
    return <div className="DeleteWalletModal-loading">
      <SVG src={require(`src/asset/cabinet/loading_34.svg`)} />
      <div className="ImportWalletModal-loading-text">
        {getLang("cabinetWalletDelete_loading")}
      </div>
    </div>
  }

  renderForm() {
    const {wallets} = this.props;
    const wallet = wallets[wallets.length - 1] || {};
    return <div className="DeleteWalletModal-form">
      <p>
        {wallets[wallets.length - 1].isGenerated
          ? getLang("cabinetWalletDelete_generated_notice")
          : getLang("cabinetWalletDelete_imported_notice")}
        {this.props.network}
      </p>
      <center>
        <UI.Button onClick={this.deleteWallets.bind(this)}>
          {getLang("cabinetWalletDelete_submit")}
        </UI.Button>
      </center>
    </div>
  }

  deleteWallets() {
    const {wallets, onClose, web3SetData, balances} = this.props;
    const network = _.get(this.props, 'network', 'BEP20');
    this.setState({isLoading: true});

    const currentWallets = wallets.filter(w => w.network === network);
    const addresses = currentWallets.map(w => w.address);

    Promise.all(currentWallets.map(wallet => web3Backend.deleteWallet(wallet.address)))
      .then(() => {
        web3SetData({
          wallets: wallets.filter(w => w.network !== network),
          balances: balances.filter(b => !_.includes(addresses, b.address)),
        });
        onClose();
      }).catch(error => {
        console.error('[DeleteWalletModal]', error);
        if (this._mounted) {
          this.setState({isLoading: false, isError: true});
        }
      })
  }

  render() {
    const {onClose} = this.props;
    const {isLoading} = this.state;

    return <UI.Modal isOpen={true} onClose={onClose} className="DeleteWalletModal">
      <UI.ModalHeader>
        {getLang("cabinetWalletDelete_header")}
      </UI.ModalHeader>
      <div className="DeleteWalletModal-content">
        {isLoading
          ? this.renderLoading()
          : this.renderForm()
        }
      </div>
    </UI.Modal>
  }
}

export default connect(state => ({
  wallets: state.web3.wallets,
  balances: state.web3.balances,
}), dispatch => bindActionCreators({
  web3Update,
  web3SetData,
}, dispatch), null, {pure: true})(DeleteWalletModal);
