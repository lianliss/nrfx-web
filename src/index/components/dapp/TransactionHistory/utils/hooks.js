import { useEffect, useState } from 'react';
import {
  setTransactionItems,
  setTransactionsStatus,
} from 'src/actions/dapp/wallet';
import { dataStatus } from '../../../../constants/dapp/types';
import testItems from '../constants/testItems';
import { statusEqual, transactionsMap } from './actions';

export const useClearTransactions = (
  dispatch,
  transactions,
  getTokenFromSymbol
) => {
  const [mappedTestHistory, setMappedTestHistory] = useState([]);

  useEffect(() => {
    const newMappedTestHistory = transactionsMap(testItems, getTokenFromSymbol);
    setMappedTestHistory(newMappedTestHistory);

    if (!statusEqual(transactions.status, dataStatus.LOADED)) return;

    dispatch(setTransactionItems([]));
    dispatch(setTransactionsStatus(dataStatus.IDLE));
  }, []);

  return mappedTestHistory;
};
