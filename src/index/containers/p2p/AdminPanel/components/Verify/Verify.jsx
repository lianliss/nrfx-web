import React from 'react';

// Components
import { Button, Col } from 'ui';

// Styles
import styles from './Verify.module.less';

function Verify({ userRole, verified }) {
  return (
    <div className={styles.Verify}>
      {userRole !== 'validator' && (
        <Button type="secondary-light--light-blue" size="extra_large">
          <span>Become Validator</span>
        </Button>
      )}
      {!verified && (
        <Col alignItems="center">
          <Button size="extra_large" type="lightBlue">
            Pass KYC
          </Button>
          <p>powered by sumsub.com</p>
        </Col>
      )}
    </div>
  );
}

export default Verify;
