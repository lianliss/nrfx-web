import React from 'react';
import PropTypes from 'prop-types';

// Components
import CabinetTable, { TD, TR } from '../../../CabinetTable/CabinetTable';
import Transaction from './components/Transaction';
import SVG from 'utils/svg-wrap';

function TransactionTable({ accountHistory }) {
  return (
    <CabinetTable
      header={
        <TR>
          <TD>
            Date
            <span className="TransactionHistory__icon-sortArrow">
              <SVG src={require('src/asset/icons/cabinet/select-arrow.svg')} />
            </span>
          </TD>
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
