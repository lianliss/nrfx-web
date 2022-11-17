import React from 'react';

import { Button } from 'src/ui';
import OpenPopupLink from '../../../OpenPopupLink/OpenPopupLink';
import SVG from 'utils/svg-wrap';
import DynamicShadow from 'src/ui/components/DynamicShadow/DynamicShadow';

// Utils
import { getLang } from 'src/utils';
import { openStateModal } from 'src/actions';

import './WalletsIsEmpty.less';

function WalletsIsEmpty() {
  const LinkIcon = ({ icon, to, className }) => (
    <a href={to} target="_blank">
      <SVG
        src={require(`src/asset/icons/social/${icon}.svg`)}
        className={className}
      />
    </a>
  );

  const handleConnectWallet = () => {
    openStateModal('connect_to_wallet');
  };

  return (
    <div className="WalletsIsEmpty">
      <div className="WalletsIsEmpty__container">
        <div className="WalletsIsEmpty__content">
          <div>
            <h1>{getLang('dapp_wallet_page_title')}</h1>
            <p className="WalletsIsEmpty__description">
              {getLang('dapp_wallet_page_subtitle')}
            </p>
          </div>
          <div className="WalletsIsEmpty__buttons">
            <DynamicShadow>
              <Button
                type="lightBlue"
                size="extra_large"
                onClick={handleConnectWallet}
              >
                <div className="Button__icon">
                  <SVG
                    src={require('src/asset/icons/cabinet/connect-wallet.svg')}
                  />
                </div>
                <div className="Button__content">
                  <span>
                    {getLang('dapp_wallet_page_connect_button_title')}
                  </span>
                  <span>
                    {getLang('dapp_wallet_page_connect_button_subtitle')}
                  </span>
                </div>
              </Button>
            </DynamicShadow>
          </div>
          <div className="WalletsIsEmpty__links">
            <a href="http://docs.narfex.com" target="_blank">
              <OpenPopupLink
                title={getLang('dapp_global_learn_about_narfex')}
              />
            </a>
            <div className="WalletsIsEmpty-social">
              <span className="WalletsIsEmpty-social__title">
                {getLang('dapp_global_our_social')}
              </span>
              <div className="WalletsIsEmpty-social__items">
                <LinkIcon to="https://t.me/narfexfeed" icon="telegram-solid" />
                <LinkIcon
                  to="https://discord.gg/56Xrq2rXYv"
                  icon="discord-solid"
                />
                <LinkIcon
                  to="https://instagram.com/narfex.global"
                  icon="instagram-solid"
                />
                <LinkIcon to="https://medium.com/@narfex" icon="M-solid" />
                <LinkIcon
                  to="https://www.youtube.com/channel/UCDwJ0XUJDJpQAhB9DxYYUlw"
                  icon="youtube-solid"
                />
                <LinkIcon
                  to="https://twitter.com/narfexglobal?s=21"
                  icon="twitter-solid"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="WalletsIsEmpty-bg">
          <img src={require('src/asset/backgrounds/cabinet-wallets-bg.png')} />
        </div>
      </div>
    </div>
  );
}

export default WalletsIsEmpty;
