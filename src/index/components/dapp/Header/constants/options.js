import _ from 'lodash';
import * as chains from 'src/services/multichain/chains';
import { BottomSheetSelect } from '../../Select';

const { option } = BottomSheetSelect;

const getChainTitle = (chainId) => _.get(chains.NETWORKS_DATA[chainId], 'title', '');

export const cryptoOptions = [
  option(
    getChainTitle(chains.BSC_MAINNET),
    chains.BSC_MAINNET,
    require('src/asset/icons/wallets/bsc.svg').default
  ),
  option(
    getChainTitle(chains.BSC_TESTNET),
    chains.BSC_TESTNET,
    require('src/asset/icons/wallets/bsc.svg').default
  ),
  option(
    getChainTitle(chains.ETHEREUM_MAINNET),
    chains.ETHEREUM_MAINNET,
    require('src/asset/icons/wallets/eth.svg').default
  ),
  option(
    getChainTitle(chains.POLYGON_MAINNET),
    chains.POLYGON_MAINNET,
    require('src/asset/icons/wallets/polygon.svg').default
  ),
  option(
    getChainTitle(chains.ARBITRUM_MAINNET),
    chains.ARBITRUM_MAINNET,
    require('src/asset/icons/wallets/arbitrum.svg').default
  ),
];

export const defaultValue = (value) =>
  option(
    'Unsupported',
    value,
    require('src/asset/icons/cabinet/question-icon.svg').default
  );
