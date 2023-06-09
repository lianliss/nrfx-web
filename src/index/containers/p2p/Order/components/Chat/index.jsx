import React from 'react';

// Components
import { OrderCreatedTime, OrderCreatedDate } from 'src/index/components/p2p';
import { Row, Form } from 'ui';
import { CabinetBlock, Message, DappInput, CustomButton } from 'dapp';
import ChatUser from '../ChatUser';
import SVG from 'utils/svg-wrap';
import UserMessage from '../UserMessage/UserMessage';

// Utils
import sendIcon from 'src/asset/icons/action/send-message.svg';

// Styles
import './index.less';

function Chat({order}) {
  const [nextMessage, setNextMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();

    setIsLoading(true);

    setTimeout(() => setIsLoading(false), 2000);
  };

  const sendMessageButton = (
    <CustomButton
      className="p2p-order-chat__send"
      disabled={isLoading}
      onClick={handleSendMessage}
    >
      <SVG src={sendIcon} />
    </CustomButton>
  );

  return (
    <CabinetBlock className="p2p-order-chat">
      <ChatUser order={order} />
      <div className="p2p-order-chat-content">
        <Row alignItems="center" justifyContent="center" gap={15} wrap>
          <OrderCreatedTime time={new Date(order.date)} />
          <OrderCreatedDate date={new Date(order.date)} />
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
        <div className="p2p-order-chat__messages">
          <Message borderRadius={7} disableClosing>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
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
              Fee Gunakan Metode Pembayaran Bank Transfer Untuk Bank Lainnya /
              Use Bank Transfer Method For Other Payment Method
            </p>
          </Message>
          <UserMessage
            text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
            isCurrentUserMessage
            isRead
          />
          <UserMessage text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout." />
        </div>
        <Form onSubmit={handleSendMessage}>
          <DappInput
            value={nextMessage}
            onChange={setNextMessage}
            indicator={sendMessageButton}
            placeholder="write a message..."
          />
        </Form>
      </div>
    </CabinetBlock>
  );
}

export default Chat;
