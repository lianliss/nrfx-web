import React from 'react';

// Components
import NarfexRate from 'dapp/CabinetSidebar/components/NarfexRate/NarfexRate';
import { Chats } from './components';

// Utils
import { classNames as cn } from 'utils';

// Styles
import styles from './Sidebar.module.less';

const Sidebar = ({ adaptive, className }) => {
  return (
    <div className={cn(styles.Sidebar, className)}>
      <Chats adaptive={adaptive}>{adaptive && <NarfexRate />}</Chats>
      {!adaptive && <NarfexRate />}
    </div>
  );
};

export default Sidebar;
