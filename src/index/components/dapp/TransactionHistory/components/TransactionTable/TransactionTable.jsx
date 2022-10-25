import React from 'react';
import PropTypes from 'prop-types';

// Components
import CabinetTable, { TD, TR } from '../../../CabinetTable/CabinetTable';
import Transaction from './components/Transaction';

function TransactionTable({ accountHistory, getTokenFromSymbol }) {
  return (
    <CabinetTable
      header={
        <TR>
          <TD>Date</TD>
          <TD>Operation</TD>
          <TD>Currency</TD>
          <TD>Status</TD>
          <TD></TD>
        </TR>
      }
    >
      {accountHistory.map((item, key) => {
        const firstToken = getTokenFromSymbol(item.source_currency);
        const secondToken = getTokenFromSymbol(item.target_currency);

        return (
          <Transaction
            key={key}
            type={item.type}
            source_currency={firstToken}
            target_currency={secondToken}
            source_amount={item.source_amount}
            target_amount={item.target_amount}
          />
        );
      })}
    </CabinetTable>
  );
}

TransactionTable.propTypes = {
  accountHistory: PropTypes.array,
  getTokenFromSymbol: PropTypes.func,
};

TransactionTable.defaultProps = {
  accountHistory: [],
  getTokenFromSymbol: () => {},
};

export default TransactionTable;
