import {
  setTransactionItems,
  setTransactionsStatus,
  sortTransactions,
} from 'src/actions/dapp/wallet';
import _ from 'lodash';
import moment from 'moment';
import { dataStatus, sortTypes } from 'src/index/constants/dapp/types';

/**
 * If fiats empty does update
 * @param {function} getFiatsArray
 * @param {function} updateFiats
 */
export const updateFiatsByStatus = async (getFiatsArray, updateFiats) => {
  const fiats = getFiatsArray() || [];

  if (fiats.length === 1) {
    await updateFiats();
  }
};

/**
 * Returns transactions with date in string
 * and token objects.
 * @param {Array<object>} array
 * @param {function} getTokenFromSymbol
 * @returns {Array<object>} transactionItems
 */
export const transactionsMap = (array, getTokenFromSymbol) => {
  const transactionItems = array.map((transaction) => {
    // Get tokens object
    const source_token = getTokenFromSymbol(transaction.source_currency);
    const target_token =
      transaction.type !== 'exchange'
        ? source_token
        : getTokenFromSymbol(transaction.target_currency);

    // Get date from timestamp
    const date = moment(transaction.timestamp * 1000).format('DD.MM.YYYY');

    return { ...transaction, source_token, target_token, date };
  });

  return transactionItems;
};

/**
 * Gets transactions and set to Store.
 * @param {useDispatch()} dispatch
 * @param {function} getFiatsArray
 * @param {function} getAccountHistory
 * @param {function} getTokenFromSymbol
 * @param {function} updateFiats
 */
export const getTransactionsData = async (
  dispatch,
  getFiatsArray,
  getAccountHistory,
  getTokenFromSymbol,
  updateFiats
) => {
  dispatch(setTransactionsStatus(dataStatus.LOADING));

  try {
    await updateFiatsByStatus(getFiatsArray, updateFiats);
    const transactionsResponse = await getAccountHistory();
    const transactionItems = transactionsMap(
      transactionsResponse || [],
      getTokenFromSymbol
    );

    dispatch(setTransactionItems(transactionItems));
    dispatch(sortTransactions(sortTypes.DATE_DESC));
    dispatch(setTransactionsStatus(dataStatus.LOADED));
  } catch (error) {
    console.log('[getTransactionsData]', error);
    dispatch(setTransactionsStatus(dataStatus.FAILED));
  }
};

export const statusEqual = (currentStatus, status) => {
  return currentStatus === status;
};
