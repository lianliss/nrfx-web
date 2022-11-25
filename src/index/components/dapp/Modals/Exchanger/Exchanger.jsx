import React from 'react';

// Components
import { CabinetModal } from 'dapp';
import Currency from './components/Currency/Currency';
import { Col } from 'ui';

// Styles
import './Exchanger.less';

function Exchanger({ ...props }) {
  return (
    <CabinetModal className="ExchangerModal" closeOfRef closeButton {...props}>
      <div className="ExchangerModal__container">
        <h3>Exchange</h3>
        <Col className="ExchangerModal__Currency__container">
          <span>You give</span>
          <Currency name="ethereum" currency="NRFX" amount={14293123.13123} />
        </Col>
        <Col className="ExchangerModal__Currency__container">
          <span>You receive</span>
          <Currency name="ethereum" currency="USDT" amount={14293123.13123} />
        </Col>
      </div>
    </CabinetModal>
  );
}

export default Exchanger;
