import React from 'react';

import { NumberFormat } from 'src/ui';
import CabinetBlock from '../../../CabinetBlock/CabinetBlock';
import Transaction from '../Transaction/Transaction';
import LoadingStatus from '../../../LoadingStatus/LoadingStatus';

import { Web3Context } from 'src/services/web3Provider';
import { useSelector } from 'react-redux';
import { getLang } from 'src/utils';

function Transactions({ currency }) {
  const adaptive = useSelector((state) => state.default.adaptive);
  const lang = useSelector((state) => state.default.currentLang);
  const [loading, setLoading] = React.useState(null);
  const [transactionsHistory, setTransactionsHistory] = React.useState([]);
  const { accountAddress } = React.useContext(Web3Context);
  const fixedNumber = adaptive ? 2 : 5;

  const TradeDescription = ({ token0, token1, amount0, amount1 }) => (
    <>
      <NumberFormat
        currency={token0}
        number={getFineNumber(amount0, fixedNumber)}
      />{' '}
      {getLang('dapp_global_exchange_to').toLowerCase()}{' '}
      <NumberFormat
        currency={token1}
        number={getFineNumber(amount1, fixedNumber)}
      />
    </>
  );

  React.useEffect(() => {
    if (accountAddress) {
      setLoading('loading');
    }

    if (!currency) return;

    const exchangerName = 'ExchangerSwapTransactions';
    const dexSwapName = 'DexSwapTransactions';
    const dates = [];

    const handleExchangeTransaction = (transaction) => {
      const displayDate = getDate(transaction.date);
      const description = <TradeDescription {...transaction} />;
      const isIncrement = transaction.token1 === currency.symbol;

      if (displayDate) {
        if (!dates.find((item) => item.displayDate === displayDate)) {
          dates.push({ displayDate, date: transaction.date });
        }
      }

      return {
        ...transaction,
        type: 'Trade',
        isIncrement,
        description,
        displayDate,
        currencyAmount: isIncrement ? transaction.amount1 : transaction.amount0,
      };
    };

    const exchangerTransactions = getAccountLocalItems(exchangerName).map(
      handleExchangeTransaction
    );
    const dexSwapTransactions = getAccountLocalItems(dexSwapName).map(
      handleExchangeTransaction
    );

    const transactions = getFilteredTransactions(
      [...exchangerTransactions, ...dexSwapTransactions],
      dates
    );

    setTransactionsHistory(transactions);
    setLoading('loaded');
  }, [currency, lang]);

  const getFilteredTransactions = (rawTransactions, dates) => {
    let transactions = [...rawTransactions];
    transactions = dates
      .sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      })
      .map((date) => {
        const currencyTransactions = transactions
          .filter((transaction) => transaction.displayDate === date.displayDate)
          .sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });

        return { date, transactions: currencyTransactions };
      });

    return transactions;
  };

  const getAccountLocalItems = (name) => {
    const record = window.localStorage.getItem(name);
    const items = record ? JSON.parse(record) : [];

    return items
      .filter((item) => item.accountAddress === accountAddress)
      .filter((transaction) => {
        return (
          transaction.token0 === currency.symbol ||
          transaction.token1 === currency.symbol
        );
      });
  };

  const getDate = (date) => {
    if (!date) return;

    return new Intl.DateTimeFormat(lang, {
      day: 'numeric',
      month: 'long',
    }).format(new Date(date));
  };

  console.log(transactionsHistory);

  return (
    <CabinetBlock className="Currency__transactions">
      <div className="Currency__transactions__header">
        <h3>{getLang('dapp_transaction_history')}</h3>
      </div>
      <div className="Currency__transactions__body">
        {loading === 'loading' && <LoadingStatus status="loading" inline />}
        {loading === 'loaded' &&
          (!transactionsHistory.length ? (
            <div>Transactions not exists</div>
          ) : (
            <ul className="Currency__dates">
              {transactionsHistory.map((item, key) => (
                <li className="Currency__date" key={key}>
                  <h4>{item.date.displayDate}</h4>
                  <div>
                    {item.transactions.map((transaction, key) => (
                      <Transaction
                        key={key}
                        type={transaction.type}
                        description={transaction.description}
                        isIncrement={transaction.isIncrement}
                        number={
                          <NumberFormat
                            number={getFineNumber(
                              transaction.currencyAmount,
                              5
                            )}
                            currency={adaptive ? '' : currency.symbol}
                          />
                        }
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          ))}
      </div>
    </CabinetBlock>
  );
}

function getFineNumber(number, fractionNumber) {
  return Number(number.toFixed(fractionNumber));
}

export default Transactions;
