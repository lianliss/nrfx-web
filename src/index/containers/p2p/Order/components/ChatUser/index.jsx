import React from 'react';

// Components
import { Row, Col } from 'ui';
import SVG from 'utils/svg-wrap';

// Utils
import avatar from 'src/asset/illustrations/people/p2p_working_instruction_avatar.svg';
import success from 'src/asset/icons/status/check_circle_success.svg';

// Styles
import './index.less';

function ChatUser({order}) {
  const Progress = ({ title, number }) => (
    <Col className="p2p-order-chat-user-progress__item" gap={5}>
      <span>{title}</span>
      <span>
        <strong>{number}</strong>
      </span>
    </Col>
  );

  return (
    <div className="p2p-order-chat-user">
      <Row className="p2p-order-chat-user__header" alignItems="center">
        <img src={avatar} alt="avatar" width="53" height="53" />
        <div>
          <p className="p2p-order-chat-user__name">{order.ownerName}</p>
          <Row alignItems="center">
            <span>KYC</span>
            <SVG
              src={success}
              style={{ width: 11, height: 11, margin: '0 15px 0 4px' }}
              flex
            />
            <a href="">Report</a>
          </Row>
        </div>
      </Row>
      <div className="p2p-order-chat-user__body">
        <Row className="p2p-order-chat-user-progress" gap="10px 9%" wrap>
          <Progress title="First Trade" number={34} />
          <Progress title="First Trade" number={667} />
          <Progress title="First Trade" number={45567} />
          <Progress title="First Trade" number={3} />
        </Row>
      </div>
    </div>
  );
}

export default ChatUser;
