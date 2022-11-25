import React from 'react';
import PropTypes from 'prop-types';

// Components
import WalletIcon from 'dapp/WalletIcon/WalletIcon';
import { NumberFormat, Row, Col } from 'ui';

// Styles
import './Currency.less';

function Currency({ currency, amount, name }) {
  return (
    <Row className="ExchangerModal__Currency" alignItems="center">
      <WalletIcon size={41} currency={currency} />
      <NumberFormat number={amount} />
      <Col>
        <span className="ExchangerModal__Currency-name">{name}</span>
        <span className="ExchangerModal__Currency-currency">{currency}</span>
      </Col>
    </Row>
  );
}

Currency.propTypes = {
  currency: PropTypes.string,
  amount: PropTypes.number,
  name: PropTypes.string,
};

export default Currency;
