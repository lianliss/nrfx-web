import React from 'react';

// Components
import { OrderCreatedTime, OrderCreatedDate } from 'src/index/components/p2p';
import { Row } from 'ui';
import { CabinetBlock, Message } from 'dapp';
import ChatUser from '../ChatUser';

// Styles
import './index.less';

function Chat() {
  return (
    <CabinetBlock className="p2p-order-chat">
      <ChatUser />
      <div className="p2p-order-chat-content">
        <Row alignItems="center" justifyContent="center" gap={15} wrap>
          <OrderCreatedTime time={new Date()} />
          <OrderCreatedDate date={new Date()} />
        </Row>
        <Message
          type="gray"
          border
          background={false}
          disableClosing
          borderRadius={7}
        >
          <p className="please-pay">
            Successfully placed an order, please pay within the time limit.
          </p>
        </Message>
        <Message borderRadius={7} disableClosing>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.
          </p>
        </Message>
        <Message type="gray" borderRadius={7} disableClosing>
          <p>
            Gratis Transfer Ke Semua Bank / All Bank Free Transfer
            <br />
            <br />
            Fee Gratis Transfer Ke Semua Ewallet / All Ewallet Free Transfer
            <br />
            <br />
            Fee Gunakan Metode Pembayaran Bank Transfer Untuk Bank Lainnya / Use
            Bank Transfer Method For Other Payment Method
          </p>
        </Message>
      </div>
    </CabinetBlock>
  );
}

export default Chat;
