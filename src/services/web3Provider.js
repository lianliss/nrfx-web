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
        name: "Narfex",
        symbol: "NRFX",
        address: "0x3764Be118a1e09257851A3BD636D48DFeab5CAFE",
        chainId: 56,
        decimals: 18,
        logoURI: "https://static.narfex.com/img/currencies/nrfx_coin.svg"
      },
    ],
  };

  ethereum = null;
  providerAddress = 'https://bsc-dataseed1.binance.org:443';
  web3 = null;
  web3Host = null;

  componentDidMount() {
    this._mounted = true;

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

      const provider = new Web3.providers.HttpProvider(
        this.providerAddress
      );
      this.web3 = new Web3(this.ethereum);
      this.web3Host = new Web3(provider);

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
      this.setState({
        tokens: {
          ...this.state.tokens,
          ...tokens,
        },
      })
    } catch (error) {
      console.log(`Can't get tokens list`, error);
    }
  }

  render() {
    return <Web3Context.Provider value={{
      ...this.state,
      ethereum: this.ethereum,
      connectWallet: this.connectWallet.bind(this),
    }}>
      {this.props.children}
    </Web3Context.Provider>
  }
}

export default Web3Provider;
