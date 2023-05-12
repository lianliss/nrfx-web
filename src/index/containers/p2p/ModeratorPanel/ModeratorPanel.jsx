import React from 'react';

import { Order } from '..';

import styles from './ModeratorPanel.module.less';

const ModeratorPanel = () => {
  return (
    <div className={styles.ModeratorPanel}>
      <Order visitorMode="moderator" />
    </div>
  );
};

export default ModeratorPanel;
