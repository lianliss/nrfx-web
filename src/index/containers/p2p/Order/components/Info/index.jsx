import React from 'react';

// Components
import { Row, Col } from 'ui';
import {
  OrderCreatedDate,
  OrderCreatedTextCopy,
  OrderCreatedTime,
} from 'src/index/components/p2p';

// Styles
import './index.less';

function Info() {
  return (
    <div className="p2p-order-info">
      <Col alignItems="flex-end">
        <Row
          className="p2p-order-info__item"
          alignItems="center"
          justifyContent="flex-end"
        >
          <span>Order number:</span>
          <OrderCreatedTextCopy text="444566673777788877655556677" />
        </Row>
        <Row
          className="p2p-order-info__item"
          alignItems="center"
          justifyContent="flex-end"
        >
          <span>Time created:</span>
          <OrderCreatedTime time={new Date()} />
          <OrderCreatedDate date={new Date()} />
        </Row>
      </Col>
    </div>
  );
}

export default Info;
