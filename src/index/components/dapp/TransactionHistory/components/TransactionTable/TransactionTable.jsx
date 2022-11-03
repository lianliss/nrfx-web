import React from 'react';
import PropTypes from 'prop-types';

// Components
import CabinetTable, { TD, TR } from '../../../CabinetTable/CabinetTable';
import Transaction from './components/Transaction';
import SVG from 'utils/svg-wrap';

// Utils
import { getLang } from 'utils';

function TransactionTable({ accountHistory }) {
  return (
    <CabinetTable
      header={
        <TR>
          <TD>
            {getLang('dapp_transaction_date')}
            <span className="TransactionHistory__icon-sortArrow">
              <SVG src={require('src/asset/icons/cabinet/select-arrow.svg')} />
            </span>
          </TD>
          <TD>{getLang('dapp_transaction_operation')}</TD>
          <TD>{getLang('dapp_transaction_currency')}</TD>
          <TD>{getLang('dapp_transaction_status')}</TD>
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
