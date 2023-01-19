import * as contractAddresses from './contracts';
import * as initialTokens from './initialTokens';
import * as chains from './chains';

class Network {
  constructor(id, provider) {
    this.provider = provider;
    this.initNetwork(id);
  }

  initNetwork(id) {
    const chainId = this.isFine(id) ? id : chains.DEFAULT_CHAIN;
    this.chainId = chainId;
    Object.assign(this, chains.NETWORKS_DATA[id]);

    this.tokenListURI = initialTokens.TOKEN_LIST_URI[chainId];
    this.contractAddresses = contractAddresses.CONTRACT_ADDRESSES[chainId];
    this.poolsList = contractAddresses.POOLS_LIST[chainId];
    this.tokens = initialTokens.TOKENS[chainId];
    this.displayTokens = initialTokens.DISPLAY_TOKENS[chainId];
    this.wrapToken = initialTokens.WRAP_TOKENS[chainId];
    this.mainnet = chains.isMainnet[chainId];
    this.tokenABI = initialTokens.ABI[chainId];
  }

  isFine(id) {
    if (chains.FINE_CHAIN_IDS.includes(id || this.chainId)) {
      return true;
    }

    return false;
  }

  // Change chain from this class.
  setChain(id) {
    if (!this.provider) return;

    const providerChain = this.provider.state.chainId;
    this.provider.setChain(id, false);
    this.provider.setState({ chainId: providerChain });
    this.initNetwork(id);
  }
}

export default Network;
