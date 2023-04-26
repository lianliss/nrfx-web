import React from 'react';

// Components
import { Avatar, BetweenSeparator } from '../UI';
import { CustomButton } from 'dapp';

// Utils
import successRedIcon from 'src/asset/icons/status/success-red.svg';
import successGreenIcon from 'src/asset/icons/status/sucess-13px.svg';

// Styles
import styles from './UserProfile.module.less';

const BlockButton = ({ onClick }) => (
  <div className={styles.blockButton__wrapper}>
    <CustomButton onClick={onClick}>
      <span className="light-blue-gradient-color">Block</span>
    </CustomButton>
  </div>
);

function UserProfile({ avatar, name, isVerified, isForeignProfile, adaptive }) {
  return (
    <div className={styles.UserProfile}>
      <Avatar position="left" size="medium" />
      <div className={styles.content}>
        <p className={styles.name}>{name}</p>
        <div className={styles.stats}>
          <BetweenSeparator>
            <span>Joined 2022-06-07</span>
            <span>Deposit 0.00</span>
          </BetweenSeparator>
        </div>
        <div className={styles.footer}>
          <div className={styles.verified}>
            <span>KYC</span>
            <img src={isVerified ? successGreenIcon : successRedIcon} />
          </div>
        </div>
        {isForeignProfile && adaptive && <BlockButton />}
      </div>
      {isForeignProfile && !adaptive && <BlockButton />}
    </div>
  );
}

export default UserProfile;
