import React from 'react';
import { Web3Context } from 'services/web3Provider';
import { openModal } from 'actions';

// Components
import { Button, Col } from 'ui';

// Styles
import styles from './Verify.module.less';

function Verify({ userRole, verified, adaptive }) {
  const context = React.useContext(Web3Context);
  const {
    isConnected,
    chainId,
    accountAddress,
    backendRequest,
  } = context;
  const buttonsSize = adaptive ? 'big' : 'extra_large';
  
  const openVerification = () => {
    openModal('kyc_verification', {}, {});
  };

  return (
    <div className={styles.Verify}>
      {userRole !== 'validator' && (
        <Button type="secondary-light--light-blue" size={buttonsSize}>
          <span>Become Validator</span>
        </Button>
      )}
      {!verified && (
        <Col alignItems="center">
          <Button size={buttonsSize} onClick={openVerification} type="lightBlue">
            Pass KYC
          </Button>
          <p>powered by sumsub.com</p>
        </Col>
      )}
    </div>
  );
}

export default Verify;
