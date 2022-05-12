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

// Styles
import './DexSwap.less';

const BALANCE_UPDATE_INTERVAL = 5000;
const RELATION_UPDATE_INTERVAL = 3000;

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
  };

  balanceUpdateInterval = null;
  relationUpdateInterval = null;

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
    this.relationUpdateInterval = setInterval(this.updateRelation.bind(this), RELATION_UPDATE_INTERVAL);
  }

  componentDidUpdate(prevProps, prevState) {
    this.fillDefaultPair();
    this.updateAccountAddress();
  }

  componentWillUnmount() {
    this._mount = false;
    clearInterval(this.balanceUpdateInterval);
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

    this.setState({
      pair: [
        this.state.pair[1],
        this.state.pair[0],
      ],
      amount0: 0,
      amount1: 0,
      relation: 1 / this.state.relation,
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
      const secondAmount = !index
        ? value * state.relation
        : value / state.relation;

      newState[`amount${second}`] = `${secondAmount}`;
      return newState;
    })
  }

  async updateRelation() {
    const {getTokensRelativePrice} = this.context;
    const {amount0, amount1, exactIndex, pair} = this.state;
    if (!pair || !pair.length) return;

    const token0 = pair[0];
    const token1 = pair[1];
    const relation = await getTokensRelativePrice(
      token0,
      token1,
    );

    if (!relation) return;
    if (token0.address !== _.get(this.state, 'pair[0].address')) return;
    if (token1.address !== _.get(this.state, 'pair[1].address')) return;

    this.setState(state => {
      if (!exactIndex) {
        return {
          relation,
          amount1: amount0 * relation,
        }
      } else {
        return {
          relation,
          amount0: amount1 / relation,
        }
      }
    });
  }

  setExact(index) {
    this.setState({
      exactIndex: index,
    })
  }

  render() {
    const {
      tokens,
      accountAddress,
      getPair,
      getTokensRelativePrice,
      getTokenUSDPrice,
      getTokenBalance,
    } = this.context;
    const {
      isPro,
      selectToken, pair,
      amount0, amount1,
      exactIndex,
    } = this.state;
    const switchTabs = [
      { value: 'swap', label: 'Swap' },
      { value: 'liquidity', label: 'Liquidity' },
      { value: 'transactions', label: 'Transactions' },
    ];

    return (
      <div className="DexSwap">
        <div className="DexSwap__container">
          <div className="DexSwap__header">
            <div className="DexSwap__row">
              <h1>Exchange</h1>
              {/*<Switch type="light-blue" on={isPro} onChange={togglePro} />*/}
              {/*<span className="switch-label">Pro Version</span>*/}
            </div>
            <div className="DexSwap__row">
              <p className="DexSwap__description">
                The Narfex token facilitates multiple tokenomics, serving as a
                utility token and governance token.
              </p>
            </div>
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
                              value={amount0}
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
                              value={amount1}
                              token={this.state.pair[1]}
                              setExact={() => this.setExact(1)}
                              label title={`You will receive ${exactIndex ? 'exact' : 'around'}`} />

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
                    return {
                      ...state,
                      selectToken: null,
                    }
                  })
                }}              onClose={() => this.setState({selectToken: null})}
                                {...this.context} />}
              </div>
            </CabinetBlock>
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
