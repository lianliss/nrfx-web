export const dataStatus = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  SUCCESSED: 'SUCCESSED',
  FAILED: 'FAILED',
};

export const sortTypes = {
  DATE_DESC: 'DATE_DESC',
  DATE_ASC: 'DATE_ASC',
};

// P2P
export const p2pMode = {
  buy: 'buy',
  sell: 'sell',
};

export const orderProcesses = {
  buy: {
    payment: 'buy-payment',
    pending: 'buy-pending',
    completed: 'buy-completed',
    cancelled: 'buy-cancelled',
  },
  sell: {
    pending: 'sell-pending',
    releasing: 'sell-releasing',
    completed: 'sell-completed',
  },
};

export const orderAdStatuses = { published: 'published', private: 'private' };
