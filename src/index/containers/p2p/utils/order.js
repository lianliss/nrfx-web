import { orderProcesses } from 'src/index/constants/dapp/types';

export const getOrderProcess = (mode, status) => {
  return orderProcesses[mode][status];
};
