import React from 'react';

// Components
import P2P from '../P2P';
import Information from './components/Information';

// Styles
import './index.less';

function Orders(props) {
  return (
    <P2P>
      <div className="p2p-orders">
        <Information />
      </div>
    </P2P>
  );
}

export default Orders;
