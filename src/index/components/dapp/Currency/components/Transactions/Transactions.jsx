import React from 'react';

// Components
import CabinetBlock from '../../../CabinetBlock/CabinetBlock';
import TransactionTableAdaptive from '../../../TransactionHistory/components/TransactionTableAdaptive/TransactionTableAdaptive';
import TransactionHistoryOverlay from '../../../TransactionHistory/components/TransactionHistoryOverlay/TransactionHistoryOverlay';

// Utils
import { getLang } from 'src/utils';
import useTransactionHistory from 'src/hooks/useTransactionHistory';

function Transactions({ currency }) {
  const {
    accountHistory,
    mappedTestHistory,
    transactions,
    adaptive,
    isConnected,
  } = useTransactionHistory();

  const currencyAccountHistory = accountHistory.filter(
    (transaction) =>
      transaction.source_currency === currency.symbol ||
      transaction.target_currency === currency.symbol
  );

  return (
    <CabinetBlock className="Currency__transactions">
      <div className="Currency__transactions__header">
        <h3>{getLang('dapp_transaction_history')}</h3>
      </div>
      <div className="Currency__transactions__body">
        {/* <LoadingStatus status="loading" inline /> */}
        <TransactionTableAdaptive
          adaptive={adaptive}
          accountHistory={
            currencyAccountHistory.length
              ? currencyAccountHistory
              : mappedTestHistory.slice(0, 3)
          }
        />
        {!currencyAccountHistory.length && (
          <TransactionHistoryOverlay
            transactionsStatus={transactions.status}
            isConnectWalletButton={!isConnected}
          />
        )}
      </div>
    </CabinetBlock>
  );
}

function getFineNumber(number, fractionNumber) {
  return Number(number.toFixed(fractionNumber));
}

export default Transactions;
