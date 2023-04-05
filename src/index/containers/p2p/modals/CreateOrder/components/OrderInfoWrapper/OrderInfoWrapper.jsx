import React from 'react';

const OrderInfoWrapper = ({ title, children }) => (
  <div className="p2p-modal-create-order-info-item normal-fw moderate-fz">
    <span className="cool-gray-color">{title}</span>
    <div>{children}</div>
  </div>
);

export default OrderInfoWrapper;
