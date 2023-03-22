import React from 'react';

// Components
import { Timer } from 'ui';

// Styles
import './index.less';

function Order() {
  return (
    <div className="p2p-order">
      <div className="p2p-order__header">
        <Timer
          type="blue-light"
          time={new Date(new Date().getTime() + 1 * 60 * 60 * 1000)}
          hideHours
        />
      </div>
      <div className="p2p-order-body">
        <div className="p2p-order-body__left">
          <div className="p2p-order-body__faq"></div>
        </div>
        <div className="p2p-order-body__right"></div>
      </div>
    </div>
  );
}

export default Order;
