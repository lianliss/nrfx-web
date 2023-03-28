import React from 'react';
import { Col, NumberFormat } from 'ui';

const Info = ({ title, prefix, currency, number }) => (
  <Col className="p2p-order-process-info__item">
    <p>{title}</p>
    <NumberFormat
      prefix={prefix ? prefix + ' ' : ''}
      number={number}
      currency={currency}
    />
  </Col>
);

export default Info;
