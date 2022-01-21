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
} from 'actions/cabinet/web3';
import {
  getCurrencyInfo,
} from 'actions';
import {
  Input,
  Button,
} from 'ui';
import {
  WEI_ETHER,
} from 'src/index/constants/cabinet';
import SVG from "utils/svg-wrap";

class Web3Wallets extends React.PureComponent {

  componentDidMount() {
    this._mounted = true;

  }

  componentWillUnmount() {
    this._mounted = false;
  }

  renderBalance(balance) {
    const {currencies} = this.props;
    const {items} = balance;
    return Object.keys(items).map(token => {
      const wei = items[token];
      const amount = Number(wei) / WEI_ETHER;
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
    <div className="Web3Wallets-balances-loading-text">Получаем баланс</div>
  </div>;

  renderUnknownBalance = () => <div className="Web3Wallets-balances-loading">
    <div className="Web3Wallets-balances-loading-text">Баланс неизвестен</div>
  </div>

  render() {
    const {
      wallets, balances,
      isWalletsLoaded,
      isBalancesLoaded,
    } = this.props;

    return <ContentBox className="Web3Wallets">
      <div className="Web3Wallets-addresses">
        {wallets.map(wallet => {
          const {address, isGenerated, network} = wallet;
          const balance = balances.find(balance => balance.address === address);
          return <div className="Web3Wallets-addresses-item" key={address}>
            <div className="Web3Wallets-addresses-item-body">
              <div className="Web3Wallets-addresses-item-left">
                <h2>
                  {network} {!isGenerated && <small>Imported</small>}
                </h2>
                <div className="Web3Wallets-addresses-item-address">
                  {address}
                </div>
                <div className="Web3Wallets-addresses-balances">
                  {isBalancesLoaded
                    ? !!balance
                      ? this.renderBalance(balance)
                      : this.renderUnknownBalance()
                    : this.renderBalanceLoading()}
                </div>
              </div>
              <div className="Web3Wallets-addresses-item-right">
                {isGenerated && <Button size="small">Ключ</Button>}
              </div>
            </div>
          </div>
        })}
      </div>
    </ContentBox>
  }
}

export default connect(state => ({
  wallets: state.web3.wallets,
  balances: state.web3.balances,
  isWalletsLoaded: state.web3.status.isWalletsLoaded,
  isBalancesLoaded: state.web3.status.isBalancesLoaded,
  currencies: state.cabinet.currencies,
}), dispatch => bindActionCreators({
  web3Update,
}, dispatch), null, {pure: true})(Web3Wallets);
