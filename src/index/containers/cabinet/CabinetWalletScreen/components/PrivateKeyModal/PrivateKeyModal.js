import "./PrivateKeyModal.less";

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

class PrivateKeyModal extends React.PureComponent {

  state = {
    isLoading: false,
    isError: false,
    errorDescriptionKey: null,
    password: '',
    privateKey: null,
  };

  componentDidMount() {
    this._mounted = true;
    this.inputRef.focus();
  }

  componentDidUpdate() {
    this.inputRef && this.inputRef.focus();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  renderLoading() {
    return <div className="PrivateKeyModal-loading">
      <SVG src={require(`src/asset/cabinet/loading_34.svg`)} />
      <div className="PrivateKeyModal-loading-text">
        {getLang("cabinetWalletPrivate_loading")}
      </div>
    </div>
  }

  renderPrivateKey() {
    const {onClose} = this.props;
    const {privateKey} = this.state;
    return <div className="PrivateKeyModal-done">
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
          {getLang("cabinetWalletPrivate_close")}
        </UI.Button>
      </center>
    </div>
  }

  renderForm() {
    const {onClose} = this.props;
    const {password, errorDescriptionKey} = this.state;
    return <div className="PrivateKeyModal-form">
      <h3>
        {getLang("cabinetWalletPrivate_password")}
      </h3>
      <form onSubmit={this.getPrivateKey.bind(this)}>
        <UI.Input
          ref={r => this.inputRef = r}
          value={password}
          autofocus
          description={getLang(errorDescriptionKey || 'cabinetWalletPrivate_enter_password')}
          type="password"
          onChange={event => this.setState({password: event.currentTarget.value})}
        />
      </form>
      <center>
        <UI.Button onClick={this.getPrivateKey.bind(this)}>
          {getLang("cabinetWalletPrivate_submit")}
        </UI.Button>
      </center>
    </div>
  }

  getPrivateKey() {
    const {wallets} = this.props;
    const {password} = this.state;
    this.setState({isLoading: true});
    (async () => {
      try {
        const {address} = wallets[wallets.length - 1];
        const privateKey = await web3Backend.getPrivateKey(address, password);
        if (this._mounted) {
          this.setState({
            isLoading: false,
            privateKey,
          });
        }
      } catch (error) {
        console.error('[PrivateKeyModal]', error);
        this.setState({
          isLoading: false,
          isError: true,
          errorDescriptionKey: _.get(error, 'data.message'),
        });
      }
    })();
  }

  render() {
    const {onClose} = this.props;
    const {isLoading, privateKey} = this.state;

    return <UI.Modal isOpen={true} onClose={onClose} className="PrivateKeyModal">
      <UI.ModalHeader>
        {getLang("cabinetWalletPrivate_header")}
      </UI.ModalHeader>
      <div className="PrivateKeyModal-content">
        {isLoading
          ? this.renderLoading()
          : privateKey
            ? this.renderPrivateKey()
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
}, dispatch), null, {pure: true})(PrivateKeyModal);
