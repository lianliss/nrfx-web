import React from "react";
import { connect } from "react-redux";
import Web3 from 'web3/dist/web3.min.js';
import wei from 'utils/wei';
import wait from 'utils/wait';
import _ from 'lodash';
import axios from 'axios';
import networks from 'src/index/constants/networks';
import getAllPairsCombinations from 'utils/getPairCombinations';
import { Pair, TokenAmount, CurrencyAmount, Trade, Token, JSBI, Percent, Fraction, } from '@pancakeswap/sdk';
import significant from 'utils/significant';
import TokenContract from './web3Provider/token';
import MasterChefContract from './web3Provider/MasterChefContract';

export const Web3Context = React.createContext();
const DEFAULT_DECIMALS = 18;
const GWEI_DECIMALS = 9;
const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000));
const ONE_HUNDRED_PERCENT = new Percent('1');
const AWAITING_DELAY = 2000;

class Web3Provider extends React.PureComponent {

  state = {
    isConnected: false,
    accountAddress: null,
    balancesRequested: null,
    blocksPerSecond: 0,
    balances: {
      tokens: [],
      fiats: []
    },
    chainId: null,
    tokens: networks[56].tokens,
    pools: null,
    poolsList: networks[56].poolsList,
    prices: {},
  };

  ethereum = null;
  //providerAddress = 'https://bsc-dataseed1.defibit.io:443';
  //providerAddress = 'https://bsc-testnet.web3api.com/v1/KBR2FY9IJ2IXESQMQ45X76BNWDAW2TT3Z3';
  providerAddress = 'asd';
  factoryAddress = networks[56].factoryAddress;
  routerAddress = networks[56].providerAddress;
  tokenSale = networks[56].tokenSale;
  saleFactory = networks[56].saleFactory;
  wrapBNB = networks[56].wrapBNB;
  web3 = null;
  web3Host = null;
  farm = null;
  pairs = {};

  // Moralis
  moralis = {
    api: 'https://deep-index.moralis.io/api/v2',
    headers: {
      'X-API-Key': 'woP1gbSiPFLSSG92XkCvSud3dc6eYfzU4sG4kVeim105GMbLrSKv7mVdrWgVphTq',
      accept: 'application/json',
    },
    params: {
      chain: 'bsc',
    }
  };

  getWeb3() {
    if (this.state.isConnected) {
      return this.web3;
    } else {
      return this.web3Host;
    }
  }

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
    const amountWei = amount > Number.MAX_SAFE_INTEGER
      ? Number.MAX_SAFE_INTEGER
      : wei.to(amount, token.decimals);

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
      const pairContract = new (this.getWeb3().eth.Contract)(
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

  getBSCScanLink = address => this.state.chainId === 56
    ? `https://bscscan.com/tx/${address}`
    : `https://testnet.bscscan.com/tx/${address}`;


  /**
   * Set balances
   * @param balances {array || function} balances object
   * @param type {string} fiats, tokens, clear
   */
   setBalances(balances, type = 'tokens') {
    if(type === 'clear') {
      this.setState({
        balances: {
          fiats: [],
          tokens: [],
        }
      });

      return;
    }
    
    this.setState(state => ({
      balances: {
        ...state.balances,
        [type]: balances instanceof Function
          ? balances(state.balances[type])
          : balances,
      },
    }));
  }
    
  /**
   * Switch to another chain
   * @param id {integer} chainID
   */
  setChain(id) {
    try {
      if (!networks[id]) {
        return this.setState({
          chainId: id,
        })
      }
      Object.assign(this, networks[id]);
      this.farm = this.getFarmContract();
      this.pairs = {};
      this.setState({
        tokens: networks[id].tokens,
        poolsList: networks[id].poolsList,
        chainId: id,
      });
      this.getBlocksPerSecond();
      if (id === 56) {
        this.getTokens();
      }
    } catch (error) {
      console.error('[setChain]', id, error);
    }
  }

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
      console.log('this.ethereum', this.ethereum);
      this.setChain(this.getWeb3().utils.hexToNumber(this.ethereum.chainId));

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
        console.log('chainChanged', chainId, this.web3Host.utils.hexToNumber(this.ethereum.chainId));
        this.setChain(this.web3Host.utils.hexToNumber(chainId));
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
      let tokens = this.cmcTokens;
      if (!tokens) {
        const request = await axios.get('https://tokens.pancakeswap.finance/cmc.json');
        tokens = request.data.tokens;
        this.cmcTokens = tokens;
      }

      if (this.state.chainId !== 56) return [];
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
   * @param _token0 {object|address} Token object or pair address
   * @param _token1 {object|undefined} Token object or undefined if the pair address passed
   * @returns {Promise.<*>}
   */
  async getReserves(_token0, _token1) {
    let token0;
    let token1;
    let pairAddress;
    if (_token1) {
      // If tokens passed
      token0 = _token0.address ? _token0 : this.wrapBNB;
      token1 = _token1.address ? _token1 : this.wrapBNB;
      pairAddress = this.getPairAddress(token0, token1).toLowerCase();
    } else {
      // If only pair passed
      pairAddress = _token0.toLowerCase();
    }

    try {
      const reserves = this.pairs[pairAddress];
      if (reserves) {
        if (_token1) {
          // If tokens passed
          return [
            reserves[token0.symbol],
            reserves[token1.symbol],
            reserves,
          ]
        } else {
          // If pair passed
          return [
            reserves[reserves.token0.symbol],
            reserves[reserves.token1.symbol],
            reserves,
          ]
        }
      }
      const contract = new (this.getWeb3().eth.Contract)(
        require('src/index/constants/ABI/PancakePair'),
        pairAddress,
      );

      const data = await Promise.all([
        contract.methods.getReserves().call(),
        contract.methods.token0().call(),
        contract.methods.token1().call(),
        contract.methods.totalSupply().call(),
      ]);
      if (!_token1) {
        const dataToken0 = data[1].toLowerCase();
        const dataToken1 = data[2].toLowerCase();
        // If no tokens passed
        token0 = this.state.tokens.find(t => t.address && t.address.toLowerCase() === dataToken0);
        token1 = this.state.tokens.find(t => t.address && t.address.toLowerCase() === dataToken1);
      }
      // Switch pair
      const result = data[1] === token0.address
        ? [
          data[0][0],
          data[0][1],
        ]
        : [
          data[0][1],
          data[0][0],
        ];
      // Skip caching is there is no tokens found
      if (!token0 || !token1) return result;
      // Update reserves cache
      this.pairs[pairAddress] = {
        blockTimestamp: data[0]._blockTimestampLast * 1000,
        updateTimestamp: Date.now(),
        token0: !!_token1 ? _token0 : token0,
        token1: !!_token1 ? _token1 : token1,
        totalSupply: data[3],
        address: pairAddress,
        decimals: 18,
      };
      this.pairs[pairAddress][token0.symbol] = result[0];
      this.pairs[pairAddress][token1.symbol] = result[1];
      result.push(this.pairs[pairAddress]);
      return result;
    } catch (error) {
      console.error('[getReserves]', this.getBSCScanLink(pairAddress), error);
    }
  }

  // Shortcur to toBN method
  toBN = data => this.getWeb3().utils.toBN(data);

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
      const amountHex = this.getWeb3().utils.toHex(amountWei);

      // Get token0 address and decimals value from the pair
      const routerContract = new (this.getWeb3().eth.Contract)(
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
      console.error('[getTokensRelativePrice]', error);
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
      return token.address.toLowerCase() === USDT.address.toLowerCase()
        ? 1
        : await this.getTokensRelativePrice(token, USDT);
    } catch (error) {
      console.warn('[getTokenUSDPrice]', error);
      return 0;
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
        const contract = new (this.getWeb3().eth.Contract)(
          require('src/index/constants/ABI/Bep20Token'),
          tokenContractAddress,
        );
        return await contract.methods.balanceOf(accountAddress).call();
      } else {
        // Return default balance
        return await (this.getWeb3().eth.getBalance(accountAddress));
      }
    } catch (error) {
      console.error('[getTokenBalance]', this.getBSCScanLink(tokenContractAddress), error);
      return '0';
    }
  }

  getTokenBalanceKey(token, accountAddress = this.state.accountAddress) {
    return `balance-${token.address || 'bnb'}-${accountAddress}`;
  }

  /**
   * Returns LP token price in USDT
   * @param pairAddress {string} - address of LP token
   * @param isForce {bool} - is force update
   * @returns {Promise.<number>}
   */
  async getPairUSDTPrice(pairAddress, isForce = false) {
    if (typeof this.state.prices[pairAddress] !== 'undefined' && !isForce) return this.state.prices[pairAddress];
    const newPairState = {};
    if (!isForce) {
      newPairState[pairAddress] = 0;
      this.setState({
        prices: {
          ...this.state.prices,
          ...newPairState,
        }
      });
    }
    try {
      const reserves = await this.getReserves(pairAddress);
      // const {tokens} = this.state;
      // const contract = new (this.getWeb3().eth.Contract)(
      //   require('src/index/constants/ABI/PancakePair'),
      //   pairAddress,
      // );
      // const data = await Promise.all([
      //   contract.methods.getReserves().call(),
      //   contract.methods.totalSupply().call(),
      //   contract.methods.token0().call(),
      //   contract.methods.token1().call(),
      // ]);
      // const token0 = this.state.tokens.find(t => t.address && t.address.toLowerCase() === data[2].toLowerCase())
      //   || {address: data[2], decimals: 18};
      // const token1 = this.state.tokens.find(t => t.address && t.address.toLowerCase() === data[3].toLowerCase())
      //   || {address: data[3], decimals: 18};
      // const reserve0 = wei.from(data[0]._reserve0, token0.decimals);
      // const reserve1 = wei.from(data[0]._reserve1, token0.decimals);
      // const totalSupply = wei.from(data[1]);
      const token0 = reserves[2].token0;
      const token1 = reserves[2].token1;
      const reserve0 = reserves[0];
      const reserve1 = reserves[1];
      const totalSupply = reserves[2].totalSupply;
      const prices = await Promise.all([
        this.getTokenUSDPrice(token0),
        this.getTokenUSDPrice(token1),
      ]);
      newPairState[pairAddress] = (reserve0 * prices[0] + reserve1 * prices[1]) / totalSupply;
      this.setState({
        prices: {
          ...this.state.prices,
          ...newPairState,
        }
      });
      return newPairState[pairAddress];
    } catch (error) {
      console.error('[getPairPrice]', error);
      return 0;
    }
  }

  /**
   * Preload all tokens balances for current account
   * @param accountAddress
   * @returns {Promise.<void>}
   */
  async loadAccountBalances(accountAddress = this.state.accountAddress) {
    try {
      // Set positive balance tokens
      this.setBalances(this.state.tokens.filter(t => t.balance > 0));

      if (!this.state.isConnected) return;
      // Stop additional loads
      if (this.state.balancesRequested === accountAddress) return;
      this.setState({
        balancesRequested: accountAddress,
      });
      
      // Clear tokens balances
      this.setBalances([], 'tokens');

      // Separate tokens to small chunks
      const chunks = _.chunk(
        this.state.tokens.filter(t => t.chainId === this.state.chainId),
        64);
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
            const tokenAddress = token.address ? token.address.toLowerCase() : token.address;

            // Apply a new balance to the state
            newState[key] = balance;
            token.balance = balance;

            // Get token price for non-zero balance
            if (balance !== "0") {
              console.log('[loadAccountBalances]', token.symbol, balance);
              this.getTokenUSDPrice(token).then(price => {

                // Save to the state
                this.setState(state => {
                  const tokenState = state.tokens
                    .find(t => (t.address ? t.address.toLowerCase() : t.address) === tokenAddress);
                  if (!tokenState) return;

                  // Update token price
                  tokenState.price = price;
                  return state;
                });
                this.setBalances(state => [...state, token]);
              }).catch(error => {
                console.error('[loadAccountBalances][getTokenUSDPrice]', token.symbol, token.address, error);
              })
            }
          });
          return newState;
        });
      }
      return 'loaded';
    } catch (error) {
      console.error('[loadAccountBalances]', accountAddress, error);
      return 'error';
    }
  }

  fractionToHex = (fraction, decimals) => this.getWeb3().utils.toHex(wei.to(significant(fraction), decimals));

  /**
   * Get fraction from number.
   * @param number {number}
   * @returns {Object} Fraction
  */
  numberToFraction(number = 0) {
    // Number int to Fraction.
    const numberIntFraction = new Fraction(JSBI.BigInt(parseInt(number)));
    const numberRemainder = Number(String(number % 1).slice(2));
    const numberRemainderLength = String(numberRemainder).length;

    // Number remainder to Fraction.
    const numberRemainderFraction = new Fraction(
      JSBI.BigInt(numberRemainder),
      JSBI.BigInt(Math.pow(10, numberRemainderLength))
    );

    // Add sleppage int and remainder to one fraction.
    const result = numberIntFraction.add(numberRemainderFraction);
    return result;
  }

  /**
   * Exchange the pair
   * @param pair {array}
   * @param trade {object}
   * @param slippageTolerance {integer}
   * @param isExactIn {bool}
   * @returns {Promise.<*>}
   */
  async swap(pair, trade, slippageTolerance = 2, isExactIn = true, deadline = 20) {
    const {accountAddress} = this.state;
    const {web3} = this;
    const routerContract = new (this.getWeb3().eth.Contract)(
      require('src/index/constants/ABI/PancakeRouter'),
      this.routerAddress,
    );
    const isFromBNB = !_.get(pair, '[0].address');
    const isToBNB = !_.get(pair, '[1].address');

    // Calculate slippage tolerance tokens amount
    const slippageFraction = this.numberToFraction(slippageTolerance).divide(100);
    const slippageAmount = isExactIn
      ? trade.outputAmount.asFraction.multiply(slippageFraction)
      : trade.inputAmount.asFraction.multiply(slippageFraction);

    // Generate swap contract method name
    let method = 'swap';
    method += isExactIn ? 'Exact' : '';
    method += isFromBNB ? 'ETH' : 'Tokens';
    method += 'For';
    method += !isExactIn ? 'Exact' : '';
    method += isToBNB ? 'ETH' : 'Tokens';

    const options = [];
    let value;
    if (isExactIn) {

      // From exact tokens
      const amountIn = this.fractionToHex(trade.inputAmount.asFraction, pair[0].decimals);
      if (!isFromBNB) { // Do not set amountIn if BNB first
        options.push(amountIn);
      } else {
        value = amountIn;
      }

      const amountOutMin = this.fractionToHex(trade.outputAmount.asFraction.subtract(slippageAmount), pair[1].decimals);
      options.push(amountOutMin);

    } else {

      // To exact tokens
      const amountOut = this.fractionToHex(trade.outputAmount.asFraction, pair[1].decimals);
      options.push(amountOut);

      const amountInMax = this.fractionToHex(trade.inputAmount.asFraction.add(slippageAmount), pair[0].decimals);
      if (!isFromBNB) { // Do not set amountIn if BNB first
        options.push(amountInMax);
      } else {
        value = amountInMax;
      }

    }

    // Swap route
    const path = trade.route.path.map(token => token.address);
    options.push(path);

    options.push(accountAddress); // "to" field
    options.push(this.getWeb3().utils.toHex(Math.round(Date.now()/1000) + 60 * deadline)); // Deadline

    try {
      try {
        // Try to estimate transaction without fee support
        await this.estimateTransaction(routerContract, method, options);
      } catch (error) {
        console.log(`[swap] Estimate method "${method}" error. Try to add "SupportingFeeOnTransferTokens"`);
        // Add fee support
        method += 'SupportingFeeOnTransferTokens';
      }
      // Run transaction
      return await this.transaction(routerContract, method, options, value);
    } catch (error) {
      console.error('[swap]', error);
      throw error;
    }
  }

  /**
   * Returns TokenContract object
   * @param token {TokenContract}
   * @param isPair {bool}
   */
  getTokenContract = (token, isPair = false) => new TokenContract(token, this, isPair);

  /**
   * Returns MasterChefContract object
   */
  getFarmContract = () => new MasterChefContract(this);

  getContract = (abi, address) => new (this.web3.eth.Contract)(
    abi,
    address,
  );

  /**
   * Try to estimate contract method transaction
   * @param contract {object}
   * @param method {string} - method name
   * @param params {array} - array of method params
   * @returns {Promise.<*>}
   */
  estimateTransaction = async (contract, method, params) => {
    try {
      const accountAddress = _.get(this, 'state.accountAddress');
      const data = contract.methods[method](...params);
      return await data.estimateGas({from: accountAddress, gas: 50000000000});
    } catch (error) {
      throw error;
    }
  };

  /**
   * Send transaction to connected wallet
   * @param contract {object}
   * @param method {string} - method name
   * @param params {array} - array of method params
   * @param value {number} - amount of BNB in wei
   * @returns {Promise.<*>}
   */
  transaction = async (contract, method, params, value = 0) => {
    try {
      const accountAddress = _.get(this, 'state.accountAddress');
      const count = await this.web3.eth.getTransactionCount(accountAddress);
      const data = contract.methods[method](...params);
      const gasPrice = await this.web3.eth.getGasPrice();
      const gasEstimationParams = {from: accountAddress, gas: 50000000000};
      if (value) {
        gasEstimationParams.value = value;
      }
      const gasLimit = await data.estimateGas(gasEstimationParams);
      const rawTransaction = {
        from: accountAddress,
        gasPrice: this.web3.utils.toHex(gasPrice),
        gasLimit: this.web3.utils.toHex(gasLimit),
        to: contract._address,
        data: data.encodeABI(),
        nonce: this.web3.utils.toHex(count),
      };
      if (value) {
        rawTransaction.value = this.web3.utils.toHex(value);
      }
      return await this.ethereum.request({
        method: 'eth_sendTransaction',
        params: [rawTransaction],
      });
    } catch (error) {
      console.error('[Web3Provider][transaction]', method, error);
      throw error;
    }
  };

  /**
   * Add a token to MetaMask
   * @param token {object}
   * @returns {Promise.<void>}
   */
  async addTokenToWallet(token) {
    try {
      await this.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: token.address,
            symbol: token.symbol,
            decimals: token.decimals || 18,
            image: token.logoURI || token.image,
          },
        },
      });
    } catch (error) {
      console.error('[addTokenToWallet]', error);
    }
  }

  /**
   * Wait for transaction receipt
   * @param txHash {string} - transaction hash
   * @returns {Promise.<*>} will returns a result when the transaction will be finished
   */
  async getTransactionReceipt(txHash) {
    try {
      const receipt = await this.web3.eth.getTransactionReceipt(txHash);
      if (receipt) return receipt;
      await wait(1000);
      return await this.getTransactionReceipt(txHash);
    } catch (error) {
      console.log('[getTransactionReceipt]', error);
      return null;
    }
  }

  /**
   * Update single pool data
   * @param pool {object}
   * @returns {Promise.<*>}
   */
  async updatePoolData(pool) {
    console.log('[updatePoolData]', pool);
    if (!this.state.isConnected) return;
    try {
      const farm = this.getFarmContract();
      const addon = {};
      const poolData = await farm.getPoolData(pool);
      addon[poolData.address] = poolData;
      console.log('poolData', poolData, addon, {
        ...this.state.pools,
        ...addon,
      });
      this.setState({
        pools: {
          ...this.state.pools,
          ...addon,
        }
      });
      return poolData;
    } catch (error) {
      await wait(AWAITING_DELAY);
      return await this.updatePoolData();
    }
  };

  /**
   * Update all pools data
   * @param _pools {object}
   * @returns {Promise.<*>}
   */
  async updatePoolsData() {
    if (!this.state.isConnected) return;
    try {
      const {pools} = this.state;
      const farm = this.getFarmContract();
      const data = await Promise.all(Object.keys(pools).map(address => farm.getPoolData(pools[address])));
      const poolsWithData = {};
      data.map((pool, index) => {
        poolsWithData[pool.address] = data[index];
      });
      this.setState({pools: poolsWithData});
    } catch (error) {
      await wait(AWAITING_DELAY);
      return await this.updatePoolsData();
    }
  };

  /**
   * Update pools list
   * @returns {Promise.<*>}
   */
  async updatePoolsList() {
    if (!this.state.isConnected) return;
    try {
      const farm = this.getFarmContract();
      const pools = await farm.getPoolsList();
      this.setState({pools});
      return await this.updatePoolsData();
    } catch (error) {
      await wait(AWAITING_DELAY);
      return await this.updatePoolsList();
    }
  };

  /**
   * Asks user to switch a network
   * @param chainId {number} - network chain id
   * @param firstAttempt {bool} - is there is a first call
   * @returns {Promise.<*>}
   */
  async switchToChain(chainId, firstAttempt = true) {
    if (firstAttempt) this.requiredChain = chainId;
    if (firstAttempt && this.state.chainId !== chainId) {
      this.setState({pools: null})
    }
    try {
      if (chainId === 97) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: this.web3.utils.toHex(97),
            chainName: 'BSC web3 test',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'BNB',
              decimals: 18
            },
            rpcUrls: ['https://bsc-testnet.web3api.com/v1/KBR2FY9IJ2IXESQMQ45X76BNWDAW2TT3Z3'],
            blockExplorerUrls: ['https://testnet.bscscan.com']
          }],
        });
      }
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: this.web3.utils.toHex(chainId) }]
      });
      return true;
    } catch (error) {
      console.log('[switchToChain]', error);
      if (this.requiredChain === chainId) {
        // return await this.switchToChain(chainId, false);
      }
    }
  }

  /**
   * Returns token by symbol
   * @param _symbol {string}
   * @return {object}
   */
  findTokenBySymbol(_symbol) {
    const symbol = typeof _symbol === 'string' ? _symbol.toUpperCase() : _symbol;
    return this.state.tokens.find(t => (t.symbol ? t.symbol.toUpperCase() : t.symbol) === symbol);
  }

  /**
   * Returns blocks per second value and updates it in the state
   * @returns {Promise.<void>}
   */
  async getBlocksPerSecond() {
    if (!this.web3) return;
    try {
      const currentBlockNumber = await this.web3.eth.getBlockNumber();
      const data = await Promise.all([
        this.web3.eth.getBlock(currentBlockNumber),
        this.web3.eth.getBlock(currentBlockNumber - 10000),
      ]);
      const blocksPerSecond = (data[0].number - data[1].number) / (data[0].timestamp - data[1].timestamp);
      this.setState({
        blocksPerSecond,
      });
      return blocksPerSecond;
    } catch (error) {
      console.error('[getBlocksPerSecond]', error);
    }
  }

  // Get block from date.
  async dateToBlockMoralis (date = new Date()) {
    // Date to unix timestamp.
    const unixDate = Math.floor(date.getTime() / 1000);

    // Moralis request data.
    const {headers, params, api} = this.moralis;

    return axios
      .get(`${api}/dateToBlock`, {
        headers,
        params: {
          ...params,
          date: unixDate,
        },
      })
      .then((r) => r.data.block);
  };

  // Get token price from contract (required), block (optional).
  async getTokenPriceMoralis (contractAddress, to_block = null) {
    const {headers, params, api} = this.moralis;
    
    return axios(`${api}/erc20/${contractAddress}/price`, {
      headers,
      params: {
        ...params,
        to_block,
      },
    }).then((r) => r.data.usdPrice);
  };

  /**
   * Returns Token difference,
   * price from {timeFrom}, price from {timeTo}
   * @param address {string}
   * @param timeFrom {Date}
   * @param timeTo {Date}
   * @return {object} {difference, priceFrom, priceTo}
   */
  async getSomeTimePricesPairMoralis (address, timeFrom, timeTo) {
      const blockFrom = await this.dateToBlockMoralis(timeFrom);
      const blockTo = timeTo ? await this.dateToBlockMoralis(timeTo) : null;

      // Get prices
      const priceTo = await this.getTokenPriceMoralis(address, blockTo ? blockTo : null);
      const priceFrom = await this.getTokenPriceMoralis(address, blockFrom);

      // Set price and difference
      const difference = Number((priceTo / (priceFrom / 100) - 100).toFixed(2));

      return { address, difference, priceFrom, priceTo };
  }

  render() {
    return <Web3Context.Provider value={{
      ...this.state,
      web3: this.web3,
      ethereum: this.ethereum,
      connectWallet: this.connectWallet.bind(this),
      getPairAddress: this.getPairAddress.bind(this),
      getReserves: this.getReserves.bind(this),
      pairs: this.pairs,
      getTokensRelativePrice: this.getTokensRelativePrice.bind(this),
      getTokenUSDPrice: this.getTokenUSDPrice.bind(this),
      getTokenBalance: this.getTokenBalance.bind(this),
      getTokenBalanceKey: this.getTokenBalanceKey.bind(this),
      getPairs: this.getPairs.bind(this),
      getTrade: this.getTrade.bind(this),
      getTokenContract: this.getTokenContract.bind(this),
      getFarmContract: this.getFarmContract.bind(this),
      getContract: this.getContract.bind(this),
      addTokenToWallet: this.addTokenToWallet.bind(this),
      swap: this.swap.bind(this),
      loadAccountBalances: this.loadAccountBalances.bind(this),
      routerAddress: this.routerAddress,
      tokenSale: this.tokenSale,
      saleFactory: this.saleFactory,
      estimateTransaction: this.estimateTransaction.bind(this),
      transaction: this.transaction.bind(this),
      farm: this.farm,
      getBSCScanLink: this.getBSCScanLink.bind(this),
      getTransactionReceipt: this.getTransactionReceipt.bind(this),
      updatePoolData: this.updatePoolData.bind(this),
      updatePoolsData: this.updatePoolsData.bind(this),
      updatePoolsList: this.updatePoolsList.bind(this),
      switchToChain: this.switchToChain.bind(this),
      getPairUSDTPrice: this.getPairUSDTPrice.bind(this),
      findTokenBySymbol: this.findTokenBySymbol.bind(this),
      dateToBlockMoralis: this.dateToBlockMoralis.bind(this),
      getTokenPriceMoralis: this.getTokenPriceMoralis.bind(this),
      numberToFraction: this.numberToFraction.bind(this),
      getTokenAmount: this.getTokenAmount.bind(this),
      getSomeTimePricesPairMoralis: this.getSomeTimePricesPairMoralis.bind(this),
      bnb: this.bnb,
      wrapBNB: this.wrapBNB,
    }}>
      {this.props.children}
    </Web3Context.Provider>
  }
}

export default Web3Provider;
