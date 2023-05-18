import { DEFAULT_DECIMALS } from '../index/constants/networks';
import TokenContract from './web3Provider/tokenContract';

class Token {
  /**
   * Token name
   * @type {string}
   */
  name;

  /**
   * Token symbol
   * @type {string}
   */
  address;

  /**
   * Token symbol
   * @type {string}
   */
  symbol;

  /**
   * Token chain id
   * @type {number}
   */
  chainId;

  /**
   * Token decimals
   * @type {number}
   */
  decimals;

  /**
   * Token logo uri
   * @type {string}
   */
  logoURI;

  /**
   * Token type is fiat
   * @type {boolean}
   */
  isFiat;

  /**
   * @type {boolean} contractMounted
   * @type {TokenContract} contract
   */
  contractMounted;
  contract;

  constructor(
    name,
    symbol,
    address,
    chainId,
    decimals,
    logoURI,
    isFiat = false
  ) {
    this.name = name;
    this.symbol = symbol;
    this.address = address;
    this.chainId = chainId;
    this.decimals = decimals || DEFAULT_DECIMALS;
    this.logoURI = logoURI;
    this.isFiat = isFiat;
  }

  get details() {
    return {
      name: this.name,
      symbol: this.symbol,
      address: this.address,
      chainId: this.chainId,
      decimals: this.decimals,
      logoURI: this.logoURI,
      isFiat: this.isFiat,
    };
  }

  getContract(provider) {
    this.contract = new TokenContract(this.details, provider, false);
  }
}

export default Token;
