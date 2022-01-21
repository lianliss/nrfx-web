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
    const {address} = this.state;
    return <div className="ImportWalletModal-form">
      <h3>
        {getLang("cabinetWalletCreate_address")}
      </h3>
      <UI.Input
        value={address}
        onChange={address => this.setState({address})}
      />
      <center>
        <UI.Button onClick={this.importWallet.bind(this)}>
          Import
        </UI.Button>
      </center>
    </div>
  }

  importWallet() {
    const {wallets, balances, onClose} = this.props;
    const {address} = this.state;
    this.setState({isLoading: true});
    (async () => {
      try {
        // Create a wallet
        const network = 'BEP20';
        const wallet = await web3Backend.importWallet(address, network);
        wallets.push({
          address,
          network,
          isGenerated: false,
        });
        web3SetData({wallets});

        // Get the balance
        const balance = await web3Backend.getBalances(address);
        balances.push({
          address,
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
