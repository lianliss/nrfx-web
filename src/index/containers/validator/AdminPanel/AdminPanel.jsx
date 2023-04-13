import React from 'react';
import { useSelector } from 'react-redux';

// Components
import { Account, PaymentMethods } from './containers';

// Utils
import { adaptiveSelector } from 'src/selectors';

// Styles
import styles from './AdminPanel.module.less';

function AdminPanel() {
  const adaptive = useSelector(adaptiveSelector);

  return (
    <div className={styles.AdminPanel}>
      <Account />
      <PaymentMethods adaptive={adaptive} />
    </div>
  );
}

export default AdminPanel;
