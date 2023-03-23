import React from 'react';

// Components
import { OrderCreatedTime, OrderCreatedDate } from 'src/index/components/p2p';
import { Row, Col } from 'ui';
import { CabinetBlock } from 'dapp';
import SVG from 'utils/svg-wrap';
import ChatUser from '../ChatUser';

// Styles
import './index.less';

function Chat() {
  return (
    <CabinetBlock className="p2p-order-chat">
      <ChatUser />
      <div className="p2p-order-chat-content">
        <Row>
          <div className="p2p-order__created">
            <OrderCreatedTime time={new Date()} />
            <OrderCreatedDate date={new Date()} />
          </div>
        </Row>
      </div>
    </CabinetBlock>
  );
}

export default Chat;
