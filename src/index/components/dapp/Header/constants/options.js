import * as chains from 'src/services/multichain/chains';
import { BottomSheetSelect } from '../../Select';

const { option } = BottomSheetSelect;

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
    require('src/asset/icons/wallets/eth.svg').default
  ),
];

export const defaultValue = (value) =>
  option(
    'Unsupported',
    value,
    require('src/asset/icons/cabinet/question-icon.svg').default
  );
