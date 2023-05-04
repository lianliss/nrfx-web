import React from 'react';
import { useSelector } from 'react-redux';
import CabinetTable, { TR, TD } from 'dapp/CabinetTable/CabinetTable';
import { Row, NumberFormat } from 'ui';
import SVG from 'utils/svg-wrap';
import Currency from 'dapp/TransactionHistory/components/Currency/Currency';
import TransactionLink from 'dapp/TransactionHistory/components/TransactionLink/TransactionLink';
import useTransactionHistory from 'src/hooks/useTransactionHistory';
import { web3RatesSelector } from 'src/selectors';
import { dataStatus } from 'src/index/constants/dapp/types';

// const objectExample = {
//   currency: {
//     source_token: KNOWN_FIATS[0],
//     target_token: KNOWN_FIATS[1],
//     source_amount: 0.56666,
//     target_amount: 1600000,
//   },
//   coinRate: 143.7,
//   time: '15 sec',
//   tx_hash: 'test',
// };

const HistoryTable = ({ coin }) => {
  const { accountHistory, transactions, status, getTokenUSDPrice } =
    useTransactionHistory({
      maxAccountHistory: 20,
    });
  const [loadingStatus, setLoadingStatus] = React.useState(dataStatus.IDLE);
  const [tradingAccountHistory, setTradingAccountHistory] = React.useState([]);

  const updateTradingAccountHistory = async () => {
    setLoadingStatus(dataStatus.LOADING);
    setTradingAccountHistory([]);

    for (let historyItem of accountHistory) {
      const usdPrice = 1 || (await getTokenUSDPrice(historyItem.source_token));
      console.log(usdPrice);
      const newHistoryItem = {
        ...historyItem,
        source_amount_usd: historyItem.source_amount * usdPrice,
      };

      setTradingAccountHistory((prev) => [...prev, newHistoryItem]);
    }

    setLoadingStatus(dataStatus.LOADED);
  };

  React.useEffect(() => {
    if (transactions.status !== dataStatus.LOADED) return;

    updateTradingAccountHistory();
  }, [status]);

  const renderTradingAccountHistory = () => {
    if (loadingStatus === dataStatus.LOADED) {
      return tradingAccountHistory.map((historyItem, i) => (
        <TR key={`${historyItem.tx_hash}_${i}`}>
          <TD>
            <Row gap={3} alignItems="center">
              <SVG src={require('src/asset/24px/arrow_drop_up.svg')} flex />
              <span className="emerald-color">
                <NumberFormat
                  prefix="$"
                  number={historyItem.source_amount_usd}
                />
              </span>
            </Row>
          </TD>
          <TD>
            <Currency
              type="exchange"
              source_token={historyItem.source_token}
              target_token={historyItem.target_token}
              source_amount={historyItem.source_amount}
              target_amount={historyItem.target_amount}
            />
          </TD>
          <TD className="cool-gray-color">{historyItem.time}</TD>
          <TD className="royal-blue-color" contentWidth>
            <TransactionLink tx_hash={historyItem.tx_hash} />
          </TD>
        </TR>
      ));
    }
  };

  return (
    <CabinetTable
      header={
        <TR>
          <TD>{coin}</TD>
          <TD>Currency</TD>
          <TD>Time</TD>
        </TR>
      }
    >
      {renderTradingAccountHistory()}
    </CabinetTable>
  );
};

export default HistoryTable;
