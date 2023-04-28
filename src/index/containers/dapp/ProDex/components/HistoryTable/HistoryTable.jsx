import React from 'react';
import CabinetTable, { TR, TD } from 'dapp/CabinetTable/CabinetTable';
import { Row } from 'ui';
import SVG from 'utils/svg-wrap';
import Currency from 'dapp/TransactionHistory/components/Currency/Currency';
import TransactionLink from 'dapp/TransactionHistory/components/TransactionLink/TransactionLink';

const HistoryTable = ({ items, coin }) => {
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
      {items.map(({ coinRate, currency, time, tx_hash }, i) => (
        <TR key={`${tx_hash}_${i}`}>
          <TD>
            <Row gap={3} alignItems="center">
              <SVG src={require('src/asset/24px/arrow_drop_up.svg')} flex />
              <span className="emerald-color">{coinRate}</span>
            </Row>
          </TD>
          <TD>
            <Currency
              type="exchange"
              source_token={currency.source_token}
              target_token={currency.target_token}
              source_amount={currency.source_amount}
              target_amount={currency.target_amount}
            />
          </TD>
          <TD className="cool-gray-color">{time}</TD>
          <TD className="royal-blue-color" contentWidth>
            <TransactionLink tx_hash={tx_hash} />
          </TD>
        </TR>
      ))}
    </CabinetTable>
  );
};

export default HistoryTable;
