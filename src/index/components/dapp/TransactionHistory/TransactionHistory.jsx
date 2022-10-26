import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import TransactionTable from './components/TransactionTable/TransactionTable';
import TransactionTableAdaptive from './components/TransactionTableAdaptive/TransactionTableAdaptive';

// Utils
import { getLang } from 'src/utils';
import { Web3Context } from 'src/services/web3Provider';
import { adaptiveSelector, dappTransactionsSelector } from 'src/selectors';
import { setTransactions } from 'src/actions/dapp/wallet';
import _ from 'lodash';
import moment from 'moment';

// Styles
import './TransactionHistory.less';

function TransactionHistory() {
  // Context.
  const {
    getAccountHistory,
    accountAddress,
    isConnected,
    updateFiats,
    getTokenFromSymbol,
    getFiatsArray,
  } = React.useContext(Web3Context);

  // Store.
  const dispatch = useDispatch();
  const adaptive = useSelector(adaptiveSelector);
  const transactions = useSelector(dappTransactionsSelector);

  // Constants
  const accountHistory = transactions.items;

  // Functional.
  // Clear the filled transactions.
  React.useEffect(() => {
    if (transactions.status !== 'loaded') return;

    dispatch(setTransactions([], 'idle'));
  }, []);

  // Get transactions.
  React.useEffect(() => {
    if (!isConnected) return;

    getTransactionsData();
  }, [accountAddress]);

  const getTransactionsData = async () => {
    dispatch(setTransactions([], 'loading'));

    try {
      await updateFiatsByStatus();
      const transactionsResponse = await getAccountHistory();
      const transactionItems = transactionsResponse.map((transaction) => {
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

      dispatch(setTransactions(transactionItems, 'loaded'));
    } catch (error) {
      console.log('[getTransactionsData]', error);
      dispatch(setTransactions([], 'failed'));
    }
  };

  const updateFiatsByStatus = async () => {
    const fiats = getFiatsArray() || [];

    if (fiats.length === 1) {
      await updateFiats();
    }
  };

  return (
    <CabinetBlock className="TransactionHistory__wrap">
      <div className="TransactionHistory">
        <h1 className="TransactionHistory__title">Transaction History</h1>
        <p className="TransactionHistory__description">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
        <div className="TransactionHistory__table">
          {adaptive ? (
            <TransactionTableAdaptive accountHistory={accountHistory} />
          ) : (
            <TransactionTable accountHistory={accountHistory} />
          )}
        </div>
      </div>
    </CabinetBlock>
  );
}

export default TransactionHistory;
