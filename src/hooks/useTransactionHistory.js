import { useContext, useEffect, useState } from 'react';
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
const useTransactionHistory = (options = {}) => {
  // Context.
  const {
    getAccountHistory,
    getTokenUSDPrice,
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
  const [accountHistory, setAccountHistory] = useState([]);
  const { status, items } = transactions;

  const historyLength = accountHistory.length > 0;
  const accountHistoryExists =
    isConnected && statusEqual(status, dataStatus.LOADED) && historyLength;

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
  }, [accountAddress, options.forNetworkID]);

  useEffect(() => {
    setAccountHistory(items);
  }, [items]);

  useEffect(() => {
    if (status !== dataStatus.LOADED) return;
    let newHistory = [...accountHistory];

    if (options.maxAccountHistory > 0) {
      newHistory = newHistory.slice(0, options.maxAccountHistory);
    }

    if (options.forNetworkID) {
      newHistory = newHistory.filter(
        ({ networkID }) => networkID === options.forNetworkID
      );
    }

    setAccountHistory(newHistory);
  }, [items, options.forNetworkID, options.maxAccountHistory, status]);

  return {
    adaptive,
    isConnected,
    accountHistory,
    mappedTestHistory,
    transactions,
    accountHistoryExists,
    accountAddress,
    getTokenUSDPrice,
    status,
  };
};

export default useTransactionHistory;
