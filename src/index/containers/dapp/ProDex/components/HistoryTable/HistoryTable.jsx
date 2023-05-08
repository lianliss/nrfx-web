import React from 'react';

import CabinetTable, { TR, TD } from 'dapp/CabinetTable/CabinetTable';
import { Row, NumberFormat } from 'ui';
import SVG from 'utils/svg-wrap';
import Currency from 'dapp/TransactionHistory/components/Currency/Currency';
import TransactionLink from 'dapp/TransactionHistory/components/TransactionLink/TransactionLink';

import useTransactionHistory from 'src/hooks/useTransactionHistory';
import { dataStatus } from 'src/index/constants/dapp/types';
import { getRoundedTime, getTimeDiff } from 'utils/time';
import { getLang } from 'utils';
import { Web3Context } from 'src/services/web3Provider';

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
  const { network } = React.useContext(Web3Context);
  const { accountHistory, status, getTokenUSDPrice } = useTransactionHistory({
    maxAccountHistory: 20,
    forNetworkID: network.networkID,
  });
  const [loadingStatus, setLoadingStatus] = React.useState(dataStatus.IDLE);
  const [tradingAccountHistory, setTradingAccountHistory] = React.useState([]);

  const updateTradingAccountHistory = async () => {
    setLoadingStatus(dataStatus.LOADING);
    setTradingAccountHistory([]);
    let newAccountHistory = [];

    try {
      for (let historyItem of accountHistory) {
        const usdPrice = await getTokenUSDPrice(historyItem.target_token);
        const time = getRoundedTime(getTimeDiff(historyItem.jsTimestamp));
        const newHistoryItem = {
          ...historyItem,
          source_amount_usd: historyItem.target_amount * usdPrice,
          time,
        };

        newAccountHistory.push(newHistoryItem);
      }
    } catch (err) {
      console.log('[updateTradingAccountHistory]', err);
    }

    setTradingAccountHistory(newAccountHistory);
    setLoadingStatus(dataStatus.LOADED);
  };

  React.useEffect(() => {
    if (status !== dataStatus.LOADED) return;

    updateTradingAccountHistory();
  }, [status, network.networkID, accountHistory]);

  const renderTradingAccountHistory = () => {
    const isLoaded = loadingStatus === dataStatus.LOADED;

    if (isLoaded && tradingAccountHistory.length) {
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

    if (isLoaded) {
      return (
        <TR>
          <TD>{getLang('dapp_transactions_empty_yet')}</TD>
          <TD />
          <TD />
          <TD />
        </TR>
      );
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
