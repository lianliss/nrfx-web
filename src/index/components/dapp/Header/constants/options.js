import * as chains from 'src/services/multichain/chains';
import Select from '../../Select';

const { option } = Select;

export const cryptoOptions = [
  option(
    'BSC',
    chains.BSC_MAINNET,
    require('src/asset/icons/wallets/bsc.svg').default
  ),
  option(
    'BSC Testnet',
    chains.BSC_TESTNET,
    require('src/asset/icons/wallets/bsc.svg').default
  ),
  option(
    'Ethereum',
    chains.ETHEREUM_MAINNET,
    require('src/asset/cabinet/crypto/ethereum.svg').default
  ),
];

export const defaultValue = (value) =>
  option(
    'Unsupported',
    value,
    require('src/asset/icons/cabinet/question-icon.svg').default
  );
