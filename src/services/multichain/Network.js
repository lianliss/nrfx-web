import * as contractAddresses from './contracts';
import * as initialTokens from './initialTokens';
import { isMainnet } from './chains';

class Network {
  constructor(chainId) {
    this.tokenListURI = initialTokens.TOKEN_LIST_URI[chainId];
    this.contractAddresses = contractAddresses.CONTRACT_ADDRESSES[chainId];
    this.poolsList = contractAddresses.POOLS_LIST[chainId];
    this.tokens = initialTokens.TOKENS[chainId];
    this.displayTokens = initialTokens.DISPLAY_TOKENS[chainId];
    this.wrapToken = initialTokens.WRAP_TOKENS[chainId];
    this.mainnet = isMainnet[chainId];
  }
}

export default Network;
