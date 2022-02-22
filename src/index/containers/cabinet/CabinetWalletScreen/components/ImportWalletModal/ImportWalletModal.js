import "./ImportWalletModal.less";

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

class ImportWalletModal extends React.PureComponent {

  state = {
    isLoading: false,
    isError: false,
    isKeyImport: false,
    address: '',
  };

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  renderLoading() {
    return <div className="ImportWalletModal-loading">
      <SVG src={require(`src/asset/cabinet/loading_34.svg`)} />
      <div className="ImportWalletModal-loading-text">
        {getLang("cabinetWalletImport_loading")}
      </div>
    </div>
  }

  renderForm() {
    const {onClose} = this.props;
    const {address, isKeyImport} = this.state;
    return <div className="ImportWalletModal-form">
      <h3>
        <span className={isKeyImport ? 'active' : ''}
              onClick={() => this.setState({isKeyImport: false})}>
          {getLang("cabinetWalletCreate_address")}
          </span>
        <span className={isKeyImport ? '' : 'active'}
              onClick={() => this.setState({isKeyImport: true})}>
          {getLang("cabinetWalletCreate_private_key")}
        </span>
      </h3>
      <form onSubmit={this.importWallet.bind(this)}>
        <UI.Input
          value={address}
          onChange={event => this.setState({address: event.currentTarget.value})}
        />
      </form>
      <center>
        <UI.Button onClick={this.importWallet.bind(this)}>
          {isKeyImport ? getLang("cabinetWallet_import_key") : getLang("cabinetWallet_import")}
        </UI.Button>
      </center>
    </div>
  }

  importWallet() {
    const {
      wallets, balances, onClose,
      web3SetData,
    } = this.props;
    const {address, isKeyImport} = this.state;
    this.setState({isLoading: true});
    (async () => {
      try {
        // Import wallet
        const network = 'BEP20';
        const data = isKeyImport
          ? await web3Backend.importPrivateKey(address, network)
          : await web3Backend.importWallet(address, network);
        wallets.push({
          address: data.address,
          network,
          isGenerated: false,
          bonus: data.bonus,
        });
        web3SetData({wallets});

        // Get the balance
        const balance = await web3Backend.getBalances(data.address);
        balances.push({
          address: data.address,
          items: balance,
        });
        web3SetData({balances});

        onClose();
      } catch (error) {
        console.error('[ImportWalletModal]', error);
        this.setState({
          isLoading: false,
          isError: true,
        });
      }
    })();
  }

  render() {
    const {onClose} = this.props;
    const {isLoading} = this.state;

    return <UI.Modal isOpen={true} onClose={onClose} className="ImportWalletModal">
      <UI.ModalHeader>
        {getLang("cabinetWalletImport_header")}
      </UI.ModalHeader>
      <div className="ImportWalletModal-content">
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
  currencies: state.cabinet.currencies,
}), dispatch => bindActionCreators({
  web3Update,
  web3SetData,
}, dispatch), null, {pure: true})(ImportWalletModal);
