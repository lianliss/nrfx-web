import React from 'react';
import { Avatar } from 'src/index/components/p2p/components/UI';
import { Row } from 'ui';
import SVG from 'utils/svg-wrap';

import moment from 'moment';
import { classNames as cn } from 'utils';

import styles from './Chat.module.less';

const Chat = ({
  name,
  text,
  isCurrentUserMessage,
  isRead,
  timestamp,
  active,
}) => {
  return (
    <div className={cn(styles.Chat, { active })}>
      <Avatar size="small" />
      <div className={styles.Chat__content}>
        <Row alignItems="flex-end">
          <span className={styles.name}>{name}</span>
          <span className={styles.date}>
            {moment(timestamp).format('HH:mm')}
          </span>
        </Row>
        <Row alignItems="center">
          <p className={styles.text}>{text}</p>
          <div className={styles.isRead}>
            <SVG
              src={require('src/asset/icons/status/message-isRead.svg')}
              flex
            />
          </div>
        </Row>
      </div>
    </div>
  );
};

export default Chat;
