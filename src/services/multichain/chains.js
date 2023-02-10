// Chain ids
export const ETHEREUM_MAINNET = 1;
export const BSC_MAINNET = 56;
export const BSC_TESTNET = 97;
export const POLYGON_MAINNET = 137;
export const ARBITRUM_MAINNET = 42161;

// Chain is mainnet.
export const isMainnet = {
  [ETHEREUM_MAINNET]: true,
  [BSC_MAINNET]: true,
  [BSC_TESTNET]: false,
  [POLYGON_MAINNET]: true,
  [ARBITRUM_MAINNET]: true,
};

// Chain IDs that are integrated.
export const FINE_CHAIN_IDS = [
  ETHEREUM_MAINNET,
  BSC_MAINNET, BSC_TESTNET,
  POLYGON_MAINNET,
  ARBITRUM_MAINNET,
];

export const DEFAULT_CHAIN = BSC_MAINNET;

export const NETWORKS_DATA = {
  [ETHEREUM_MAINNET]: {
    networkID: 'ETH',
    title: 'Ethereum',
    fiatDecimals: 6,
    scan: 'https://etherscan.io',
    defaultSymbol: 'ETH',
  },
  [BSC_MAINNET]: {
    networkID: 'BSC',
    title: 'BSC',
    fiatDecimals: 18,
    scan: 'https://bscscan.com',
    defaultSymbol: 'BNB',
  },
  [BSC_TESTNET]: {
    networkID: 'BSCt',
    title: 'BSC Testnet',
    fiatDecimals: 18,
    scan: 'https://testnet.bscscan.com',
    defaultSymbol: 'BNB',
  },
  [POLYGON_MAINNET]: {
    networkID: 'PLG',
    title: 'Polygon',
    fiatDecimals: 6,
    scan: 'https://polygonscan.com/',
    defaultSymbol: 'MATIC',
  },
  [ARBITRUM_MAINNET]: {
    networkID: 'ARB',
    title: 'Arbitrum',
    fiatDecimals: 6,
    scan: 'https://arbiscan.io/',
    defaultSymbol: 'ETH',
  },
};