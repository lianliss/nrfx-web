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
import _ from 'lodash';
import { dataStatus } from 'src/index/constants/dapp/types';
import { openStateModal } from 'src/actions';

// Styles
import './TransactionHistory.less';
import { getTransactionsData, statusEqual } from './utils/actions';
import { useClearTransactions } from './utils/hooks';

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
  React.useEffect(() => {
    if (!isConnected) return;

    getTransactionsData(
      dispatch,
      getFiatsArray,
      getAccountHistory,
      getTokenFromSymbol,
      updateFiats
    );
  }, [accountAddress]);

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
              blur: !accountHistoryExists,
            })}
          >
            {accountHistoryExists ? (
              <Transactions accountHistory={accountHistory} />
            ) : (
              <Transactions
                accountHistory={
                  adaptive ? mappedTestHistory.slice(0, 4) : mappedTestHistory
                }
              />
            )}
          </div>
          {!accountHistoryExists && (
            <Overlay>
              <Col alignItems="center">
                {statusEqual(transactions.status, dataStatus.LOADING) ? (
                  <LoadingStatus status="loading" />
                ) : (
                  <>
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
                  </>
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
