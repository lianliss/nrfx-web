import * as contractAddresses from './contracts';
import * as initialTokens from './initialTokens';
import * as chains from './chains';

class Network {
  constructor(chainId) {
    this.chainId = chainId;

    if (chainId && this.isFine(chainId)) {
      this.tokenListURI = initialTokens.TOKEN_LIST_URI[chainId];
      this.contractAddresses = contractAddresses.CONTRACT_ADDRESSES[chainId];
      this.poolsList = contractAddresses.POOLS_LIST[chainId];
      this.tokens = initialTokens.TOKENS[chainId];
      this.displayTokens = initialTokens.DISPLAY_TOKENS[chainId];
      this.wrapToken = initialTokens.WRAP_TOKENS[chainId];
      this.mainnet = chains.isMainnet[chainId];
      this.tokenABI = initialTokens.ABI[chainId];
    }
  }

  isFine() {
    if (chains.FINE_CHAIN_IDS.includes(this.chainId)) {
      return true;
    }

    return false;
  }
}

export default Network;
