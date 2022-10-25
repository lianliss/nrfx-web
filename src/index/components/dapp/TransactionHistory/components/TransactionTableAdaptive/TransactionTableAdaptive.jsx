import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Col, Row } from 'ui';
import Currency from '../Currency/Currency';
import TransactionLink from '../TransactionLink/TransactionLink';

// Styles
import './TransactionTableAdaptive.less';

function TransactionTableAdaptive({ accountHistory, getTokenFromSymbol }) {
  return (
    <div className="TransactionHistory__table">
      {accountHistory.map((item, key) => {
        const firstToken = getTokenFromSymbol(item.source_currency);
        const secondToken = getTokenFromSymbol(item.target_currency);

        return (
          <Col className="TransactionHistory__table__item" key={key}>
            <Row className="TransactionHistory__table-currency">
              <Currency
                type={item.type}
                source_currency={firstToken}
                target_currency={secondToken}
                source_amount={item.source_amount}
                target_amount={item.target_amount}
              />
            </Row>
            <Row alignItems="flex-end" justifyContent="space-between">
              <Col>
                <span className="TransactionHistory__table-date">
                  10.01.2022
                </span>
                <span className="TransactionHistory__table-status">
                  {item.type === 'exchange' ? 'Done' : 'Approved'}
                </span>
              </Col>
              <span className="TransactionHistory__table-operation">
                {item.type}
              </span>
              <div className="TransactionHistory__table-link">
                <TransactionLink />
              </div>
            </Row>
          </Col>
        );
      })}
    </div>
  );
}

TransactionTableAdaptive.propTypes = {
  accountHistory: PropTypes.array,
  getTokenFromSymbol: PropTypes.func,
};

TransactionTableAdaptive.defaultProps = {
  accountHistory: [],
  getTokenFromSymbol: () => {},
};

export default TransactionTableAdaptive;
