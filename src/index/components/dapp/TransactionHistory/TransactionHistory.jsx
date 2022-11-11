import React from 'react';

// Components
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import TransactionTable from './components/TransactionTable/TransactionTable';
import TransactionTableAdaptive from './components/TransactionTableAdaptive/TransactionTableAdaptive';
import TransactionHistoryOverlay from './components/TransactionHistoryOverlay/TransactionHistoryOverlay';

// Utils
import { getLang, classNames as cn } from 'src/utils';
import _ from 'lodash';
import useTransactionHistory from 'src/hooks/useTransactionHistory';

// Styles
import './TransactionHistory.less';

function TransactionHistory() {
  const {
    adaptive,
    isConnected,
    accountHistory,
    mappedTestHistory,
    transactions,
    accountHistoryExists,
  } = useTransactionHistory();

  const Transactions = ({ accountHistory }) => {
    const component = adaptive ? (
      <TransactionTableAdaptive
        adaptive={true}
        accountHistory={accountHistory}
      />
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
            <TransactionHistoryOverlay
              isConnectWalletButton={!isConnected}
              transactionsStatus={transactions.status}
            />
          )}
        </div>
      </div>
    </CabinetBlock>
  );
}

export default TransactionHistory;
