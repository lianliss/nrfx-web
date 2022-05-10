import React from "react";
import { connect } from "react-redux";
import Web3 from 'web3/dist/web3.min.js';
import wei from 'utils/wei';
import _ from 'lodash';
import axios from 'axios';

export const Web3Context = React.createContext();
const DEFAULT_DECIMALS = 18;

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
      {
        name: "Minereum BSC",
        symbol: "MNEB",
        address: "0xD22202d23fE7dE9E3DbE11a2a88F42f4CB9507cf",
        chainId: 56,
        decimals: 8,
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/16038.png"
      },
    ],
  };

  ethereum = null;
  providerAddress = 'https://nodes.pancakeswap.com:443';
  factoryAddress = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73';
  wrapBNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
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

  // Shortcur to toBN method
  toBN = data => this.web3Host.utils.toBN(data);

  /**
   * Returns relation between tokens reserves, which means that for 1 token0 you will get n number of token1
   * @param _token0 {address}
   * @param _token1 {address}
   * @param pair {address} - pair of this tokens for more optimization (optional)
   * @returns {Promise.<number>}
   */
  async getTokensRelativePrice(_token0, _token1, pair = null) {
    try {
      const {toBN} = this;
      const token0 = _token0 || this.wrapBNB;
      const token1 = _token1 || this.wrapBNB;
      const pairAddress = pair || await this.getPair(token0, token1);

      // Get token0 address and decimals value from the pair
      const pairContract = new this.web3Host.eth.Contract(
        require('src/index/constants/ABI/PancakePair'),
        pairAddress,
      );
      const token0Contract = new this.web3Host.eth.Contract(
        require('src/index/constants/ABI/NarfexToken'),
        token0,
      );
      const token1Contract = new this.web3Host.eth.Contract(
        require('src/index/constants/ABI/NarfexToken'),
        token1,
      );
      const data = await Promise.all([
        pairContract.methods.token0().call(), // Pair token0 position contract
        pairContract.methods.decimals().call(), // Pair decimals
        token0Contract.methods.decimals().call(), // Token 0 decimals
        token1Contract.methods.decimals().call(), // Token 1 decimals
        this.getReserves(pairAddress), // Reserves
      ]);

      // Check if tokens reversed in this pair
      const isReverse = token0 !== data[0];

      // Pair decimals in BigNumber format
      const decimals = toBN(Number(10**Number(data[1])).toFixed(0));

      // Get pair reserves
      const reserve0 = toBN(data[4]._reserve0)
        .mul(toBN(
          Number(10 ** (DEFAULT_DECIMALS - (isReverse ? data[3] : data[2])))
            .toFixed(0)
        ));
      const reserve1 = toBN(data[4]._reserve1)
        .mul(toBN(
          Number(10 ** (DEFAULT_DECIMALS - (isReverse ? data[2] : data[3])))
            .toFixed(0)
        ));

      // Divide the second token by the first token if token0 is the first in this pair
      const relation = !isReverse
        ? reserve1.mul(decimals).div(reserve0)
        : reserve0.mul(decimals).div(reserve1);

      return Number(wei.from(relation));
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
      console.error('[getTokenBalance]', error);
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
              this.getTokenUSDPrice(token.address).then(price => {

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
      getPair: this.getPair.bind(this),
      getTokensRelativePrice: this.getTokensRelativePrice.bind(this),
      getTokenUSDPrice: this.getTokenUSDPrice.bind(this),
      getTokenBalance: this.getTokenBalance.bind(this),
      getTokenBalanceKey: this.getTokenBalanceKey.bind(this),
      loadAccountBalances: this.loadAccountBalances.bind(this),
    }}>
      {this.props.children}
    </Web3Context.Provider>
  }
}

export default Web3Provider;
