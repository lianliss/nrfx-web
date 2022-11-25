import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { setSwap } from 'src/actions/dapp/swap';

// Components
import { Switch, SwitchTabs, Button, HoverPopup, } from 'src/ui';
import SwapSettings from './components/SwapSettings/SwapSettings';
import SVG from 'utils/svg-wrap';
import CabinetBlock from 'src/index/components/cabinet/CabinetBlock/CabinetBlock';
import DexSwapInput from './components/DexSwapInput/DexSwapInput';
import TokenSelect from './components/TokenSelect/TokenSelect';
import {Web3Context} from 'services/web3Provider';
import wei from 'utils/wei';
import getFinePrice from 'utils/get-fine-price';
import significant from 'utils/significant';
import { Fraction, JSBI } from '@pancakeswap/sdk';
import * as toast from 'actions/toasts';
import { openModal } from "src/actions"
import { getLang } from "utils";
import TestnetOverlay from 'src/index/components/dapp/TestnetOverlay/TestnetOverlay';
import DexDescription from '../../../components/dapp/DexDescription/DexDescription';

// Styles
import './DexSwap.less';

const BALANCE_UPDATE_INTERVAL = 5000;
const LIQUIDITY_UPDATE_INTERVAL = 5000;
const LIQUIDITY_PROVIDER_FEE = 0.25; // Fee in percents

const isNullOrNaN = value => _.isNull(value) || _.isNaN(value);

class DexSwap extends React.PureComponent {
  static contextType = Web3Context;

  state = {
    isPro: false,
    selectToken: null,
    isSettings: false,
    pair: [],
    address: null,
    amount0: undefined,
    amount1: undefined,
    exactIndex: 0,
    relation: 1,
    pairAddress: null,
    reserves0: 0,
    reserves1: 0,
    executionPrice: null,
    slippageTolerance: 2,
    deadline: 20,
    isSwappedPrice: false,
    transactions: window.localStorage
      .getItem('DexSwapTransactions')
      ? JSON.parse(window.localStorage.getItem('DexSwapTransactions'))
      : [],
    chainRequested: false,
    allowance: 0,
    isApproving: false,
  };

  balanceUpdateInterval = null;
  liquidityUpdateTimeout = null;

  togglePro = () => {
    this.setState({
      isPro: !this.state.isPro,
    })
  };

  setStateAsync = state => new Promise((fulfill, reject) => {
    if (this._mount) {
      this.setState(state, fulfill);
    } else {
      reject(false)
    }
  });

  async requireChain(id = 56) {
    const {chainId, isConnected, switchToChain, findTokenBySymbol, tokens} = this.context;
    if (!isConnected) return;
    if (this.chainRequested) return;
    this.chainRequested = true;
    if (chainId !== id) {
      console.log('[DexSwap][switchToChain]', id);
      const result = await switchToChain(id);
    }
    this.chainRequested = false;
  }

  setInitialAllowance = async () => {
    try {
      const {getTokenContract, routerAddress} = this.context;
      const token = _.get(this, 'state.pair[0]');
      if (!token) return;
      if (this.tokenContract) this.tokenContract.stopWaiting();
      this.tokenContract = getTokenContract(token);
      const allowance = await this.tokenContract.getAllowance(routerAddress);
      this.setState({
        allowance,
      });
    } catch (error) {
      console.error('[setInitialAllowance]', error);
      this.tokenContract.stopWaiting();
    }
  };

  componentDidMount() {
    this._mount = true;
    this.setState({
      lastChainId: this.context.chainId,
      lastIsConnected: this.context.isConnected,
    });
    this.fillDefaultPair();
    this.updateAccountAddress();

    this.balanceUpdateInterval = setInterval(this.updateExchangeTokenBalance.bind(this), BALANCE_UPDATE_INTERVAL);
    // this.requireChain();
    this.setInitialAllowance();
  }

  componentDidUpdate(prevProps, prevState) {
    const {findTokenBySymbol, chainId, isConnected} = this.context;
    //console.log('componentDidUpdate', chainId);
    // Modals Toggler.
    if(!this.state.isSettings && _.isNull(this.state.selectToken)) {
      this.props.closeModal();
    }else {
      this.props.openModal();
    }
    // -----

    this.fillDefaultPair();
    this.updateAccountAddress();

    const token0 = _.get(this.state, 'pair[0].address');
    const token1 = _.get(this.state, 'pair[1].address');
    const prevToken0 = _.get(prevState, 'pair[0].address');
    const prevToken1 = _.get(prevState, 'pair[1].address');
    if (token0 !== prevToken0 || token1 !== prevToken1) {
      if (isConnected) this.updateLiquidity();
    }
    if (token0 !== prevToken0) {
      if (isConnected) this.setInitialAllowance();
    }
    // this.requireChain();
    if (prevState.lastChainId !== chainId
      || prevState.lastIsConnected !== isConnected
    ) {
      this.setState(state => {
        const token0Symbol = _.get(state, 'pair[0].symbol');
        const token1Symbol = _.get(state, 'pair[1].symbol');
        const token0 = findTokenBySymbol(token0Symbol);
        const token1 = findTokenBySymbol(token1Symbol);
        if (token0 && token1) {
          return {
            ...state,
            lastChainId: chainId,
            lastIsConnected: isConnected,
            pair: [token0, token1]
          }
        } else {
          return {
            ...state,
            lastChainId: chainId,
            lastIsConnected: isConnected,
            pair: [tokens[0], tokens[1]],
          };
        }
      }, () => {
        this.setInitialAllowance();
        this.updateLiquidity();
      });
    }
  }

  componentWillUnmount() {
    this._mount = false;
    clearInterval(this.balanceUpdateInterval);
    clearTimeout(this.liquidityUpdateTimeout);
  }

  async updateLiquidity() {
    if (!this._mount) return;
    const {getPairs, isConnected, chainId} = this.context;
    if (!isConnected) return;
    const token0 = _.get(this.state, 'pair[0]');
    const token1 = _.get(this.state, 'pair[1]');
    if (!token0 || !token1) return;
    if (token0.chainId !== chainId || token1.chainId !== chainId) return;

    clearTimeout(this.liquidityUpdateTimeout);
    try {
      const pairs = await getPairs(token0, token1);
      if (this._mount
        && token0.address === _.get(this.state, 'pair[0].address')
        && token1.address === _.get(this.state, 'pair[1].address')) {
        this.pairs = pairs;
        this.updateTrade();
        this.liquidityUpdateTimeout = setTimeout(() => this.updateLiquidity(), LIQUIDITY_UPDATE_INTERVAL);
      }
    } catch (error) {
      if (error.message.indexOf('CHAIN_IDS') < 0) {
        console.error("[updateLiquidity] Can't update liquidity", error);
      }
      if (!this.liquidityUpdateTimeout) {
        this.liquidityUpdateTimeout = setTimeout(() => this.updateLiquidity(), LIQUIDITY_UPDATE_INTERVAL);
      }
    }
  }

  updateTrade(isUpdateState = true,
              token0 = _.get(this.state, 'pair[0]'),
              token1 = _.get(this.state, 'pair[1]'),
              isExactIn = !this.state.exactIndex,
              _amount = null,
              ) {
    const {amount0, amount1} = this.state;
    if (isNullOrNaN(Number(amount0)) && isNullOrNaN(Number(amount1))) return;

    const {getTrade} = this.context;
    const amount = !_.isNull(_amount) ? _amount : isExactIn
      ? _.get(this.state, 'amount0', 1)
      : _.get(this.state, 'amount1', 1);
    if (!token0 || !token1 || !amount || !this.pairs || !this.pairs.length) return;

    this.trade = getTrade(this.pairs, token0, token1, amount, isExactIn);
    if (!this.trade) return undefined;
    
    if (isUpdateState) {
      this.setState({
        executionPrice: this.trade.executionPrice.toSignificant(),
        amount0: significant(this.trade.inputAmount),
        amount1: significant(this.trade.outputAmount),
      })
    }
    return this.trade;
  }

  /**
   * Set the default pair from the local storage or tokens list if it's not exists
   */
  fillDefaultPair() {
    if (this.state.pair.length) return;

    // Check tokens list ready
    const {tokens} = this.context;
    if (!tokens || !tokens.length) return;

    const { dappSwap } = this.props;
    const defaultToken0 = tokens.filter(
      (token) =>
        token.symbol.toLowerCase() === dappSwap.from.symbol.toLowerCase()
    )[0];
    const defaultToken1 = tokens.filter(
      (token) =>
        token.symbol.toLowerCase() === dappSwap.to.symbol.toLowerCase()
    )[0];

    // Get default pair
    const token0 = defaultToken0.address || window.localStorage.getItem('token0') || tokens[0].address;
    const token1 = defaultToken1.address || window.localStorage.getItem('token1') || tokens[1].address;

    // Get user tokens from local storage
    let userTokens = [];
    try {
      userTokens = JSON.parse(window.localStorage.getItem('userTokens')) || [];
    } catch (error) {
      // No user tokens found
    }

    // Fill the pairs with a full data
    const allTokens = [...userTokens, ...tokens];
    this.setState({
      pair: [
        allTokens.find(t => t.address === token0),
        allTokens.find(t => t.address === token1),
      ]
    })
  }

  updateAccountAddress() {
    const {address} = this.state;
    const {accountAddress} = this.context;

    if (address !== accountAddress) {
      this.setState({
        address: accountAddress,
      })
    }
  }

  /**
   * Swap the pair
   */
  swapPair() {
    if (!this.state.pair.length) return;

    console.log('swapPair');
    const trade = this.updateTrade(
      false,
      this.state.pair[1],
      this.state.pair[0],
      !this.state.exactIndex,
      this.state.exactIndex
        ? this.state.amount1
        : this.state.amount0,
    );
    this.setState({
      pair: [
        this.state.pair[1],
        this.state.pair[0],
      ],
      amount0: this.state.amount1,
      amount1: this.state.amount0,
      exactIndex: Number(!this.state.exactIndex),
      executionPrice: significant(_.get(trade, 'executionPrice', 0)),
      isSwappedPrice: false,
    })
  }

  async updateExchangeTokenBalance() {
    try {
      const {isConnected, getTokenBalance} = this.context;
      const {pair} = this.state;
      if (!isConnected) return;
      if (!pair.length) return;

      const symbol = _.get(this.state, 'pair[0].symbol');
      const balance = await getTokenBalance(pair[0].address);

      this.setState(state => {
        if (symbol === _.get(state, 'pair[0].symbol')
          && balance !== _.get(state, 'pair[0].balance')) {
          return {
            ...state,
            pair: [
              {
                ...pair[0],
                balance,
              },
              pair[1]
            ]
          }
        }
      });
    } catch (error) {
      console.error('[updateExchangeTokenBalance]', error);
    }
  }

  onAmountChange(value, index) {
    this.setState(state => {
      const newState = {};
      newState[`amount${index}`] = value;
      newState.exactIndex = Number(index);
      const second = Number(!index);

      const trade = this.updateTrade(false, undefined, undefined, !index, value);

      if (trade) {
        newState.executionPrice = significant(trade.executionPrice);
        newState[`amount${second}`] = !index
          ? significant(trade.outputAmount)
          : significant(trade.inputAmount);
      } else {
        newState[`amount${second}`] = undefined;
      }

      return newState;
    })
  }

  setExact(index) {
    this.setState({
      exactIndex: index,
    })
  }

  async executeTrade() {
    const {swap, getTransactionReceipt} = this.context;
    const {trade} = this;
    const {pair, exactIndex, slippageTolerance} = this.state;
    const isExactIn = !exactIndex;

    try {
      const txHash = await swap(pair, trade, slippageTolerance, isExactIn);
      const receipt = await getTransactionReceipt(txHash);
      console.log('[executeTrade]', txHash, receipt);

      // Save transactions to localStorage
      const record = window.localStorage.getItem('DexSwapTransactions');
      let transactions = record ? JSON.parse(record) : [];
      transactions = [
        {
          txHash,
          token0: pair[0].symbol,
          token1: pair[1].symbol,
          amount0: Number(trade.inputAmount.asFraction.toFixed(10)),
          amount1: Number(trade.outputAmount.asFraction.toFixed(10)),
          date: new Date(),
          accountAddress: this.context.accountAddress
        },
        ...transactions,
      ];
      window.localStorage.setItem('DexSwapTransactions', JSON.stringify(transactions));
      this.setState({transactions});

      toast.success(getLang('status_success'));
    } catch (error) {
      toast.warning('Transaction error');
      console.log('[executeTrade] error', error.code, error.message, error.name);
    }
  }

  async approve() {
    const {isApproving, amount0} = this.state;
    const {tokens, getTokenContract, routerAddress} = this.context;
    const {poolAddress} = this.props;

    if (isApproving) return;
    this.setState({isApproving: true});
    const token = _.get(this, 'state.pair[0]');
    this.tokenContract = getTokenContract(token);
    const amount = Number(amount0) || 0;
    const maxApprove = 10**9;

    try {
      await this.tokenContract.approve(routerAddress, amount > maxApprove ? amount : maxApprove);
      this.setState({
        allowance: amount > maxApprove ? amount : maxApprove,
      });
    } catch (error) {
      console.error('[onApprove]', error);
      this.tokenContract.stopWaiting();
    }
    this.setState({isApproving: false});
  }

  onSelectToken = index => {
    const { isConnected } = this.context;

    if (!isConnected) {
      openModal('connect_to_wallet');
    } else {
      this.setState({ selectToken: index });
    }
  };

  render() {
    const {
      isPro,
      selectToken, pair,
      amount0, amount1,
      isSettings,
      exactIndex,
      slippageTolerance,
      transactions,
      isSwappedPrice,
      allowance,
      isApproving,
    } = this.state;
    const {
      isConnected,
      connectWallet,
      tokens,
      numberToFraction
    } = this.context;
    const switchTabs = [
      { value: 'swap', label: 'Swap' },
      { value: 'liquidity', label: 'Liquidity' },
      { value: 'transactions', label: 'Transactions' },
    ];

    const isExactIn = !exactIndex;
    const executionPrice = !!this.trade ? significant(this.trade.executionPrice) : '0';
    const inputAmount = !!this.trade ? this.trade.inputAmount.asFraction : new Fraction(JSBI.BigInt(0));
    const outputAmount = !!this.trade ? this.trade.outputAmount.asFraction : new Fraction(JSBI.BigInt(0));

    const slippageFraction = numberToFraction(slippageTolerance).divide(100);
    const slippageAmount = !this.trade ? new Fraction(JSBI.BigInt(0)) : isExactIn
      ? outputAmount.multiply(slippageFraction)
      : inputAmount.multiply(slippageFraction);
    const minimumReceive = outputAmount.subtract(slippageAmount);
    const maximumSpend = inputAmount.add(slippageAmount);

    const priceImpact = !!this.trade ? this.trade.priceImpact.asFraction : new Fraction(JSBI.BigInt(0));
    const priceImpactNumber = Number(significant(priceImpact)) * 100;
    let priceImpactColor = '';
    if (priceImpactNumber < 1) priceImpactColor = 'green';
    if (priceImpactNumber >= 3) priceImpactColor = 'yellow';
    if (priceImpactNumber >= 5) priceImpactColor = 'red';

    const path = !!this.trade ? this.trade.route.path : [];
    const route = path.map((token, index) => {
      return token.symbol === 'WBNB'
        && index
        && index !== path.length - 1
        || (!index && !_.get(this.state.pair, '[0].address'))
        || (index === path.length - 1 && !_.get(this.state.pair, '[1].address'))
        ? 'BNB'
        : token.symbol;
    });
    const balance = wei.from(_.get(this.state.pair, '[0].balance', '0'));
    const fee = Number(amount0)
      ? amount0 * LIQUIDITY_PROVIDER_FEE * (route.length - 1) / 100
      : 0;

    const amount = Number(amount0) || 0;
    const isAvailable = allowance >= amount && amount;

    let button = <Button type="lightBlue" onClick={() => openModal('connect_to_wallet')}>
      <SVG src={require('src/asset/token/wallet.svg')} />
      {getLang('dex_button_connect_wallet')}
    </Button>;
    if (isConnected) {
      if (Number(amount0)) {
        if (Number(amount0) > balance) {
          button = <Button type="secondary" disabled>
            {getLang('dex_button_insufficient_balance')}
          </Button>
        } else {
          button = <>
          {!isAvailable && <Button type={isAvailable ? 'secondary' : 'lightBlue'}
                                   state={isApproving ? 'loading' : ''}
                                   onClick={this.approve.bind(this)}>
            Approve
          </Button>}
          <Button type={!isAvailable ? 'secondary' : 'lightBlue'}
                  disabled={!isAvailable}
                  className="DexSwap__button-swap"
                  onClick={() => this.executeTrade()}>
            <SVG src={require('src/asset/icons/convert-card.svg')} />
            {priceImpactNumber >= 5 ? getLang('dex_button_swap_anyway') : getLang('dex_button_buy')}
          </Button>
          </>
        }
      } else {
        button = <Button type="secondary" disabled>
          {getLang('dex_button_enter_amount')}
        </Button>
      }
    }

    return (
      <div className="DexSwap">
        <CabinetBlock>
          <div className="DexSwap__form">
            <DexSwapInput
              onSelectToken={() => this.onSelectToken(0)}
              onChange={(value) => this.onAmountChange(value, 0)}
              value={amount0}
              token={this.state.pair[0]}
              setExact={() => this.setExact(0)}
              showBalance
              label
              title={getLang(!exactIndex ? 'dex_pay_exact' : 'dex_pay_around')}
              manage={
                <div
                  className="DexSwap__manage"
                  onClick={() => this.setState({isSettings: true})}
                >
                  <SVG src={require('src/asset/icons/cabinet/settings.svg')} />
                </div>
              }
            />
            <SVG
              onClick={() => this.swapPair()}
              src={require('src/asset/icons/cabinet/swap/swap-icon.svg')}
            />
            <DexSwapInput
              onSelectToken={() => this.onSelectToken(1)}
              onChange={(value) => this.onAmountChange(value, 1)}
              value={amount1}
              token={this.state.pair[1]}
              setExact={() => this.setExact(1)}
              label
              title={getLang(
                exactIndex ? 'dex_receive_exact' : 'dex_receive_around'
              )}
            />
            {!!Number(executionPrice) && (
              <div className="DexSwap__Price">
                <span>{getLang('dex_price')}</span>
                <span>
                  {getFinePrice(
                    Number(isSwappedPrice ? 1 / executionPrice : executionPrice)
                  )}
                  &nbsp;
                  {pair[Number(!isSwappedPrice)].symbol} {getLang('dex_per')}{' '}
                  {pair[Number(isSwappedPrice)].symbol}
                </span>
                <div
                  className="DexSwap__Price-swap"
                  onClick={() =>
                    this.setState({ isSwappedPrice: !isSwappedPrice })
                  }
                >
                  <SVG src={require('src/asset/icons/swap.svg')} />
                </div>
              </div>
            )}
            {button}

            {!!this.trade && !!Number(amount0) && (
              <DexDescription>
                <DexDescription.Item className="DexSwap__description-item">
                  <span>
                    {isExactIn
                      ? getLang('dex_minimum_receive')
                      : getLang('dex_maximum_spend')}
                    <HoverPopup
                      content={
                        <div className="DexSwap__hint">
                          {getLang('dex_notice_price_movement')}
                        </div>
                      }
                    >
                      <SVG
                        src={require('src/asset/icons/cabinet/question-icon.svg')}
                        className="FarmingTableItem__action_icon"
                      />
                    </HoverPopup>
                  </span>
                  <span>
                    {getFinePrice(
                      Number(
                        significant(isExactIn ? minimumReceive : maximumSpend)
                      )
                    )}
                    &nbsp;
                    {pair[Number(!exactIndex)].symbol}
                  </span>
                </DexDescription.Item>
                <DexDescription.Item>
                  <span>
                    {getLang('dex_price_impact')}
                    <HoverPopup
                      content={
                        <div className="DexSwap__hint">
                          {getLang('dex_price_impact_hint')}
                        </div>
                      }
                      type="top"
                    >
                      <SVG
                        src={require('src/asset/icons/cabinet/question-icon.svg')}
                        className="FarmingTableItem__action_icon"
                      />
                    </HoverPopup>
                  </span>
                  <span className={priceImpactColor}>
                    {priceImpactNumber.toFixed(2)}%
                  </span>
                </DexDescription.Item>
                <DexDescription.Item>
                  <span>
                    {getLang('dex_liquidity_fee')}
                    {/*<HoverPopup content={<div className="DexSwap__hint">*/}
                    {/*{getLang('dex_liquidity_fee_hint')}*/}
                    {/*</div>}>*/}
                    {/*<SVG*/}
                    {/*src={require('src/asset/icons/cabinet/question-icon.svg')}*/}
                    {/*className="FarmingTableItem__action_icon"*/}
                    {/*/>*/}
                    {/*</HoverPopup>*/}
                  </span>
                  <span>
                    {getFinePrice(fee)}{' '}
                    {_.get(this.state, 'pair[0].symbol', '')}
                  </span>
                </DexDescription.Item>
              </DexDescription>
            )}

            {!_.isNull(selectToken) && (
              <TokenSelect
                onChange={(value) => {
                  const secondToken = selectToken === 1 ? 0 : 1;
                  this.setState((state) => {
                    if (state.pair[secondToken].address === value.address) {
                      state.pair[secondToken] = state.pair[selectToken];
                    }
                    state.pair[selectToken] = value;
                    this.props.setSwap(secondToken === 1 && value, secondToken === 0 && value);
                    return {
                      ...state,
                      selectToken: null,
                      isSwappedPrice: false,
                    };
                  }, () => {
                    this.updateLiquidity();
                    this.setInitialAllowance();
                  });
                }}
                onClose={() => this.setState({ selectToken: null })}
                selected={this.state.pair[selectToken]}
                disableSwitcher
                {...this.context}
              />
            )}
            {isSettings && (
              <SwapSettings
                slippageTolerance={this.state.slippageTolerance}
                deadline={this.state.deadline}
                setSlippage={value => this.setState({slippageTolerance: value})}
                setDeadline={value => this.setState({deadline: value})}
                onClose={() => this.setState({ isSettings: false })}
              />
            )}
          </div>
        </CabinetBlock>
        {(!!route && !!route.length) && <div className="DexSwap__route">
          <h3>
            <span>{getLang('dex_route')}</span>
            <HoverPopup
              content={
                <div className="DexSwap__hint">{getLang('dex_route_hint')}</div>
              }
            >
              ?
            </HoverPopup>
          </h3>
          <div className="DexSwap__route-container">
            {route.map((symbol, index) => {
              const token = tokens.find((t) => t.symbol === symbol);
              const logo = _.get(token, 'logoURI', '');
              return (
                <div className="DexSwap__route-symbol" key={symbol}>
                  {!!index && (
                    <SVG
                      src={require('src/asset/icons/triangle-right.svg')}
                      className="DexSwap__route-arrow"
                    />
                  )}
                  <div
                    className="DexSwap__route-logo"
                    style={{ backgroundImage: `url('${logo}')` }}
                  />
                  <span>{symbol}</span>
                </div>
              );
            })}
          </div>
        </div>}
        {/*{!!transactions.length && <div className="DexSwap__description">*/}
        {/*<h3>*/}
        {/*{getLang('dex_last_transactions')}*/}
        {/*</h3>*/}
        {/*{transactions.map(item => {*/}
        {/*const {txHash, token0, token1, amount0, amount1} = item;*/}
        {/*const link = `https://bscscan.com/tx/${txHash}`;*/}

        {/*return <div className="DexSwap__description-item" key={txHash}>*/}
        {/*<span>*/}
        {/*<a href={link} target="_blank">{txHash}</a>*/}
        {/*</span>*/}
        {/*<span>*/}
        {/*{getFinePrice(amount0)} {token0} > {getFinePrice(amount1)} {token1}*/}
        {/*</span>*/}
        {/*</div>*/}
        {/*})}*/}
        {/*</div>}*/}
        <TestnetOverlay mainnetOnly />
      </div>
    );
  }
}

DexSwap.defaultProps = {
  closeModal: () => {},
  openModal: () => {},
};

export default connect(
  (state) => ({
    currentLang: state.default.currentLang,
    dappSwap: state.dapp.swap,
  }),
  (dispatch) => {
    return {
      setSwap: (from, to) => {
        dispatch(setSwap(from, to))
      },
    }
  }
)(DexSwap);
