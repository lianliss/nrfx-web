import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Components
import { Switch, SwitchTabs, Button } from 'src/ui';
import SVG from 'utils/svg-wrap';
import CabinetBlock from 'src/index/components/cabinet/CabinetBlock/CabinetBlock';
import DexSwapInput from './components/DexSwapInput/DexSwapInput';
import TokenSelect from './components/TokenSelect/TokenSelect';
import {Web3Context} from 'services/web3Provider';
import wei from 'utils/wei';
import getFinePrice from 'utils/get-fine-price';
import significant from 'utils/significant';
import { Fraction, JSBI } from '@pancakeswap/sdk';

// Styles
import './DexSwap.less';

const BALANCE_UPDATE_INTERVAL = 5000;
const LIQUIDITY_UPDATE_INTERVAL = 5000;

class DexSwap extends React.PureComponent {
  static contextType = Web3Context;

  state = {
    isPro: false,
    selectToken: null,
    pair: [],
    address: null,
    amount0: 0,
    amount1: 0,
    exactIndex: 0,
    relation: 1,
    pairAddress: null,
    reserves0: 0,
    reserves1: 0,
    executionPrice: null,
    slippageTolerance: 2,
  };

  balanceUpdateInterval = null;
  liquidityUpdateTimeout = null;

  togglePro = () => {
    this.setState({
      isPro: !this.state.isPro,
    })
  };

  componentDidMount() {
    this._mount = true;
    this.fillDefaultPair();
    this.updateAccountAddress();

    this.balanceUpdateInterval = setInterval(this.updateExchangeTokenBalance.bind(this), BALANCE_UPDATE_INTERVAL);
  }

  componentDidUpdate(prevProps, prevState) {
    this.fillDefaultPair();
    this.updateAccountAddress();

    const token0 = _.get(this.state, 'pair[0].address');
    const token1 = _.get(this.state, 'pair[1].address');
    const prevToken0 = _.get(prevState, 'pair[0].address');
    const prevToken1 = _.get(prevState, 'pair[1].address');
    if (token0 !== prevToken0 || token1 !== prevToken1) {
      this.updateLiquidity();
    }
  }

  componentWillUnmount() {
    this._mount = false;
    clearInterval(this.balanceUpdateInterval);
    clearTimeout(this.liquidityUpdateTimeout);
  }

  async updateLiquidity() {
    const {getPairs} = this.context;
    const token0 = _.get(this.state, 'pair[0]');
    const token1 = _.get(this.state, 'pair[1]');
    if (!token0 || !token1) return;

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
      console.error("Can't update liquidity", error);
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

    // Get default pair
    const token0 = window.localStorage.getItem('token0') || tokens[0].address;
    const token1 = window.localStorage.getItem('token1') || tokens[1].address;

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
      amount0: 0,
      amount1: 0,
      relation: 1 / this.state.relation,
      executionPrice: significant(trade.executionPrice),
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
        newState[`amount${second}`] = '0';
      }

      return newState;
    })
  }

  setExact(index) {
    this.setState({
      exactIndex: index,
    })
  }

  render() {
    const {
      isPro,
      selectToken, pair,
      amount0, amount1,
      exactIndex,
      slippageTolerance,
    } = this.state;
    const switchTabs = [
      { value: 'swap', label: 'Swap' },
      { value: 'liquidity', label: 'Liquidity' },
      { value: 'transactions', label: 'Transactions' },
    ];

    const isExactIn = !!exactIndex;
    const executionPrice = !!this.trade ? significant(this.trade.executionPrice) : '0';
    const inputAmount = !!this.trade ? this.trade.inputAmount.asFraction : new Fraction(JSBI.BigInt(0));
    const outputAmount = !!this.trade ? this.trade.outputAmount.asFraction : new Fraction(JSBI.BigInt(0));
    const slippageAmount = (new Fraction(JSBI.BigInt(slippageTolerance * 10), JSBI.BigInt(1000)))
      .multiply(outputAmount);
    const minimumReceive = outputAmount.subtract(slippageAmount);
    const maximumSpend = inputAmount.add(slippageAmount);
    const priceImpact = !!this.trade ? this.trade.priceImpact.asFraction : new Fraction(JSBI.BigInt(0));
    const path = !!this.trade ? this.trade.route.path : [];
    const route = path.map((token, index) => {
      return token.symbol === 'WBNB'
        && index
        && index !== path.length - 1
        ? 'BNB'
        : token.symbol;
    });

    return (
      <div className="DexSwap">
        <div className="DexSwap__container">
          <div className="DexSwap__header">
            <div className="DexSwap__row">
              <h1>Exchange</h1>
              {/*<Switch type="light-blue" on={isPro} onChange={togglePro} />*/}
              {/*<span className="switch-label">Pro Version</span>*/}
            </div>
            {/*<div className="DexSwap__row">*/}
              {/*<p className="DexSwap__description">*/}
                {/*The Narfex token facilitates multiple tokenomics, serving as a*/}
                {/*utility token and governance token.*/}
              {/*</p>*/}
            {/*</div>*/}
            {/*<div className="DexSwap__row">*/}
            {/*<SwitchTabs*/}
            {/*selected={switchTabs[0].value}*/}
            {/*tabs={switchTabs}*/}
            {/*onChange={() => {}}*/}
            {/*type="light-blue"*/}
            {/*/>*/}
            {/*</div>*/}
          </div>
          <div className="DexSwap__row">
            <CabinetBlock>
              <div className="DexSwap__form">
                <DexSwapInput onSelectToken={() => this.setState({selectToken: 0})}
                              onChange={value => this.onAmountChange(value, 0)}
                              value={amount0 || '0'}
                              token={this.state.pair[0]}
                              setExact={() => this.setExact(0)}
                              showBalance
                              label
                              title={`You will pay ${!exactIndex ? 'exact' : 'around'}`} />
                <SVG onClick={() => this.swapPair()}
                  src={require('src/asset/icons/cabinet/swap/swap-icon.svg')}
                />
                <DexSwapInput onSelectToken={() => this.setState({selectToken: 1})}
                              onChange={value => this.onAmountChange(value, 1)}
                              value={amount1 || '0'}
                              token={this.state.pair[1]}
                              setExact={() => this.setExact(1)}
                              label title={`You will receive ${exactIndex ? 'exact' : 'around'}`} />
                {!!Number(executionPrice) && <div className="DexSwap__Price">
                  <span>
                    Price
                  </span>
                  <span>
                    {executionPrice}
                    &nbsp;
                    {pair[1].symbol} per {pair[0].symbol}
                  </span>
                </div>}
                <div className="DexSwap__Slippage">
                  <span>
                    Slippage Tolerance
                  </span>
                  <span>
                    {slippageTolerance.toFixed(2)}%
                  </span>
                </div>
                <Button type="lightBlue">
                  <SVG src={require('src/asset/token/wallet.svg')} />
                  Buy on Narfex
                </Button>


                {!_.isNull(selectToken)
                && <TokenSelect onChange={value => {
                  const secondToken = selectToken === 1 ? 0 : 1;
                  this.setState(state => {
                    if (state.pair[secondToken].address === value.address) {
                      state.pair[secondToken] = state.pair[selectToken];
                    }
                    state.pair[selectToken] = value;
                    this.updateLiquidity();
                    return {
                      ...state,
                      selectToken: null,
                    }
                  })
                }}              onClose={() => this.setState({selectToken: null})}
                                {...this.context} />}
              </div>
            </CabinetBlock>
            {!!this.trade && <div className="DexSwap__description">
              <div className="DexSwap__description-item">
                <span>
                  {!isExactIn ? 'Minimum receive' : 'Maximum spend'}
                </span>
                <span>
                  {getFinePrice(Number(significant(!isExactIn ? minimumReceive : maximumSpend)))}
                  &nbsp;
                  {pair[Number(!exactIndex)].symbol}
                </span>
              </div>
              <div className="DexSwap__description-item">
                <span>
                  Price Impact
                </span>
                <span>
                  {(Number(significant(priceImpact)) * 100).toFixed(2)}%
                </span>
              </div>
              <div className="DexSwap__description-item">
                <span>
                  Route
                </span>
                <span>
                  {route.join(' > ')}
                </span>
              </div>
            </div>}
          </div>
          <div className="DexSwap__bg-center">
            <SVG
              src={require('src/asset/backgrounds/cabinet-swap/center-of-screen-fix.svg')}
            />
          </div>
        </div>
        <div className="DexSwap__bg">
          <SVG
            src={require('src/asset/backgrounds/cabinet-swap/right-of-screen-fix.svg')}
          />
        </div>
      </div>
    );
  }
}

export default DexSwap;
