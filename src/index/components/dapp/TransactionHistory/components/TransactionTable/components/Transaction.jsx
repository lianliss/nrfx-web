import React from 'react';
import PropTypes from 'prop-types';

// Components
import { TD, TR } from '../../../../CabinetTable/CabinetTable';
import Currency from '../../Currency/Currency';
import TransactionLink from '../../TransactionLink/TransactionLink';

const Transaction = ({
  type,
  source_token,
  target_token,
  source_amount,
  target_amount,
  date,
  tx_hash,
}) => {
  return (
    <TR className="TransactionHistory__item">
      <TD color="gray">{date}</TD>
      <TD>{type}</TD>
      <TD>
        <Currency
          type={type}
          source_amount={source_amount}
          target_amount={target_amount}
          source_token={source_token}
          target_token={target_token}
        />
      </TD>
      <TD type="small" color="gray">
        {type === 'exchange' ? 'Done' : 'Approved'}
      </TD>
      <TD color="blue">
        <TransactionLink tx_hash={tx_hash} />
      </TD>
    </TR>
  );
};

Transaction.propTypes = {
  type: PropTypes.string,
  source_token: PropTypes.object,
  target_token: PropTypes.object,
  source_amount: PropTypes.number,
  target_amount: PropTypes.number,
  tx_hash: PropTypes.string,
  date: PropTypes.string,
};

Transaction.defaultProps = {
  type: '',
  source_token: {},
  target_token: {},
  source_amount: 0,
  target_amount: 0,
  tx_hash: null,
  date: '',
};

export default Transaction;
