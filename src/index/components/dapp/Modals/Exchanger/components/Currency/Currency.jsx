import React from 'react';
import PropTypes from 'prop-types';

// Components
import WalletIcon from 'dapp/WalletIcon/WalletIcon';
import { NumberFormat, Row, Col } from 'ui';
import getFinePrice from 'utils/get-fine-price';

// Styles
import './Currency.less';

function Currency({ currency, amount, name, adaptive }) {
  return (
    <Row className="ExchangerModal__Currency" alignItems="center">
      <WalletIcon size={adaptive ? 35 : 41} currency={currency} />
      <span class="Number">
        {getFinePrice(amount)}
      </span>
      <Col>
        <span className="ExchangerModal__Currency-name">{currency.name}</span>
        <span className="ExchangerModal__Currency-currency">{currency.symbol}</span>
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
