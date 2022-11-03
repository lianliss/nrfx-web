import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import TransactionTable from './components/TransactionTable/TransactionTable';
import TransactionTableAdaptive from './components/TransactionTableAdaptive/TransactionTableAdaptive';
import LoadingStatus from '../LoadingStatus/LoadingStatus';
import Overlay from '../ui/Overlay/Overlay';
import { Button, Col } from 'ui';
import SVG from 'utils/svg-wrap';

// Utils
import { getLang, classNames as cn } from 'src/utils';
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
import { openStateModal } from 'src/actions';
import testItems from './constants/testItems';

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
  const [mappedTestHistory, setMappedTestHistory] = React.useState([]);
  const isBlur = !(statusEqual(dataStatus.LOADING) || accountHistory.length);
  const accountHistoryExists =
    statusEqual(dataStatus.LOADED) && accountHistory.length > 0;

  // Functional.
  // Clear the filled transactions and set testItems.
  React.useEffect(() => {
    const newMappedTestHistory = transactionsMap(testItems);
    setMappedTestHistory(newMappedTestHistory);

    if (!statusEqual(dataStatus.LOADED)) return;

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
      const transactionItems = transactionsMap(transactionsResponse || []);

      dispatch(setTransactionItems(transactionItems));
      dispatch(sortTransactions(sortTypes.DATE_DESC));
      dispatch(setTransactionsStatus(dataStatus.LOADED));
    } catch (error) {
      console.log('[getTransactionsData]', error);
      dispatch(setTransactionsStatus(dataStatus.FAILED));
    }
  };

  const transactionsMap = (array) => {
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

  const updateFiatsByStatus = async () => {
    const fiats = getFiatsArray() || [];

    if (fiats.length === 1) {
      await updateFiats();
    }
  };

  function statusEqual(status) {
    return transactions.status === status;
  }

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
          <div
            className={cn({
              TransactionHistory__table__container: true,
              blur: isBlur,
            })}
          >
            {statusEqual(dataStatus.LOADING) && (
              <LoadingStatus status="loading" />
            )}
            {accountHistoryExists && (
              <Transactions accountHistory={accountHistory} />
            )}
            {isBlur && (
              <Transactions
                accountHistory={
                  adaptive ? mappedTestHistory.slice(0, 4) : mappedTestHistory
                }
              />
            )}
          </div>
          {isBlur && (
            <Overlay>
              <Col alignItems="center">
                <span className="DappUI__Overlay-empty">
                  {getLang('dapp_transactions_empty_yet')}
                </span>
                {!isConnected && (
                  <Button
                    type="lightBlue"
                    size="extra_large"
                    onClick={() => openStateModal('connect_to_wallet')}
                  >
                    <SVG
                      src={require('src/asset/icons/cabinet/connect-wallet.svg')}
                    />
                    {getLang('dapp_global_connect_wallet')}
                  </Button>
                )}
              </Col>
            </Overlay>
          )}
        </div>
      </div>
    </CabinetBlock>
  );
}

export default TransactionHistory;
