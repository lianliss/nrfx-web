import React from 'react';

// Components
import { NumberFormat } from 'src/ui';
import CabinetBlock from '../../../CabinetBlock/CabinetBlock';
import Transaction from '../Transaction/Transaction';
import LoadingStatus from '../../../LoadingStatus/LoadingStatus';
import TransactionTableAdaptive from '../../../TransactionHistory/components/TransactionTableAdaptive/TransactionTableAdaptive';

// Utils
import { Web3Context } from 'src/services/web3Provider';
import { useSelector } from 'react-redux';
import { getLang } from 'src/utils';
import txs from './txs';

function Transactions({ currency }) {
  const adaptive = useSelector((state) => state.default.adaptive);
  const lang = useSelector((state) => state.default.currentLang);
  const [loading, setLoading] = React.useState(null);
  const [transactionsHistory, setTransactionsHistory] = React.useState([]);
  const { accountAddress } = React.useContext(Web3Context);

  React.useEffect(() => {
    if (accountAddress) {
      setLoading('loading');
    }

    setLoading('loaded');
  }, [currency, lang]);

  return (
    <CabinetBlock className="Currency__transactions">
      <div className="Currency__transactions__header">
        <h3>{getLang('dapp_transaction_history')}</h3>
      </div>
      <div className="Currency__transactions__body">
        {loading === 'loading' && <LoadingStatus status="loading" inline />}
        {!loading &&
          (transactionsHistory.length ? (
            <div>Transactions not exists</div>
          ) : (
            <TransactionTableAdaptive accountHistory={txs} />
          ))}
      </div>
    </CabinetBlock>
  );
}

function getFineNumber(number, fractionNumber) {
  return Number(number.toFixed(fractionNumber));
}

export default Transactions;
