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

function Info({ adaptive }) {
  return (
    <div className="p2p-order-info">
      <Col alignItems={adaptive ? 'flex-start' : 'flex-end'}>
        <Row
          className="p2p-order-info__item"
          alignItems="center"
          justifyContent={adaptive ? 'space-between' : 'flex-end'}
        >
          <div>Order number:</div>
          <div className="p2p-order-info__data">
            <OrderCreatedTextCopy text="444566677777888776556" />
          </div>
        </Row>
        <Row
          className="p2p-order-info__item"
          alignItems="center"
          justifyContent={adaptive ? 'space-between' : 'flex-end'}
        >
          <div>Time created:</div>
          <div className="p2p-order-info__data">
            <OrderCreatedTime time={new Date()} />
            <OrderCreatedDate date={new Date()} />
          </div>
        </Row>
      </Col>
    </div>
  );
}

export default Info;
