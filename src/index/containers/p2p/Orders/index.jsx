import React from 'react';

// Components
import P2P from '../P2P';
import List from './components/List';
import Information from './components/Information';
import Advantages from './components/Advantages';
import FAQ from './components/FAQ';
import Blog from './components/Blog';

// Styles
import './index.less';

function Orders({ adaptive }) {
  return (
    <P2P>
      <div className="p2p-orders">
        <List />
        <Information adaptive={adaptive} />
        <Advantages adaptive={adaptive} />
        <FAQ adaptive={adaptive} />
        <Blog adaptive={adaptive} />
      </div>
    </P2P>
  );
}

export default Orders;
