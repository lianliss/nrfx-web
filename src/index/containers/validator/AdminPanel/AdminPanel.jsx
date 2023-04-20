import React from 'react';
import { useSelector } from 'react-redux';

// Components
import { Account, TableLayout } from './containers';
import { SocialLinks } from 'dapp';

// Utils
import { adaptiveSelector } from 'src/selectors';

// Styles
import styles from './AdminPanel.module.less';

function AdminPanel() {
  const adaptive = useSelector(adaptiveSelector);

  return (
    <div className={styles.AdminPanel}>
      <Account adaptive={adaptive} />
      <TableLayout adaptive={adaptive} />
      <SocialLinks type="v2" />
    </div>
  );
}

export default AdminPanel;
