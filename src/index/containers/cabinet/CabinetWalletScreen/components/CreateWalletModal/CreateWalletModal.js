import "./CreateWalletModal.less";

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

class CreateWalletModal extends React.PureComponent {

  state = {
    isLoading: true,
    isError: false,
    privateKey: null,
    address: null,
  };

  componentDidMount() {
    this._mounted = true;
    const {web3SetData, wallets, balances} = this.props;
    (async () => {
      try {
        // Create a wallet
        const wallet = await web3Backend.createWallet();
        const {privateKey, address, network} = wallet;
        wallets.push({
          address,
          network,
          isGenerated: true,
        });
        web3SetData({wallets});

        // Get the balance
        const balance = await web3Backend.getBalances(address);
        balances.push({
          address,
          items: balance,
        });
        web3SetData({balances});

        // Update this modal
        if (!this._mounted) return;
        this.setState({
          isLoading: false,
          privateKey,
          address,
        });
      } catch (error) {
        console.error('[CreateWalletModal]', error);
        this.setState({
          isLoading: false,
          isError: true,
        });
      }
    })();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  renderLoading() {
    return <div className="CreateWalletModal-loading">
      <SVG src={require(`src/asset/cabinet/loading_34.svg`)} />
      <div className="CreateWalletModal-loading-text">
        {getLang("cabinetWalletCreate_creating")}
      </div>
    </div>
  }

  renderPrivateKey() {
    const {onClose} = this.props;
    const {privateKey, address} = this.state;
    return <div className="CreateWalletModal-done">
      <h3>
        {getLang("cabinetWalletCreate_address")}
      </h3>
      <UI.Input
        value={address}
        disabled
      />
      <h3>
        {getLang("cabinetWalletCreate_private_key")}
      </h3>
      <UI.Input
        description={getLang("cabinetWalletCreate_use_private_key")}
        value={privateKey}
        disabled
      />
      <center>
        <UI.Button onClick={onClose}>
          Ok
        </UI.Button>
      </center>
    </div>
  }

  render() {
    const {onClose} = this.props;
    const {isLoading} = this.state;

    return <UI.Modal isOpen={true} onClose={onClose} className="CreateWalletModal">
      <UI.ModalHeader>
        {isLoading
          ? getLang("cabinetWalletCreate_creating")
          : getLang("cabinetWalletCreate_your_new_wallet")}
      </UI.ModalHeader>
      <div className="CreateWalletModal-content">
        {isLoading
          ? this.renderLoading()
          : this.renderPrivateKey()
        }
      </div>
    </UI.Modal>
  }
}

export default connect(state => ({
  wallets: state.web3.wallets,
  balances: state.web3.balances,
  currencies: state.cabinet.currencies,
}), dispatch => bindActionCreators({
  web3Update,
  web3SetData,
}, dispatch), null, {pure: true})(CreateWalletModal);
