import React from 'react';

// Components
import { Button } from 'ui';

// Styles
import styles from './Verify.module.less';

function Verify() {
  return (
    <div className={styles.Verify}>
      <Button size="extra_large" type="lightBlue">
        Pass KYC
      </Button>
      <p>powered by sumsub.com</p>
    </div>
  );
}

export default Verify;
