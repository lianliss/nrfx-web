import React from "react";
import { connect } from "react-redux";
import Web3 from 'web3/dist/web3.min.js';
import _ from 'lodash';

export const Web3Context = React.createContext();

class Web3Provider extends React.PureComponent {

  state = {
    isConnected: false,
    accountAddress: null,
  };

  ethereum = null;
  providerAddress = 'https://bsc-dataseed1.binance.org:443';
  web3 = null;
  web3Host = null;

  componentDidMount() {
    if (window.ethereum
      && window.ethereum.isConnected()
      && window.ethereum.selectedAddress) {
      this.connectWallet();
    }
  }

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

      const accountAddress = (await this.ethereum.request({ method: 'eth_requestAccounts' }))[0];
      if (!accountAddress) {
        throw new Error('No accounts connected');
      }
      this.setState({
        isConnected: true,
        accountAddress,
      });

      // On account address change
      this.ethereum.on('accountsChanged', accounts => {
        const accountAddress = accounts[0];
        console.log('accountsChanged', accounts);
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

      this.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      });

      this.ethereum.on('disconnect', error => {
        console.log('Wallet disconnected', error);
        this.setState({
          isConnected: false,
          accountAddress: null,
        });
      });

      this.ethereum.on('message', message => {
        console.log('Wallet message', message);
      });

      const hx = this.web3.utils.asciiToHex('NRFX');
      console.log("HX", hx);
      console.log('1wei', this.web3.utils.toWei('1.2'));
    } catch (error) {
      console.log('error', error);
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
