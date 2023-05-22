import React from 'react';
import { Col, Row, NumberFormat } from 'ui';
import { classNames as cn } from 'utils';

const Info = ({ title, prefix, currency, number, adaptive, className }) => {
  const ItemComponent = adaptive ? Row : Col;

  return (
    <ItemComponent
      justifyContent={adaptive ? 'space-between' : 'flex-start'}
      alignItems={adaptive ? 'center' : 'flex-start'}
      className={cn('p2p-order-process-info__item', className)}
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
