import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Web3Context } from 'src/services/web3Provider';
import { dataStatus } from 'src/index/constants/dapp/types';
import {
  getTransactionsData,
  statusEqual,
} from 'src/index/components/dapp/TransactionHistory/utils/actions';
import { adaptiveSelector, dappTransactionsSelector } from 'src/selectors';
import { useClearTransactions } from '../index/components/dapp/TransactionHistory/utils/hooks';

/**
 * Get and set transaction history,
 * return object with values
 * which we need to display it.
 * @returns {object}
 */
const useTransactionHistory = () => {
  // Context.
  const {
    getAccountHistory,
    accountAddress,
    isConnected,
    updateFiats,
    getTokenFromSymbol,
    getFiatsArray,
  } = useContext(Web3Context);

  // Store.
  const dispatch = useDispatch();
  const adaptive = useSelector(adaptiveSelector);
  const transactions = useSelector(dappTransactionsSelector);

  // Constants
  const accountHistory = transactions.items;
  const historyLength = accountHistory.length > 0;
  const accountHistoryExists =
    isConnected &&
    statusEqual(transactions.status, dataStatus.LOADED) &&
    historyLength;

  const mappedTestHistory = useClearTransactions(
    dispatch,
    transactions,
    getTokenFromSymbol
  );

  // Get transactions.
  useEffect(() => {
    if (!isConnected) return;

    getTransactionsData(
      dispatch,
      getFiatsArray,
      getAccountHistory,
      getTokenFromSymbol,
      updateFiats
    );
  }, [accountAddress]);

  return {
    adaptive,
    isConnected,
    accountHistory,
    mappedTestHistory,
    transactions,
    accountHistoryExists,
  };
};

export default useTransactionHistory;
