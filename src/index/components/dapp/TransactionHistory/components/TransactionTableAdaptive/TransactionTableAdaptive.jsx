import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Col, Row } from 'ui';
import Currency from '../Currency/Currency';
import TransactionLink from '../TransactionLink/TransactionLink';

// Utils
import { getLang } from 'utils';
import transactionLangs from '../../constants/transactionLangs';

// Styles
import './TransactionTableAdaptive.less';

function TransactionTableAdaptive({ accountHistory, adaptive }) {
  return (
    <div className="TransactionHistory__tableAdaptive">
      {accountHistory.map((item, key) => {
        return (
          <Col className="TransactionHistory__tableAdaptive__item" key={key}>
            <Row
              className="TransactionHistory__tableAdaptive-currency"
              alignItems="center"
            >
              <Currency
                type={item.type}
                source_token={item.source_token}
                target_token={item.target_token}
                source_amount={item.source_amount}
                target_amount={item.target_amount}
              />
              {!adaptive && (
                <span className="TransactionHistory__tableAdaptive-status">
                  {item.type === 'exchange'
                    ? getLang('status_done')
                    : getLang('status_approved')}
                </span>
              )}
            </Row>
            <Row alignItems="flex-end" justifyContent="space-between">
              <Col>
                <span className="TransactionHistory__tableAdaptive-date">
                  {item.date}
                </span>
                {adaptive && (
                  <span className="TransactionHistory__tableAdaptive-status">
                    {item.type === 'exchange'
                      ? getLang('status_done')
                      : getLang('status_approved')}
                  </span>
                )}
              </Col>
              <span className="TransactionHistory__tableAdaptive-operation">
                {transactionLangs[item.type]
                  ? getLang(transactionLangs[item.type])
                  : item.type}
              </span>
              <div className="TransactionHistory__tableAdaptive-link">
                <TransactionLink tx_hash={item.tx_hash} />
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
  adaptive: PropTypes.bool,
};

TransactionTableAdaptive.defaultProps = {
  accountHistory: [],
  adaptive: false,
};

export default TransactionTableAdaptive;
