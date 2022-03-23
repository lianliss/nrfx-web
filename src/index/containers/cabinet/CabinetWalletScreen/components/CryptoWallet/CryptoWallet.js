import "./CryptoWallet.less";

import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from "react-router5";
import _ from 'lodash';

import getFinePrice from 'utils/get-fine-price';
import Lang from "components/Lang/Lang";
import web3Backend from "services/web3-backend";

import {
  web3StatusSelector,
  web3BalancesSelector,
  web3RatesSelector,
} from "src/selectors";

import {
  web3Update,
  web3SetData,
  web3SetRate,
} from 'actions/cabinet/web3';
import * as UI from "ui";
import SVG from "utils/svg-wrap";
import {
  getLang,
} from 'utils';

import {
  WEI_ETHER,
} from 'src/index/constants/cabinet';
import currenciesObject from 'src/currencies';

import TransferModal from '../TransferModal/TransferModal';
import {web3WalletsSelector} from "../../../../../../selectors";

import * as pages from "src/index/constants/pages";
import { walletSwapSetCurrency } from "src/actions/cabinet/wallet";

class CryptoWallet extends React.PureComponent {

  state = {
    isTransferModal: false,
  };

  componentDidMount() {
    this._mounted = true;
    this.checkRates();
  }

  componentDidUpdate() {
    this.checkRates();
  }

  checkRates() {
    const currency = _.get(this, 'props.route.params.currency');
    const {web3Rates, web3SetRate} = this.props;
    const rate = web3Rates[currency];

    if (typeof rate === 'undefined') {
      web3SetRate(currency, false);

      web3Backend.getTokenRate(currency).then(data => {
        web3SetRate(currency, Number(data.price));
      })
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    const {
      web3Balances,
      web3Rates,
      web3Wallets,
    } = this.props;
    const {
      isTransferModal,
    } = this.state;
    const currency = _.get(this, 'props.route.params.currency');
    const balance = _.get(web3Balances, `[0].items.${currency}`, 0) / WEI_ETHER;
    const rate = web3Rates[currency];
    const currencyInfo = currenciesObject[currency];
    const wallet = web3Wallets[0];
    const isGenerated = _.get(wallet, 'isGenerated', false);

    return <UI.ContentBox className="CryptoWallet">
      <h2>
        <span>
          {_.get(currencyInfo, 'name', currency)}
        </span>
        {isGenerated && 
          <>
            <Link routeName={pages.WALLET_SWAP} className="ButtonToWalletBuy">
              <UI.Button
                size="middle"
                onClick={() => {
                  this.props.walletSwapSetCurrency("to", currency);
                }}
              >
                {getLang("buy")}
              </UI.Button>
            </Link>
            <UI.Button
              onClick={() => this.setState({isTransferModal: true})}
              size="middle">
              {getLang("cabinetWallet_transfer")}
            </UI.Button>
          </>
        }
      </h2>
      <div className="CryptoWallet-balance">
        <div className="CryptoWallet-balance-token">
          <UI.CircleIcon size="medium" currency={currencyInfo} />
          <span>
            <UI.NumberFormat number={getFinePrice(balance)} currency={currency} />
          </span>
        </div>
        <div className="CryptoWallet-balance-usd">
          {!!rate && <UI.NumberFormat roughly number={rate * balance} currency="usd" />}
        </div>
      </div>
      {isTransferModal && <TransferModal
        currency={currency}
        balance={balance}
        onClose={() => this.setState({isTransferModal: false})} />}
    </UI.ContentBox>
  }
}

export default connect(state => ({
  web3Status: web3StatusSelector(state),
  web3Wallets: web3WalletsSelector(state),
  web3Balances: web3BalancesSelector(state),
  web3Rates: web3RatesSelector(state),
  route: state.router.route,
}), dispatch => bindActionCreators({
  web3Update,
  web3SetData,
  web3SetRate,
  walletSwapSetCurrency: (type, currency) => {
    return walletSwapSetCurrency(type, currency)
  }
}, dispatch), null, {pure: true})(CryptoWallet);
