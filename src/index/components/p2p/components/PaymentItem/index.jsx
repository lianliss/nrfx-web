import React from 'react';
import paymentColors from 'src/index/containers/p2p/constants/paymentColors';

// Styles
import './index.less';

function PaymentItem({ title, color = paymentColors.orange, adaptive }) {
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
