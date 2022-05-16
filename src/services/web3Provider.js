import React from "react";
import { connect } from "react-redux";
import Web3 from 'web3/dist/web3.min.js';
import wei from 'utils/wei';
import _ from 'lodash';
import axios from 'axios';
import baseTokens from 'src/index/constants/baseTokens';
import getAllPairsCombinations from 'utils/getPairCombinations';
import { Pair, TokenAmount, CurrencyAmount, Trade, Token, JSBI, Percent, } from '@pancakeswap/sdk';

export const Web3Context = React.createContext();
const DEFAULT_DECIMALS = 18;
const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000));
const ONE_HUNDRED_PERCENT = new Percent('1');

class Web3Provider extends React.PureComponent {

  state = {
    isConnected: false,
    accountAddress: null,
    balancesRequested: null,
    tokens: [
      {
        name: "Narfex",
        symbol: "NRFX",
        address: "0x3764Be118a1e09257851A3BD636D48DFeab5CAFE",
        chainId: 56,
        decimals: 18,
        logoURI: "https://static.narfex.com/img/currencies/nrfx_pancake.svg"
      },
      {
        name: "Tether",
        symbol: "USDT",
        address: "0x55d398326f99059fF775485246999027B3197955",
        chainId: 56,
        decimals: 18,
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
      },
      {
        name: "Binance Coin",
        symbol: "BNB",
        address: null,
        chainId: 56,
        decimals: 18,
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png"
      },
      ...baseTokens,
    ],
  };

  ethereum = null;
  providerAddress = 'https://nodes.pancakeswap.com:443';
  factoryAddress = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73';
  routerAddress = '0x10ED43C718714eb63d5aA57B78B54704E256024E';
  wrapBNB = {
    name: "Wrapped BNB",
    symbol: "WBNB",
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    chainId: 56,
    decimals: 18,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png"
  };
  web3 = null;
  web3Host = null;

  componentDidMount() {
    this._mounted = true;

    const provider = new Web3.providers.HttpProvider(
      this.providerAddress
    );
    this.web3Host = new Web3(provider);

    // Check web3 wallet plugin
    if (window.ethereum
      && window.ethereum.isConnected()
      && window.ethereum.selectedAddress) {
      this.connectWallet();
    }

    // Get tokens list
    this.getTokens();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  /**
   * Returns Token type object
   * @param _token {object} - raw token data
   * @returns {Token}
   */
  getToken(_token) {
    const token = _token.address ? _token : this.wrapBNB;
    return new Token(
      token.chainId,
      token.address,
      token.decimals,
      token.symbol,
      token.name,
      token.projectLink,
    );
  }

  /**
   * Returns TokenAmount object
   * @param token {object} - raw token data
   * @param amount {number} - amount of tokens in decimals
   * @returns {TokenAmount}
   */
  getTokenAmount(token, amount) {
    const amountWei = wei.to(amount, token.decimals);
    return new TokenAmount(this.getToken(token), amountWei);
  }

  /**
   * Calculate the Liquidity Pair address
   * @param _token0 {object} - raw token data
   * @param _token1 {object} - raw token data
   * @returns {string}
   */
  getPairAddress(_token0, _token1) {
    const token0 = _token0.address ? _token0 : this.wrapBNB;
    const token1 = _token1.address ? _token1 : this.wrapBNB;

    return Pair.getAddress(this.getToken(token0), this.getToken(token1));
  }

  /**
   * Returns all available pairs for trade between two tokens with their liquidity
   * @param _token0 {object} - raw token data
   * @param _token1 {object} - raw token data
   * @returns {Promise.<void>}
   */
  async getPairs(_token0, _token1) {
    const token0 = _token0.address ? _token0 : this.wrapBNB;
    const token1 = _token1.address ? _token1 : this.wrapBNB;

    // Get all possible pairs combinations
    const combinations = getAllPairsCombinations(token0, token1);
    const addresses = combinations.map(pair => this.getPairAddress(pair[0], pair[1]));

    // Get a liquidity for each pair
    const results = await Promise.allSettled(addresses.map(pairAddress => {
      const pairContract = new this.web3Host.eth.Contract(
        require('src/index/constants/ABI/PancakePair'),
        pairAddress,
      );
      return pairContract.methods.getReserves().call();
    }));

    // Process pairs liquidities
    return results.map((result, index) => {
      if (result.status !== 'fulfilled') return null;

      const pair = combinations[index];
      const token0 = this.getToken(pair[0]);
      const token1 = this.getToken(pair[1]);
      const isForward = token0.sortsBefore(token1); // True if token0 is the first token of LP
      const reserve0 = _.get(result, 'value._reserve0', 0);
      const reserve1 = _.get(result, 'value._reserve1', 0);
      const tokenAmount0 = new TokenAmount(token0, isForward ? reserve0 : reserve1);
      const tokenAmount1 = new TokenAmount(token1, isForward ? reserve1 : reserve0);
      return new Pair(tokenAmount0, tokenAmount1);
    }).filter(r => r);
  }

  /**
   * Returns the best trade route for a pair of tokens
   * @param _pairs {array} - array of Pair type objects
   * @param token0 {object} - raw token object
   * @param token1 {object} - raw token object
   * @param amount {number} - amount in decimals
   * @param isExactIn {boolean} - set true if the amount is an exact amount of token0
   * @param maxHops {integer} - number of trade steps between the pair (1 for no steps) (default: 3)
   * @returns {Trade} - best trade
   */
  getTrade(pairs, token0, token1, amount, isExactIn = true, maxHops = 3) {
    let bestTrade;
    for (let hops = 1; hops <= maxHops; hops++) {
      const tradeMethod = isExactIn ? Trade.bestTradeExactIn : Trade.bestTradeExactOut;
      const trade = _.get(tradeMethod(
        pairs,
        isExactIn
          ? this.getTokenAmount(token0, amount)
          : this.getToken(token0),
        isExactIn
          ? this.getToken(token1)
          : this.getTokenAmount(token1, amount),
        {maxNumResults: 1, maxHops: hops}
      ), '[0]');
      // Set the best trade
      if (hops === 1 || this.isTradeBetter(bestTrade, trade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
        bestTrade = trade;
      }
    }

    return bestTrade;
  }

  /**
   * Compares two trades by effectiveness
   * @param tradeA {Trade}
   * @param tradeB {Trade}
   * @param minimumDelta {Percent}
   * @returns {boolean} - true if tradeB is better
   */
  isTradeBetter(tradeA, tradeB, minimumDelta) {
    if (tradeA && !tradeB) return false;
    if (tradeB && !tradeA) return true;
    if (!tradeA || !tradeB) return undefined;

    return tradeA.executionPrice
      .raw
      .multiply(minimumDelta.add(ONE_HUNDRED_PERCENT))
      .lessThan(tradeB.executionPrice);
  }

  getBSCScanLink = address => `https://bscscan.com/address/${address}#readContract`;

  /**
   * Connect to web3 wallet plugin
   * @returns {Promise.<void>}
   */
  async connectWallet() {
    try {
      if (!window.ethereum) {
        throw new Error('No wallet plugins detected');
      }
      this.ethereum = window.ethereum;
      this.web3 = new Web3(this.ethereum);

      // Set account address
      const accountAddress = (await this.ethereum.request({ method: 'eth_requestAccounts' }))[0];
      if (!accountAddress) {
        throw new Error('No accounts connected');
      }

      // Set provider state
      if (!this._mounted) return;
      this.setState({
        isConnected: true,
        accountAddress,
      });

      // On account address change
      this.ethereum.on('accountsChanged', accounts => {
        const accountAddress = accounts[0];
        console.log('accountsChanged', accounts);

        if (!this._mounted) return;
        if (!accountAddress) {
          this.setState({
            isConnected: false,
            accountAddress: null,
          });
        } else {
          this.setState({
            isConnected: true,
            accountAddress,
          });
        }
      });

      // On chain change
      this.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      });

      // On disconnect
      this.ethereum.on('disconnect', error => {
        console.log('Wallet disconnected', error);
        this.setState({
          isConnected: false,
          accountAddress: null,
        });
      });

      // On message
      this.ethereum.on('message', message => {
        console.log('Wallet message', message);
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  /**
   * Get tokens list from the Coin Market Cap
   * @returns {Promise.<void>}
   */
  async getTokens() {
    try {
      const request = await axios.get('https://tokens.pancakeswap.finance/cmc.json');
      const {tokens} = request.data;

      if (!this._mounted) return;
      const result = _.uniqBy([
        ...this.state.tokens,
        ...tokens,
      ], 'address');
      this.setState({
        tokens: result,
      });
      return result;
    } catch (error) {
      console.log(`Can't get tokens list`, error);
    }
  }

  /**
   * Returns current pair reserves
   * @param pairAddress {address}
   * @returns {Promise.<*>}
   */
  async getReserves(_token0, _token1) {
    const token0 = _token0.address ? _token0 : this.wrapBNB;
    const token1 = _token1.address ? _token1 : this.wrapBNB;

    try {
      const pairAddress = this.getPairAddress(token0, token1);
      const contract = new this.web3Host.eth.Contract(
        require('src/index/constants/ABI/PancakePair'),
        pairAddress,
      );

      const data = await Promise.all([
        contract.methods.getReserves().call(),
        contract.methods.token0().call(),
      ]);

      if (data[1] === token0.address) {
        return [
          data[0][0],
          data[0][1],
        ]
      } else {
        return [
          data[0][1],
          data[0][0],
        ]
      }
    } catch (error) {
      console.error('[getReserves]', this.getBSCScanLink(pairAddress), error);
    }
  }

  // Shortcur to toBN method
  toBN = data => this.web3Host.utils.toBN(data);

  /**
   * Returns relation between tokens reserves, which means that for 1 token0 you will get n number of token1
   * @param _token0 {object}
   * @param _token1 {object}
   * @param pair {address} - pair of this tokens for more optimization (optional)
   * @returns {Promise.<number>}
   */
  async getTokensRelativePrice(_token0, _token1, amount = 1, isAmountIn = false) {
    const token0 = _token0.address ? _token0 : this.wrapBNB;
    const token1 = _token1.address ? _token1 : this.wrapBNB;

    try {
      const {toBN} = this;
      const decimals = Number(_.get(token0, 'decimals', 18));
      const amountWei = wei.to(amount, decimals);
      const amountHex = this.web3Host.utils.toHex(amountWei);

      // Get token0 address and decimals value from the pair
      const routerContract = new this.web3Host.eth.Contract(
        require('src/index/constants/ABI/PancakeRouter'),
        this.routerAddress,
      );

      const getMethod = isAmountIn
        ? routerContract.methods.getAmountsIn
        : routerContract.methods.getAmountsOut;
      const data = await getMethod(
        amountHex,
        [token0.address, token1.address],
      ).call();
      return wei.from(data[1], Number(_.get(token1, 'decimals', 18)));
    } catch (error) {
      console.error('[getTokensRelativePrice]', this.getBSCScanLink(token0), this.getBSCScanLink(token1), error);
    }
  }

  /**
   * Returns token price in USDT
   * @param token {object}
   * @returns {Promise.<number>}
   */
  async getTokenUSDPrice(token) {
    try {
      const USDT = this.state.tokens.find(t => t.symbol === 'USDT');
      return token.address === USDT.address
        ? 1
        : await this.getTokensRelativePrice(token, USDT);
    } catch (error) {
      console.error('[getTokenUSDPrice]', error);
    }
  }

  /**
   * Returns tokens balance on the current account
   * @param tokenContractAddress {address} - token contract address.
   * Can be undefined. In that case the method will return BNB balance
   * @returns {Promise.<*>}
   */
  async getTokenBalance(tokenContractAddress = null) {
    try {
      if (!this.state.isConnected) return "0";
      const {accountAddress} = this.state;

      if (tokenContractAddress) {
        // Return token balance
        const contract = new this.web3Host.eth.Contract(
          require('src/index/constants/ABI/NarfexToken'),
          tokenContractAddress,
        );
        return await contract.methods.balanceOf(accountAddress).call();
      } else {
        // Return default balance
        return await this.web3Host.eth.getBalance(accountAddress);
      }
    } catch (error) {
      console.error('[getTokenBalance]', this.getBSCScanLink(tokenContractAddress), error);
    }
  }

  getTokenBalanceKey(token, accountAddress = this.state.accountAddress) {
    return `balance-${token.address || 'bnb'}-${accountAddress}`;
  }

  /**
   * Preload all tokens balances for current account
   * @param accountAddress
   * @returns {Promise.<void>}
   */
  async loadAccountBalances(accountAddress = this.state.accountAddress) {
    try {
      // Stop additional loads
      if (this.state.balancesRequested === accountAddress) return;
      this.setState({
        balancesRequested: accountAddress,
      });

      // Separate tokens to small chunks
      const chunks = _.chunk(this.state.tokens, 64);
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        // Get request from the blockchain
        const results = await Promise.allSettled(chunk.map(token => this.getTokenBalance(token.address)));

        // Process the results
        this.setState(state => {
          const newState = {...state};

          // Process each token
          chunk.map((token, index) => {
            const key = this.getTokenBalanceKey(token, accountAddress);
            const result = results[index];
            const balance = result.status === 'fulfilled' && typeof result.value !== 'undefined'
              ? result.value
              : "0";

            // Apply a new balance to the state
            newState[key] = balance;
            token.balance = balance;

            // Get token price for non-zero balance
            if (balance !== "0") {
              console.log('[loadAccountBalances]', token.symbol, balance);
              this.getTokenUSDPrice(token).then(price => {

                // Save to the state
                this.setState(state => {
                  const tokenState = state.tokens.find(t => t.address === token.address);
                  if (!tokenState) return;

                  // Update token price
                  tokenState.price = price;
                  return state;
                })
              }).catch(error => {
                console.error('[loadAccountBalances][getTokenUSDPrice]', token.symbol, token.address, error);
              })
            }
          });
          return newState;
        });
      }
    } catch (error) {
      console.error('[loadAccountBalances]', accountAddress, error);
    }
  }

  render() {
    return <Web3Context.Provider value={{
      ...this.state,
      ethereum: this.ethereum,
      connectWallet: this.connectWallet.bind(this),
      getPairAddress: this.getPairAddress.bind(this),
      getReserves: this.getReserves.bind(this),
      getTokensRelativePrice: this.getTokensRelativePrice.bind(this),
      getTokenUSDPrice: this.getTokenUSDPrice.bind(this),
      getTokenBalance: this.getTokenBalance.bind(this),
      getTokenBalanceKey: this.getTokenBalanceKey.bind(this),
      getPairs: this.getPairs.bind(this),
      getTrade: this.getTrade.bind(this),
      loadAccountBalances: this.loadAccountBalances.bind(this),
    }}>
      {this.props.children}
    </Web3Context.Provider>
  }
}

export default Web3Provider;
