import React from 'react';
import { connect } from 'react-redux';
import router from 'src/router';
import { bindActionCreators } from 'redux';
import { Web3Context } from 'services/web3Provider';
import wei from 'utils/wei';
import { updateP2PAvailableForTrade } from 'src/actions/dapp/p2p';
import _ from 'lodash';

import { LIQUIDITY } from 'src/index/constants/pages';

import {
  NumberFormat,
  Form,
  Button,
  Modal,
  BottomSheetModal,
  Row,
} from 'src/ui';
import SVG from 'utils/svg-wrap';
import { DappInput } from 'dapp';

// Utils
import { toastPush } from 'src/actions/toasts';
import { getLang, getFixedNumber } from 'src/utils';

// Styles
import './P2pPopupDeposit.less';

const processError = (error) => {
  const { message } = error;
  try {
    if (message.indexOf('Internal JSON-RPC error.') >= 0) {
      const internal = JSON.parse(message.split('Internal JSON-RPC error.')[1]);
      return internal.message;
    } else {
      return message;
    }
  } catch (err) {
    console.log('ERRR', err);
    return message;
  }
};

// Stake Modal - Can expand.
class P2pPopupDeposit extends React.PureComponent {
  static contextType = Web3Context;

  state = {
    value: '0',
    allowance: 0,
    balance: 0,
    isTransaction: false,
    errorText: '',
  };

  onChange = (value) => {
    this.setState({ value });
  };

  handleChange = (newValue) => {
    setValue(newValue);
  };

  handleSubmit = (e) => {
    const { toastPush, modal } = this.props;
    const { value } = this.state;

    e.preventDefault();

    if (modal === 'stake') {
      toastPush(`Staked ${value} LP`, 'farming');
    }

    if (modal === 'unstake') {
      toastPush(`Unstaked ${value} LP`, 'farming');
    }

    this.props.onClose();
  };

  componentDidMount() {
    this._mount = true;
    const { getTokenContract, tokens, chainId, getTokenBalance } = this.context;
    const { fiat, modal, allowances } = this.props;
    if (!fiat) {
      this.props.onClose();
      return;
    }
    const usdc = tokens.find(t => t.symbol === 'USDC');
    
    this.contract = getTokenContract(fiat,
      true
    );
    
    const isStake = modal === 'stake';
    if (isStake) {
      getTokenBalance(fiat.address).then(balance => this.setState({
        balance: wei.from(balance, fiat.decimals),
      }));
    } else {
      this.setState({
        balance: this.props.balance,
      })
    }
  }

  componentWillUnmount() {
    this._mount = false;
    this.contract && this.contract.stopWaiting();
  }

  onDeposit = async () => {
    const { toastPush, fiat, onClose, updateP2PAvailableForTrade } = this.props;
    const {
      getWeb3,
      network,
      getBSCScanLink,
      getTransactionReceipt,
      transaction,
    } = this.context;
    const {
      offerAddress,
    } = this.props;
    const {p2p} = network.contractAddresses;
    if (!p2p) return;
    
    const { isTransaction, value, balance } = this.state;
    if (isTransaction) return;
    this.setState({ isTransaction: true });

    try {
      const amount = Number(value) || 0;
      const transactionAmount =
        getFixedNumber(amount, 18) >= wei.to(getFixedNumber(balance, 18))
          ? wei.to(getFixedNumber(balance, 18))
          : wei.to(getFixedNumber(amount, 18));
      console.log('transactionAmount', transactionAmount, amount, balance);
      const tx = await this.contract.transaction('transfer', [
        offerAddress,
        transactionAmount,
      ]);
      console.log('transaction hash', tx, getBSCScanLink(tx));
      const receipt = await getTransactionReceipt(tx);
      console.log('transaction receipt', receipt);
      toastPush(
        `${getLang('dapp_farming_staked')} ${amount.toFixed(
          2
        )} ${fiat.symbol}`,
        'farming'
      );
      this.props.setLastUpdate(Date.now());
      if (!this._mount) return;
      onClose();
    } catch (error) {
      console.error('[onDeposit]', error);
      if (this._mount)
        this.setState({
          errorText: processError(error),
          isTransaction: false,
        });
    }
  };

  onWithdraw = async () => {
    const { toastPush, fiat, onClose, updateP2PAvailableForTrade } = this.props;
    const { isTransaction, value, balance } = this.state;
    const {
      getWeb3,
      network,
      getBSCScanLink,
      getTransactionReceipt,
      transaction,
    } = this.context;
    const {p2p} = network.contractAddresses;
    if (!p2p) return;
    if (isTransaction) return;
    this.setState({ isTransaction: true });

    try {
      const amount = Number(value) || 0;
      const transactionAmount =
        getFixedNumber(amount, 18) >= wei.to(getFixedNumber(balance, 18))
          ? wei.to(getFixedNumber(balance, 18))
          : wei.to(getFixedNumber(amount, 18));
      
      const contract = new (getWeb3().eth.Contract)(
        require('src/index/constants/ABI/p2p/buy'),
        this.props.offerAddress,
      );
      console.log('withdraw', [transactionAmount,
        fiat.address,]);
      const tx = await transaction(contract, 'withdraw', [
        transactionAmount,
      ]);
      console.log('transaction hash', tx, getBSCScanLink(tx));
      const receipt = await getTransactionReceipt(tx);
      console.log('transaction receipt', receipt);
      toastPush(
        `${getLang('dapp_farming_unstaked')} ${amount.toFixed(
          2
        )} ${fiat.symbol}`,
        'farming'
      );
      this.props.setLastUpdate(Date.now());
      if (!this._mount) return;
      onClose();
    } catch (error) {
      console.error('[onWithdraw]', error);
      if (this._mount)
        this.setState({
          errorText: processError(error),
          isTransaction: false,
        });
    }
  };

  render() {
    const { toastPush, adaptive, modal, fiat, onClose } = this.props;
    const { getTokenContract, addTokenToWallet, tokens } = this.context;
    if (!fiat) {
      onClose();
      return <></>;
    }
    const usdc = tokens.find(t => t.symbol === 'USDC');
    const {
      value,
      balance,
      isTransaction,
      errorText,
    } = this.state;
    const isStake = modal === 'stake';
    const Wrapper = adaptive ? BottomSheetModal : Modal;
    const amount = Number(value) || 0;

    const isAvailable = amount && amount <= balance;

    const title =
      modal === 'stake'
        ? getLang('dapp_farming_stake')
        : getLang('dapp_farming_unstake');

    return (
      <>
        <Wrapper
          className="FarmingPopup FarmingPopup__fullscreen FarmingPopupStake"
          {...this.props}
          skipClose
        >
          <div className="close" onClick={this.props.onClose}>
            <SVG src={require('src/asset/icons/close-popup.svg')} />
          </div>
          <div className="FarmingPopup__header">
            <div className="title">
              <span>
                {title}&nbsp;
                {getLang('dapp_global_tokens')}
              </span>
            </div>
          </div>
          <Form
            className="FarmingPopup__body"
            onSubmit={this.handleSubmit.bind(this)}
          >
            <label>
              <div className="FarmingPopup__label">
                <span className="default-text">{title}</span>
                <span className="default-text">
                  {getLang('dapp_global_balance')}:&nbsp;
                  <NumberFormat number={balance} />
                </span>
              </div>
              <div className="input-container">
                <DappInput
                  type="number"
                  disabled={isTransaction}
                  inputMode="decimal"
                  value={value}
                  onChange={this.onChange.bind(this)}
                  decimals={18}
                />
                <div className="input-controls">
                  <p className="default-text">
                    {isStake ? usdc.symbol : fiat.symbol}
                  </p>
                  <button
                    type="button"
                    className="input-controls__button"
                    onClick={() => {
                      if (!isTransaction)
                        this.setState({
                          value: balance,
                        });
                    }}
                  >
                    <span>{getLang('global_max')}</span>
                  </button>
                </div>
              </div>
            </label>
            {isStake ? (
              <>
                <Button
                  type={!isAvailable ? 'secondary' : 'lightBlue'}
                  onClick={this.onDeposit.bind(this)}
                  disabled={!isAvailable || isTransaction}
                  state={isTransaction ? 'loading' : ''}
                >
                  {getLang('dapp_farming_stake_button')}
                </Button>
              </>
            ) : (
              <Button
                type={!isAvailable ? 'secondary' : 'lightBlue'}
                onClick={this.onWithdraw.bind(this)}
                disabled={!isAvailable || isTransaction}
                state={isTransaction ? 'loading' : ''}
              >
                {getLang('dapp_farming_unstake_button')}
              </Button>
            )}
          </Form>
          <div className="FarmingPopup__footer FarmingPopup-footer">
            <div className="FarmingPopup-footer__info FarmingPopup-footer-info">
              <div className="FarmingPopup-footer-info__item">
                <SVG src={require('src/asset/icons/info.svg')} />
                <div>
                  <h6>{getLang('dapp_farming_stake_info_1_title')}</h6>
                  <p>{getLang('dapp_farming_stake_info_1_description')}</p>
                </div>
              </div>
              <div className="FarmingPopup-footer-info__item">
                <SVG src={require('src/asset/icons/info.svg')} />
                <div>
                  <h6>{getLang('dapp_farming_stake_info_2_title')}</h6>
                  <p>{getLang('dapp_farming_stake_info_2_description')}</p>
                  <a
                    href="https://docs.narfex.com/narfex/farming/farming"
                    target="_blank"
                  >
                    {getLang('dapp_farming_stake_info_read_more')} ›
                  </a>
                </div>
              </div>
            </div>
          </div>
          {!!errorText.length && (
            <div className="FarmingPopup__error">{errorText}</div>
          )}
        </Wrapper>
      </>
    );
  }
}

export default connect(
  (state) => ({
    adaptive: state.default.adaptive,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        toastPush,
        updateP2PAvailableForTrade,
      },
      dispatch
    ),
  null,
  { pure: true }
)(P2pPopupDeposit);
