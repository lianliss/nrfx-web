import "./Web3Wallets.less";

import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import getFinePrice from 'utils/get-fine-price';
import Lang from "components/Lang/Lang";
import {ContentBox, NumberFormat} from "ui";
import web3Backend from "services/web3-backend";
import {
  web3Update,
  web3SetData,
} from 'actions/cabinet/web3';
import {
  getCurrencyInfo,
} from 'actions';
import {
  Input,
  Button,
} from 'ui';
import {
  WEI_ETHER, NANO,
} from 'src/index/constants/cabinet';
import SVG from "utils/svg-wrap";
import CreateWalletModal from "../CreateWalletModal/CreateWalletModal";
import ImportWalletModal from "../ImportWalletModal/ImportWalletModal";
import DeleteWalletModal from "../DeleteWalletModal/DeleteWalletModal";
import PrivateKeyModal from "../PrivateKeyModal/PrivateKeyModal";
import {
  getLang,
} from 'utils';

class Web3Wallets extends React.PureComponent {

  state = {
    isCreateModal: false,
    isImportModal: false,
    isDeleteModal: false,
    isPrivateKeyModal: false,
  };

  componentDidMount() {
    this._mounted = true;

  }

  componentWillUnmount() {
    this._mounted = false;
  }

  renderBalance(balance, network) {
    const {currencies} = this.props;
    const {items} = balance;
    return Object.keys(items).map(token => {
      if (network === 'BEP20' && (token === 'wbnb' || token === 'ton')) return;
      const wei = items[token];
      const devider = network === 'BEP20' ? WEI_ETHER : NANO;
      const amount = Number(wei) / devider;
      const currency = currencies[token];
      let color = currency && currency.gradient
        ? `linear-gradient(0deg, ${currency.gradient[0]} 0%, ${currency.gradient[1]} 100%)`
        : currency && currency.color
          ? currency.color
          : '#00B277';
      return <div className="Web3Wallets-balance" key={token}>
        <div className="Web3Wallets-balance-circle" style={{
          background: color,
        }} />
        <div className="Web3Wallets-balance-amount">
        {getFinePrice(amount)}
        </div>
        <div className="Web3Wallets-balance-currency">
          {token}
        </div>
      </div>
    })
  }

  renderBalanceLoading = () => <div className="Web3Wallets-balances-loading">
    <SVG src={require(`asset/16px/spinner.svg`)} />
    <div className="Web3Wallets-balances-loading-text">
      {getLang("cabinetWallet_getting_balance")}
    </div>
  </div>;

  renderUnknownBalance = () => <div className="Web3Wallets-balances-unknown">
    {getLang("cabinetWallet_balance_unknown")}
  </div>;

  render() {
    const {
      wallets, balances,
      isWalletsLoaded,
      isBalancesLoaded,
    } = this.props;
    const {
      isCreateModal,
      isPrivateKeyModal,
      isImportModal,
      isDeleteModal,
    } = this.state;
    const networks = ['BEP20', 'TON'];

    return <>
    {networks.map(network => {
      const networkWallets = wallets.filter(w => w.network === network);
      const isGenerated = _.get(networkWallets, `[${networkWallets.length - 1}].isGenerated`, false);
      return <ContentBox className="Web3Wallets" key={network}>
        <h2>
          {getLang("cabinetWallet_header")} {network}
        </h2>
        <div className="Web3Wallets-addresses">
          {networkWallets.map(wallet => {
            const {address, isGenerated, network} = wallet;
            const balance = balances.find(balance => balance.address === address);
            return <div className="Web3Wallets-addresses-item" key={address}>
              <div className="Web3Wallets-addresses-item-body">
                <div className="Web3Wallets-addresses-item-left">
                  <div className="Web3Wallets-addresses-item-address">
                    {address}
                  </div>
                  <div className="Web3Wallets-balances">
                    {isBalancesLoaded
                      ? !!balance
                        ? this.renderBalance(balance, network)
                        : this.renderUnknownBalance()
                      : this.renderBalanceLoading()}
                  </div>
                </div>
                <div className="Web3Wallets-addresses-item-right">
                  {network}
                </div>
              </div>
            </div>
          })}
        </div>
        {networkWallets.length
          ? <div className="Web3Wallets-controls">
            <Button
              type="secondary"
              onClick={() => this.setState({isDeleteModal: true, network})}
              size="middle">
              {getLang("cabinetWallet_delete")}
            </Button>
            {isGenerated && <Button
              onClick={() => this.setState({isPrivateKeyModal: true, network})}
              size="middle">
              {getLang("cabinetWallet_key")}
            </Button>}
          </div>
          : <div className="Web3Wallets-controls">
            <Button
              type="secondary"
              onClick={() => this.setState({isImportModal: true, network})}
              size="middle">
              {getLang("cabinetWallet_import")}
            </Button>
            <Button
              onClick={() => this.setState({isCreateModal: true, network})}
              size="middle">
              {getLang("cabinetWallet_create")}
            </Button>
          </div>}
      </ContentBox>
    })}
    {isCreateModal && <CreateWalletModal network={this.state.network} onClose={() => this.setState({isCreateModal: false})} />}
    {isImportModal && <ImportWalletModal network={this.state.network} onClose={() => this.setState({isImportModal: false})} />}
    {isDeleteModal && <DeleteWalletModal network={this.state.network} onClose={() => this.setState({isDeleteModal: false})} />}
    {isPrivateKeyModal && <PrivateKeyModal network={this.state.network} onClose={() => this.setState({isPrivateKeyModal: false})} />}
    </>
  }
}

export default connect(state => ({
  wallets: state.web3.wallets,
  balances: state.web3.balances,
  isWalletsLoaded: state.web3.status.isWalletsLoaded,
  isBalancesLoaded: state.web3.status.isBalancesLoaded,
  currencies: state.cabinet.currencies,
  language: state.default.currentLang,
}), dispatch => bindActionCreators({
  web3Update,
  web3SetData,
}, dispatch), null, {pure: true})(Web3Wallets);
