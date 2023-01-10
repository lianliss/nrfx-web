// Chain ids
export const ETHEREUM_MAINNET = 1;
export const BSC_MAINNET = 56;
export const BSC_TESTNET = 97;

// Chain is mainnet.
export const isMainnet = {
  [ETHEREUM_MAINNET]: true,
  [BSC_MAINNET]: true,
  [BSC_TESTNET]: false,
};

// Chain IDs that are integrated.
export const FINE_CHAIN_IDS = [ETHEREUM_MAINNET, BSC_MAINNET, BSC_TESTNET];

export const DEFAULT_CHAIN = BSC_MAINNET;
