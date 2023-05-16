import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'dapp';
import { Row } from 'ui';
import SVG from 'utils/svg-wrap';
import { classNames as cn } from 'utils';

import styles from './UserMessage.module.less';

const UserMessage = ({ text, isRead, isCurrentUserMessage }) => {
  const iconSrc = isRead
    ? require('src/asset/icons/status/check_circle_success.svg')
    : require('src/asset/icons/status/check_circle.svg');
  const icon = <SVG src={iconSrc} flex />;

  return (
    <div className={cn(styles.UserMessage, { right: isCurrentUserMessage })}>
      <Message
        type={
          isCurrentUserMessage ? 'transparent--orange' : 'transparent--gray'
        }
        borderRadius={7}
        border
        disableClosing
      >
        <Row alignItems="flex-end" gap={5}>
          {!isCurrentUserMessage && icon}
          <p>{text}</p>
          {isCurrentUserMessage && icon}
        </Row>
      </Message>
    </div>
  );
};

UserMessage.propTypes = {
  text: PropTypes.string,
  isRead: PropTypes.bool,
  isCurrentUserMessage: PropTypes.bool,
};

export default UserMessage;
