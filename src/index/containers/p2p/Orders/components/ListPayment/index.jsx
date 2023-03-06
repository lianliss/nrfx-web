import React from 'react';

function ListPayment({ title, color, adaptive }) {
  return (
    <div
      className="orders-list-payment__item"
      style={{ background: adaptive && color }}
    >
      <div
        className="orders-list-payment__color"
        style={{ background: color }}
      ></div>
      <span>{title}</span>
    </div>
  );
}

export default ListPayment;
