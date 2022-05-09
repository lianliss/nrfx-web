import React from "react";
import { connect } from "react-redux";
import Web3 from 'web3/dist/web3.min.js';
import _ from 'lodash';
import axios from 'axios';

export const Web3Context = React.createContext();

class Web3Provider extends React.PureComponent {

  state = {
    isConnected: false,
    accountAddress: null,
    tokens: [
      {
        name: "Tether",
        symbol: "USDT",
        address: "0x55d398326f99059fF775485246999027B3197955",
        chainId: 56,
        decimals: 18,
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
      },
      {
        name: "Narfex",
        symbol: "NRFX",
        address: "0x3764Be118a1e09257851A3BD636D48DFeab5CAFE",
        chainId: 56,
        decimals: 18,
        logoURI: "https://static.narfex.com/img/currencies/nrfx_pancake.svg"
      },
      {
        name: "Binance Coin",
        symbol: "BNB",
        address: null,
        chainId: 56,
        decimals: 18,
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png"
      },
    ],
  };

  ethereum = null;
  providerAddress = 'https://bsc-dataseed1.binance.org:443';
  factoryAddress = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73';
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
      const result = [
        ...this.state.tokens,
        ...tokens,
      ];
      this.setState({
        tokens: result,
      });
      return result;
    } catch (error) {
      console.log(`Can't get tokens list`, error);
    }
  }

  /**
   * Returns address of PancakePair for current pair of tokens
   * @param token0 {address}
   * @param token1 {address}
   * @returns {Promise.<*>}
   */
  async getPair(token0, token1) {
    try {
      const contract = new this.web3Host.eth.Contract(
        require('src/index/constants/ABI/PancakeFactory'),
        this.factoryAddress,
        );
      return await contract.methods.getPair(token0, token1).call();
    } catch (error) {
      console.log('[getPair]', error);
    }
  }

  /**
   * Returns current pair reserves
   * @param pairAddress {address}
   * @returns {Promise.<*>}
   */
  async getReserves(pairAddress) {
    try {
      const contract = new this.web3Host.eth.Contract(
        require('src/index/constants/ABI/PancakePair'),
        pairAddress,
      );
      return await contract.methods.getReserves().call();
    } catch (error) {
      console.log('[getReserves]', error);
    }
  }

  // Shortcut to fromWei method
  fromWei = data => this.web3Host.utils.fromWei(data);
  // Shortcut to toWei method
  toWei = data => this.web3Host.utils.toWei(data);

  /**
   * Returns relation between tokens reserves, which means that for 1 token0 you will get n number of token1
   * @param token0 {address}
   * @param token1 {address}
   * @param pair {address} - pair of this tokens for more optimization (optional)
   * @returns {Promise.<number>}
   */
  async getTokensRelativePrice(token0, token1, pair = null) {
    try {
      const pairAddress = pair || await this.getPair(token0, token1);

      // Get token0 address and decimals value from the pair
      const pairContract = new this.web3Host.eth.Contract(
        require('src/index/constants/ABI/PancakePair'),
        pairAddress,
      );
      const data = await Promise.all([
        pairContract.methods.token0().call(),
        pairContract.methods.decimals().call(),
      ]);
      const pairToken0 = data[0];
      // Decimals in BigNumber format
      const decimals = this.web3Host.utils.toBN(Number(10**Number(data[1])).toFixed(0));

      // Get pair reserves
      const reserves = await this.getReserves(pairAddress);
      const reserve0 = this.web3Host.utils.toBN(reserves._reserve0);
      const reserve1 = this.web3Host.utils.toBN(reserves._reserve1);

      // Divide the second token by the first token if token0 is the first in this pair
      const relation = token0 === pairToken0
        ? reserve1.mul(decimals).div(reserve0)
        : reserve0.mul(decimals).div(reserve1);

      return Number(this.fromWei(relation));
    } catch (error) {
      console.error('[getTokensRelativePrice]', error);
    }
  }

  /**
   * Returns token price in USDT
   * @param token {address}
   * @returns {Promise.<number>}
   */
  async getTokenUSDPrice(token) {
    try {
      const USDT = this.state.tokens.find(t => t.symbol === 'USDT').address;
      return token === USDT
        ? 1
        : await this.getTokensRelativePrice(token, USDT);
    } catch (error) {
      console.error('[getTokenUSDPrice]', error);
    }
  }

  /**
   * Returns tokens balance on the current account
   * @param token {address} - token contract address. Can be undefined. In that case the method will return BNB balance
   * @returns {Promise.<*>}
   */
  async getTokenBalance(token = null) {
    try {
      if (!this.state.isConnected) return "0";
      const {accountAddress} = this.state;

      if (token) {
        // Return token balance
        const contract = new this.web3Host.eth.Contract(
          require('src/index/constants/ABI/NarfexToken'),
          token,
        );
        return await contract.methods.balanceOf(accountAddress).call();
      } else {
        // Return default balance
        return await this.web3Host.eth.getBalance(accountAddress);
      }
    } catch (error) {
      console.error('[getTokenBalance]', error);
    }
  }

  render() {
    return <Web3Context.Provider value={{
      ...this.state,
      ethereum: this.ethereum,
      connectWallet: this.connectWallet.bind(this),
      getPair: this.getPair.bind(this),
      getTokensRelativePrice: this.getTokensRelativePrice.bind(this),
      getTokenUSDPrice: this.getTokenUSDPrice.bind(this),
      getTokenBalance: this.getTokenBalance.bind(this),
    }}>
      {this.props.children}
    </Web3Context.Provider>
  }
}

export default Web3Provider;
