import React from 'react';

// Components
import P2P from '../P2P';
import Information from './components/Information';
import Advantages from './components/Advantages';

// Styles
import './index.less';

function Orders(props) {
  return (
    <P2P>
      <div className="p2p-orders">
        <Information />
        <Advantages />
      </div>
    </P2P>
  );
}

export default Orders;
