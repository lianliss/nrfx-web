import { DEFAULT_DECIMALS } from '../index/constants/networks';
import TokenContract from './web3Provider/tokenContract';

class Token {
  /**
   * @type {string} - Token name
   */
  name;

  /**
   * @type {string} - Token address
   */
  address;

  /**
   * @type {string} - Token symbol
   */
  symbol;

  /**
   * @type {number} - Token chain id
   */
  chainId;

  /**
   * @type {number} - Token decimals
   */
  decimals;

  /**
   * @type {string} - Token logo uri
   */
  logoURI;

  /**
   * @type {boolean} - Token type is fiat
   */
  isFiat;

  /**
   * @type {boolean} contractMounted - Conract is mounted
   * @type {TokenContract} contract - TokenContract object
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
    if (this.contractMounted) return this.contract;

    this.contract = new TokenContract(this.details, provider, false);
    this.contractMounted = true;

    return this.contract;
  }
}

export default Token;
