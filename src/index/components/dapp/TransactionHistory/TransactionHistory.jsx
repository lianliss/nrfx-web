import React from 'react';
import { useSelector } from 'react-redux';

// Components
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import TransactionTable from './components/TransactionTable/TransactionTable';
import TransactionTableAdaptive from './components/TransactionTableAdaptive/TransactionTableAdaptive';

// Utils
import { getLang } from 'src/utils';
import { Web3Context } from '../../../../services/web3Provider';
import { adaptiveSelector } from 'src/selectors';

// Styles
import './TransactionHistory.less';

const accountHistory = [
  {
    type: 'topup',
    source_currency: 'RUB',
    target_currency: 'RUB',
    source_amount: 22000,
    target_amount: 22000,
    timestamp: 1666282025,
  },
  {
    type: 'exchange',
    source_currency: 'RUB',
    target_currency: 'USDT',
    source_amount: 22000,
    target_amount: 334.342,
    timestamp: 1666282429,
  },
];

function TransactionHistory() {
  const adaptive = useSelector(adaptiveSelector);
  const { getAccountHistory, accountAddress, getTokenFromSymbol } =
    React.useContext(Web3Context);

  // React.useEffect(() => {
  //   getAccountHistory().then(console.log);
  // }, [accountAddress]);

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
            <TransactionTableAdaptive
              accountHistory={accountHistory}
              getTokenFromSymbol={getTokenFromSymbol}
            />
          ) : (
            <TransactionTable
              accountHistory={accountHistory}
              getTokenFromSymbol={getTokenFromSymbol}
            />
          )}
        </div>
      </div>
    </CabinetBlock>
  );
}

export default TransactionHistory;
