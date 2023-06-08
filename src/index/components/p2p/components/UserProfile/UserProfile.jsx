import React from 'react';

// Components
import { Avatar, BetweenSeparator } from '../UI';
import { CustomButton } from 'dapp';
import TelegramLoginButton from 'react-telegram-login';
import web3Backend from 'src/services/web3-backend';
import { Web3Context } from 'services/web3Provider';

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

function UserProfile({ avatar, name, isVerified, isValidator, isForeignProfile, adaptive }) {
  const context = React.useContext(Web3Context);
  const {
    backendRequest,
  } = context;
  const onTelegramAuth = async user => {
    try {
      const response = await backendRequest({
        telegramID: user.id,
      }, ``, 'user/p2p/telegram', 'post');
      console.log('[onTelegramAuth]', user, response);
    } catch (error) {
      console.error('[onTelegramAuth]', error);
    }
  };
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
        {isValidator && <TelegramLoginButton dataOnauth={onTelegramAuth}
                                             cornerRadius={12}
                                             buttonSize="medium"
                                             botName="GreedIsGoodAIBot" />}
        {isForeignProfile && adaptive && <BlockButton />}
      </div>
      {isForeignProfile && !adaptive && <BlockButton />}
    </div>
  );
}

export default UserProfile;
