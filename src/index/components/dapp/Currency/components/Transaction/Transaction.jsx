import React from 'react';
import PropTypes from 'prop-types';

// Components
import { NumberFormat, Col, Row } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Styles
import './Transaction.less';

function Transaction({ currency, type, bank, number, transactionsExists }) {
  const isReplenishment = type === 'replenishment';

  return (
    <Row
      justifyContent="space-between"
      alignItems="center"
      className="Currency__Transaction"
    >
      <Col>
        <Row justifyContent="space-between" alignItems="center">
          {isReplenishment ? (
            <SVG src={require('src/asset/icons/cabinet/replenishment.svg')} />
          ) : (
            <SVG src={require('src/asset/icons/cabinet/withdrawal.svg')} />
          )}
          <Col>
            <p>{isReplenishment ? 'Replenishment' : 'Withdrawal'}</p>
            {isReplenishment && bank && <p>{bank}</p>}
          </Col>
        </Row>
      </Col>
      <Col>
        <Row alignItems="center">
          {transactionsExists ? (
            <div className="Currency__Transaction__amount">
              +&nbsp;
              <NumberFormat number={number} currency={currency.abbr} />
            </div>
          ) : (
            <div className="Currency__Transaction__amount-empty">
              <span>You have no transactions</span>
            </div>
          )}
          <div className="Currency__Transaction__arrow">
            <SVG src={require('src/asset/icons/list-arrow-large.svg')} />
          </div>
        </Row>
      </Col>
    </Row>
  );
}

Transaction.propTypes = {
  currency: PropTypes.object,
  type: PropTypes.string,
  bank: PropTypes.string,
  number: PropTypes.number,
  transactionsExists: PropTypes.bool,
};

Transaction.defaultProps = {
  currency: {},
  type: 'replenishment',
  bank: '',
  number: 0,
  transactionsExists: true,
};

export default Transaction;
