import React from 'react';

// Components
import { NumberFormat } from 'src/ui';
import CabinetBlock from '../../../CabinetBlock/CabinetBlock';
import Transaction from '../Transaction/Transaction';
import LoadingStatus from '../../../LoadingStatus/LoadingStatus';
import TransactionTableAdaptive from '../../../TransactionHistory/components/TransactionTableAdaptive/TransactionTableAdaptive';

// Utils
import { getLang } from 'src/utils';
import useTransactionHistory from 'src/hooks/useTransactionHistory';
import { statusEqual } from '../../../TransactionHistory/utils/actions';
import { dataStatus } from 'src/index/constants/dapp/types';

function Transactions({ currency }) {
  const { accountHistory, transactions, adaptive } = useTransactionHistory();

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
        {statusEqual(transactions.status, dataStatus.LOADING) ? (
          <LoadingStatus status="loading" inline />
        ) : currencyAccountHistory.length ? (
          <TransactionTableAdaptive
            adaptive={adaptive}
            accountHistory={currencyAccountHistory}
          />
        ) : (
          <div>Transactions not exists</div>
        )}
      </div>
    </CabinetBlock>
  );
}

function getFineNumber(number, fractionNumber) {
  return Number(number.toFixed(fractionNumber));
}

export default Transactions;
