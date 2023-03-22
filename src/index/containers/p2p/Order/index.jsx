import React from 'react';

// Components
import P2P from '../P2P';
import Header from './components/Header';

// Styles
import './index.less';

function Order({ adaptive }) {
  return (
    <P2P>
      <div className="p2p-order">
        <Header adaptive={adaptive} />
        <div className="p2p-order-body">
          <div className="p2p-order-body__left">
            <div className="p2p-order-body__faq"></div>
          </div>
          <div className="p2p-order-body__right"></div>
        </div>
      </div>
    </P2P>
  );
}

export default Order;
