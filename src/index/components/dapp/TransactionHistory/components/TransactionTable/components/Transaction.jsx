import React from 'react';
import PropTypes from 'prop-types';

// Components
import { TD, TR } from '../../../../CabinetTable/CabinetTable';
import Currency from '../../Currency/Currency';
import TransactionLink from '../../TransactionLink/TransactionLink';

const Transaction = ({
  type,
  source_currency,
  target_currency,
  source_amount,
  target_amount,
  date,
  link,
}) => (
  <TR className="TransactionHistory__item">
    <TD color="gray">10.01.2022</TD>
    <TD>{type}</TD>
    <TD>
      <Currency
        type={type}
        source_amount={source_amount}
        target_amount={target_amount}
        source_currency={source_currency}
        target_currency={target_currency}
      />
    </TD>
    <TD type="small" color="gray">
      {type === 'exchange' ? 'Done' : 'Approved'}
    </TD>
    <TD color="blue">
      <TransactionLink />
    </TD>
  </TR>
);

Transaction.propTypes = {
  type: PropTypes.string,
  source_currency: PropTypes.object,
  target_currency: PropTypes.object,
  source_amount: PropTypes.number,
  target_amount: PropTypes.number,
  date: PropTypes.number,
  link: PropTypes.string,
};

Transaction.defaultProps = {
  type: '',
  source_currency: {},
  target_currency: {},
  source_amount: 0,
  target_amount: 0,
  date: 0,
  link: null,
};

export default Transaction;
