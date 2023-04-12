import React from 'react';

// Components
import { Avatar } from '../UI';

// Utils
import successRedIcon from 'src/asset/icons/status/success-red.svg';
import successGreenIcon from 'src/asset/icons/status/sucess-13px.svg';

// Styles
import styles from './UserProfile.module.less';

function UserProfile({ avatar, name, isVerified }) {
  return (
    <div className={styles.UserProfile}>
      <Avatar position="left" size="medium" />
      <div className={styles.content}>
        <p className={styles.name}>{name}</p>
        <div className={styles.stats}>
          <span>Joined 2022-06-07</span>
          <span>Deposit 0.00</span>
        </div>
        <div className={styles.footer}>
          <div className={styles.verified}>
            <span>KYC</span>
            <img src={isVerified ? successGreenIcon : successRedIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
