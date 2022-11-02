import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import TransactionTable from './components/TransactionTable/TransactionTable';
import TransactionTableAdaptive from './components/TransactionTableAdaptive/TransactionTableAdaptive';
import LoadingStatus from '../LoadingStatus/LoadingStatus';

// Utils
import { getLang } from 'src/utils';
import { Web3Context } from 'src/services/web3Provider';
import { adaptiveSelector, dappTransactionsSelector } from 'src/selectors';
import {
  setTransactionItems,
  setTransactionsStatus,
  sortTransactions,
} from 'src/actions/dapp/wallet';
import _ from 'lodash';
import moment from 'moment';
import { dataStatus, sortTypes } from 'src/index/constants/dapp/types';
import { Web3Backend } from '../../../../services/web3-backend';

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
    const back = new Web3Backend();
    back.getBanks().then(console.log);
    back.getWithdrawBanks().then((r) => {
      const arr = {};
      r.RUB.map((i) => {
        const code = i.code.toLowerCase();
        arr[code] = `require('src/asset/banks/${code}.svg')`;
      });

      r.IDR.map((i) => {
        const code = i.code.toLowerCase();
        arr[code] = `require('src/asset/banks/${code}.svg')`;
      });

      r.UAH.map((i) => {
        const code = i.code.toLowerCase();
        arr[code] = `require('src/asset/banks/${code}.svg')`;
      });

      console.log(arr);
    });

    if (transactions.status !== dataStatus.LOADED) return;

    dispatch(setTransactionItems([]));
    dispatch(setTransactionsStatus(dataStatus.IDLE));
  }, []);

  // Get transactions.
  React.useEffect(() => {
    if (!isConnected) return;

    getTransactionsData();
  }, [accountAddress]);

  const getTransactionsData = async () => {
    dispatch(setTransactionsStatus(dataStatus.LOADING));

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

      dispatch(setTransactionItems(transactionItems));
      dispatch(sortTransactions(sortTypes.DATE_DESC));
      dispatch(setTransactionsStatus(dataStatus.LOADED));
    } catch (error) {
      console.log('[getTransactionsData]', error);
      dispatch(setTransactionsStatus(dataStatus.FAILED));
    }
  };

  const updateFiatsByStatus = async () => {
    const fiats = getFiatsArray() || [];

    if (fiats.length === 1) {
      await updateFiats();
    }
  };

  const Transactions = ({ accountHistory }) => {
    const component = adaptive ? (
      <TransactionTableAdaptive accountHistory={accountHistory} />
    ) : (
      <TransactionTable accountHistory={accountHistory} />
    );

    return component;
  };

  return (
    <CabinetBlock className="TransactionHistory__wrap">
      <div className="TransactionHistory">
        <h1 className="TransactionHistory__title">
          {getLang('dapp_transaction_history_title')}
        </h1>
        <p className="TransactionHistory__description">
          {getLang('dapp_transaction_history_description')}
        </p>
        <div className="TransactionHistory__table">
          {transactions.status === dataStatus.LOADING && (
            <LoadingStatus status="loading" />
          )}
          {transactions.status === dataStatus.LOADED && (
            <Transactions accountHistory={accountHistory} />
          )}
        </div>
      </div>
    </CabinetBlock>
  );
}

export default TransactionHistory;
