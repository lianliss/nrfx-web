import React from 'react';
import { connect } from 'react-redux';
import router from 'src/router';
import { bindActionCreators } from 'redux';
import { Web3Context } from 'services/web3Provider';
import wei from 'utils/wei';
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
import './FarmingPopupStake.less';

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
class FarmingPopupStake extends React.PureComponent {
  static contextType = Web3Context;

  state = {
    value: '0',
    allowance: 0,
    token0Symbol: '???',
    token1Symbol: '???',
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
    const { getTokenContract, tokens, chainId } = this.context;
    const { pool } = this.props;
    if (!pool) {
      this.props.onClose();
      return;
    }

    this.contract = getTokenContract(
      {
        address: pool.address,
        symbol: 'LP',
        chainId: chainId,
        decimals: 18,
      },
      true
    );

    // Get right token symbols
    Promise.all([
      this.getTokenSymbol(pool.token0),
      this.getTokenSymbol(pool.token1),
    ]).then((symbols) => {
      this.setState({
        token0Symbol: symbols[0],
        token1Symbol: symbols[1],
      });
    });
    this.getAllowance();
  }

  async getAllowance(address) {
    const allowance = await this.contract.getAllowance(
      this.contract.provider.network.contractAddresses.masterChefAddress
    );
    this.setState({ allowance });
  }

  async getTokenSymbol(address) {
    const { getTokenContract, tokens } = this.context;
    const knownToken = tokens.find((t) => t.address === address);
    if (knownToken) {
      return knownToken.symbol;
    } else {
      const contract = getTokenContract({ address });
      return await contract.getSymbol();
    }
  }

  componentWillUnmount() {
    this._mount = false;
    this.contract && this.contract.stopWaiting();
  }

  onApprove = async () => {
    const { isApproving, value } = this.state;
    if (isApproving) return;
    this.setState({ isApproving: true });

    try {
      const amount = Number(value) || 0;
      await this.contract.approve(
        this.contract.provider.network.contractAddresses.masterChefAddress,
        amount
      );
      if (!this._mount) return;
      this.setState({ allowance: amount, errorText: '' });
    } catch (error) {
      console.error('[onApprove]', error);
      if (!this._mount) return;
      this.contract.stopWaiting();
      this.setState({ errorText: processError(error) });
    }
    this.setState({ isApproving: false });
  };

  onDeposit = async () => {
    const { toastPush, pool, onClose } = this.props;
    const { balance } = pool;
    const { isTransaction, value, token1Symbol, token0Symbol } = this.state;
    const {
      getFarmContract,
      getBSCScanLink,
      getTransactionReceipt,
      updatePoolData,
      referAddress,
    } = this.context;
    if (isTransaction) return;
    this.setState({ isTransaction: true });

    try {
      const amount = Number(value) || 0;
      const balanceInEth = wei.from(balance);
      const transactionAmount =
        getFixedNumber(amount, 18) >= getFixedNumber(balanceInEth, 18)
          ? balance
          : wei.to(getFixedNumber(amount, 18));
      const farm = getFarmContract();
      const tx = await farm.transaction('deposit', [
        pool.address,
        transactionAmount,
        referAddress || '0x0000000000000000000000000000000000000000',
      ]);
      console.log('transaction hash', tx, getBSCScanLink(tx));
      const receipt = await getTransactionReceipt(tx);
      console.log('transaction receipt', receipt);
      updatePoolData(pool);
      toastPush(
        `${getLang('dapp_farming_staked')} ${amount.toFixed(
          2
        )} ${token1Symbol}-${token0Symbol}`,
        'farming'
      );
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
    const { toastPush, pool, onClose } = this.props;
    const { userPool } = pool;
    const { isTransaction, value, token1Symbol, token0Symbol } = this.state;
    const {
      getFarmContract,
      getBSCScanLink,
      getTransactionReceipt,
      updatePoolData,
    } = this.context;
    if (isTransaction) return;
    this.setState({ isTransaction: true });

    try {
      const amount = Number(value) || 0;
      const poolInEth = wei.from(userPool);
      const transactionAmount =
        getFixedNumber(amount, 18) >= getFixedNumber(poolInEth, 18)
          ? userPool
          : wei.to(getFixedNumber(amount, 18));

      const farm = getFarmContract();
      const tx = await farm.transaction('withdraw', [
        pool.address,
        transactionAmount,
      ]);
      console.log('transaction hash', tx, getBSCScanLink(tx));
      const receipt = await getTransactionReceipt(tx);
      console.log('transaction receipt', receipt);
      updatePoolData(pool);
      toastPush(
        `${getLang('dapp_farming_unstaked')} ${amount.toFixed(
          2
        )} ${token1Symbol}-${token0Symbol}`,
        'farming'
      );
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
    const { toastPush, adaptive, modal, pool } = this.props;
    const { getTokenContract, addTokenToWallet } = this.context;
    const {
      value,
      token0Symbol,
      token1Symbol,
      allowance,
      isApproving,
      isTransaction,
      errorText,
    } = this.state;
    const isStake = modal === 'stake';
    const Wrapper = adaptive ? BottomSheetModal : Modal;
    const weiBalance = _.get(pool, 'balance', '0');
    const balance = getFixedNumber(wei.from(weiBalance), 18);
    const amount = Number(value) || 0;
    const weiUserPool = _.get(pool, 'userPool', '0');
    const userPool = getFixedNumber(wei.from(weiUserPool), 18);

    const isAvailable = isStake
      ? allowance >= amount && amount && amount <= balance
      : amount && amount <= userPool;

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
                  <NumberFormat number={isStake ? balance : userPool} />
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
                    {token0Symbol}-{token1Symbol}
                  </p>
                  <button
                    type="button"
                    className="input-controls__button"
                    onClick={() => {
                      if (!isTransaction && !isApproving)
                        this.setState({
                          value: isStake ? balance : userPool,
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
            {isStake && (
              <Row
                alignItems="center"
                justifyContent="center"
                className="popup-link"
                onClick={() => {
                  router.navigate(LIQUIDITY, {
                    token0: token0Symbol,
                    token1: token1Symbol,
                  });
                }}
              >
                <span>
                  {getLang('dapp_global_get')} {token0Symbol}-{token1Symbol}
                </span>
                <SVG src={require('src/asset/icons/export.svg')} />
              </Row>
            )}
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
                  <a href="">
                    {getLang('dapp_farming_stake_info_read_more')} ›
                  </a>
                </div>
              </div>
            </div>
            {/* <span
              className="popup-link"
              onClick={() =>
                addTokenToWallet({
                  address: _.get(pool, 'address'),
                  symbol: `${token0Symbol}-${token1Symbol}`,
                  image:
                    'https://pancake.kiemtienonline360.com/images/coins/0xf9f93cf501bfadb6494589cb4b4c15de49e85d0e.png',
                })
              }
            >
              Add token to Metamask&nbsp;
              <SVG src={require('src/asset/icons/export.svg')} />
            </span> */}
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
      },
      dispatch
    ),
  null,
  { pure: true }
)(FarmingPopupStake);
