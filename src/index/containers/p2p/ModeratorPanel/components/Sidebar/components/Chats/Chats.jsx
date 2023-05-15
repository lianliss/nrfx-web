import React from 'react';

import CabinetScrollBlock from 'dapp/CabinetScrollBlock/CabinetScrollBlock';
import { Chat } from '..';
import testChats from '../../constants/testChats';

import styles from './Chats.module.less';

const Chats = ({ adaptive, children }) => {
  return (
    <div className={styles.Chats}>
      <CabinetScrollBlock maxHeight={adaptive ? 'auto' : 600}>
        <div>
          {testChats.map(({ name, lastMessage }, key) => (
            <Chat
              name={name}
              key={name + key}
              {...lastMessage}
              active={key === 0}
            />
          ))}
        </div>
      </CabinetScrollBlock>
      {children}
    </div>
  );
};

export default Chats;
