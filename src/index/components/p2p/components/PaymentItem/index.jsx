import React from 'react';

// Styles
import './index.less';

function PaymentItem({ title, color, adaptive }) {
  return (
    <div
      className="orders-list-payment-item"
      style={{ background: adaptive && color }}
    >
      {!adaptive && (
        <div
          className="orders-list-payment-item__color"
          style={{ background: color }}
        />
      )}
      <span>{title}</span>
    </div>
  );
}

export default PaymentItem;
