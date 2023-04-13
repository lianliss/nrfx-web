import React from 'react';

// Components
import { Account } from './containers';

// Utils

// Styles
import styles from './AdminPanel.module.less';

function AdminPanel() {
  return (
    <div className={styles.AdminPanel}>
      <Account />
    </div>
  );
}

export default AdminPanel;
