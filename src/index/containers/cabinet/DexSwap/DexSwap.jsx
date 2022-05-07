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

class DexSwap extends React.PureComponent {
  static contextType = Web3Context;

  state = {
    isPro: false,
    selectToken: 0,
    pair: [],
  };

  togglePro = () => {
    this.setState({
      isPro: !this.state.isPro,
    })
  };

  componentDidMount() {
    this._mount = true;
    this.fillDefaultPair();
  }

  componentDidUpdate() {
    this.fillDefaultPair();
  }

  componentWillUnmount() {
    this._mount = false;
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

  /**
   * Swap the pair
   */
  swapPair() {
    if (this.state.pair.length) return;

    this.setState({
      pair: [
        this.state.pair[1],
        this.state.pair[0],
      ]
    })
  }

  render() {
    const {isPro, selectToken, pair} = this.state;
    const switchTabs = [
      { value: 'swap', label: 'Swap' },
      { value: 'liquidity', label: 'Liquidity' },
      { value: 'transactions', label: 'Transactions' },
    ];

    console.log('pair', pair);

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
                              token={this.state.pair[0]}
                               label manage title="Exchange" rate={1454.5583} />
                <SVG onClick={() => this.swapPair()}
                  src={require('src/asset/icons/cabinet/swap/swap-icon.svg')}
                />
                <DexSwapInput onSelectToken={() => this.setState({selectToken: 1})}
                              token={this.state.pair[1]}
                               label title="You Pay" rate={1454.55} />

                <Button type="lightBlue">
                  <SVG src={require('src/asset/token/wallet.svg')} />
                  Buy on Narfex
                </Button>
                {!_.isNull(selectToken) && <TokenSelect onChange={value => {
                  this.setState(state => {
                    state.pair[selectToken] = value;
                  })
                }} onClose={() => this.setState({selectToken: null})} />}
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
