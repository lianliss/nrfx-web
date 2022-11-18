export const types = {
  COMPLETED: 'COMPLETED',
  ERROR: 'ERROR',
};

export const statusIcons = {
  [types.COMPLETED]: require('src/asset/icons/status/transaction-response-success.svg'),
  [types.ERROR]: require('src/asset/icons/status/transaction-response-error.svg'),
};
