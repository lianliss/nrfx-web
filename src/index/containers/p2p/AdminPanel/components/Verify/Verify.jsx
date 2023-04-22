import React from 'react';

// Components
import { Button, Col } from 'ui';

// Styles
import styles from './Verify.module.less';

function Verify({ userRole, verified, adaptive }) {
  const buttonsSize = adaptive ? 'big' : 'extra_large';

  return (
    <div className={styles.Verify}>
      {userRole !== 'validator' && (
        <Button type="secondary-light--light-blue" size={buttonsSize}>
          <span>Become Validator</span>
        </Button>
      )}
      {!verified && (
        <Col alignItems="center">
          <Button size={buttonsSize} type="lightBlue">
            Pass KYC
          </Button>
          <p>powered by sumsub.com</p>
        </Col>
      )}
    </div>
  );
}

export default Verify;
