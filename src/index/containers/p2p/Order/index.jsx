import React from 'react';

// Components
import P2P from '../P2P';
import Header from './components/Header';
import { FAQ, CabinetBlock } from 'dapp';
import Chat from './components/Chat';

// Utils
import faq from '../constants/faq';

// Styles
import './index.less';

function Order({ adaptive }) {
  return (
    <P2P>
      <div className="p2p-order">
        <Header adaptive={adaptive} />
        <div className="p2p-order-body">
          <div className="p2p-order-body__left">
            <CabinetBlock className="p2p-order-body__faq">
              <h3>FAQ</h3>
              <FAQ items={faq.order} doubleColumn={false} />
            </CabinetBlock>
          </div>
          {!adaptive && (
            <div className="p2p-order-body__right">
              <Chat />
            </div>
          )}
        </div>
      </div>
    </P2P>
  );
}

export default Order;
