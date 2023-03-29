import React from 'react';
import { Col, Row, NumberFormat } from 'ui';

const Info = ({ title, prefix, currency, number, adaptive }) => {
  const ItemComponent = adaptive ? Row : Col;

  return (
    <ItemComponent
      justifyContent={adaptive ? 'space-between' : 'flex-start'}
      alignItems={adaptive ? 'center' : 'flex-start'}
      className="p2p-order-process-info__item"
    >
      <p>{title}</p>
      <NumberFormat
        prefix={prefix ? prefix + ' ' : ''}
        number={number}
        currency={currency}
      />
    </ItemComponent>
  );
};

export default Info;
