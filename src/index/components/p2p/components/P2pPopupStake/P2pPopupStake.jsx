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
import './P2pPopupStake.less';

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
class P2pPopupStake extends React.PureComponent {
  static contextType = Web3Context;

  state = {
    value: '0',
    allowance: 0,
    balance: 0,
    isApproving: false,
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
    this.usdcContract = getTokenContract(usdc,
      true
    );
    
    this.getAllowance();
    const isStake = modal === 'stake';
    if (isStake) {
      getTokenBalance(usdc.address).then(balance => this.setState({
        balance: wei.from(balance, usdc.decimals),
      }));
    } else {
      this.setState({
        balance: wei.from(_.get(allowances, fiat.address, '0')),
      })
    }
  }

  async getAllowance() {
    const { fiat, modal } = this.props;
    const isStake = modal === 'stake';
    if (isStake) {
      const allowance = await this.usdcContract.getAllowance(
        this.contract.provider.network.contractAddresses.p2p.router
      );
      this.setState({ allowance });
    }
  }

  componentWillUnmount() {
    this._mount = false;
    this.contract && this.contract.stopWaiting();
    this.usdcContract && this.usdcContract.stopWaiting();
  }

  onApprove = async () => {
    const { isApproving, value } = this.state;
    if (isApproving) return;
    this.setState({ isApproving: true });

    try {
      const amount = Number(value) || 0;
      await this.usdcContract.approve(
        this.usdcContract.provider.network.contractAddresses.p2p.router,
        amount
      );
      if (!this._mount) return;
      this.setState({ allowance: amount, errorText: '' });
    } catch (error) {
      console.error('[onApprove]', error);
      if (!this._mount) return;
      this.usdcContract.stopWaiting();
      this.setState({ errorText: processError(error) });
    }
    this.setState({ isApproving: false });
  };

  onDeposit = async () => {
    const { toastPush, fiat, onClose, updateP2PAvailableForTrade } = this.props;
    const {
      getWeb3,
      network,
      getBSCScanLink,
      getTransactionReceipt,
      transaction,
    } = this.context;
    const {p2p} = network.contractAddresses;
    if (!p2p) return;
    
    const { balance } = fiat;
    const { isTransaction, value } = this.state;
    if (isTransaction) return;
    this.setState({ isTransaction: true });

    try {
      const amount = Number(value) || 0;
      const transactionAmount =
        getFixedNumber(amount, 18) >= getFixedNumber(balance, 18)
          ? balance
          : wei.to(getFixedNumber(amount, 18));
      const routerContract = new (getWeb3().eth.Contract)(
        require('src/index/constants/ABI/p2p/router'),
        p2p.router,
      );
      const tx = await transaction(routerContract, 'deposit', [
        transactionAmount,
        fiat.address,
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
      updateP2PAvailableForTrade(fiat.address, this.context);
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
    const { toastPush, fiat, onClose, updateP2PAvailableForTrade, allowances } = this.props;
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
      const transactionAmount = amount === wei.from(_.get(allowances, fiat.address, '0'))
        ? _.get(allowances, fiat.address, '0')
        : wei.to(getFixedNumber(amount, 18));
  
      const routerContract = new (getWeb3().eth.Contract)(
        require('src/index/constants/ABI/p2p/router'),
        p2p.router,
      );
      console.log('withdraw', [transactionAmount,
        fiat.address,]);
      const tx = await transaction(routerContract, 'withdraw', [
        transactionAmount,
        fiat.address,
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
      updateP2PAvailableForTrade(fiat.address, this.context);
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
      allowance,
      isApproving,
      isTransaction,
      errorText,
    } = this.state;
    const isStake = modal === 'stake';
    const Wrapper = adaptive ? BottomSheetModal : Modal;
    const amount = Number(value) || 0;

    const isAvailable = isStake
      ? allowance >= amount && amount && amount <= balance
      : amount && amount <= balance;

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
                  disabled={isTransaction || isApproving}
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
                      if (!isTransaction && !isApproving)
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
                  type={isAvailable ? 'secondary' : 'lightBlue'}
                  onClick={this.onApprove.bind(this)}
                  disabled={!amount || isAvailable || amount > balance}
                  state={isApproving ? 'loading' : ''}
                >
                  <Row alignItems="center">
                    {allowance >= amount
                      ? getLang('dapp_global_approved')
                      : getLang('dapp_global_approve')}
                    &nbsp;
                    {amount.toFixed(2)} LP
                    {allowance >= amount && (
                      <SVG
                        src={require('src/asset/icons/status/check_circle_success.svg')}
                        style={{ marginLeft: 5 }}
                      />
                    )}
                  </Row>
                </Button>
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
    allowances: state.dapp.p2p.available,
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
)(P2pPopupStake);
