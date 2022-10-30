import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Col, Row } from 'src/ui';
import SVG from 'utils/svg-wrap';
import { getLang } from 'src/utils';

// Styles
import './Transaction.less';

function Transaction({
  type,
  description,
  transactionsExists,
  number,
  isIncrement,
}) {
  return (
    <Row
      justifyContent="space-between"
      alignItems="center"
      className="Currency__Transaction"
    >
      <Col>
        <Row justifyContent="stretch" alignItems="center">
          {type === 'Trade' && (
            <SVG
              src={require(`src/asset/icons/cabinet/sidebar/exchange.svg`)}
            />
          )}
          {type === 'Replenishment' && (
            <SVG src={require('src/asset/icons/cabinet/replenishment.svg')} />
          )}
          {type === 'Withdrawal' && (
            <SVG src={require('src/asset/icons/cabinet/withdrawal.svg')} />
          )}
          <Col>
            <p>{getLang(`dapp_currency_transaction_${type.toLowerCase()}`)}</p>
            {description && <p>{description}</p>}
          </Col>
        </Row>
      </Col>
      <Col>
        <Row alignItems="center">
          {transactionsExists ? (
            <div className="Currency__Transaction__amount">
              {isIncrement ? '+' : '-'}&nbsp;
              {number}
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
  type: PropTypes.oneOf(['Replenishment', 'Withdrawal', 'Trade']),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.element]),
  transactionsExists: PropTypes.bool,
  isIncrement: PropTypes.bool,
};

Transaction.defaultProps = {
  type: 'replenishment',
  description: '',
  number: 0,
  transactionsExists: true,
  isIncrement: true,
};

export default Transaction;
