import React from 'react';
import PropTypes from 'prop-types';

// Components
import CabinetTable, { TD, TR } from '../../../CabinetTable/CabinetTable';
import Transaction from './components/Transaction';

function TransactionTable({ accountHistory }) {
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
        return <Transaction key={key} {...item} />;
      })}
    </CabinetTable>
  );
}

TransactionTable.propTypes = {
  accountHistory: PropTypes.array,
};

TransactionTable.defaultProps = {
  accountHistory: [],
};

export default TransactionTable;
