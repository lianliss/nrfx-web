import React from 'react';

import { Button } from 'src/ui';
import OpenPopupLink from '../../../OpenPopupLink/OpenPopupLink';
import SVG from 'utils/svg-wrap';
import DynamicShadow from 'src/ui/components/DynamicShadow/DynamicShadow';

// Utils
import { Web3Context } from 'src/services/web3Provider';
import { getLang } from 'src/utils';

import './WalletsIsEmpty.less';

function WalletsIsEmpty({ showWalletPage }) {
  const { isConnected, ...context } = React.useContext(Web3Context);
  const [isLogined, setIsLogined] = React.useState(false);

  const LinkIcon = ({ icon, to, className }) => (
    <a href={to} target="_blank">
      <SVG
        src={require(`src/asset/icons/social/${icon}.svg`)}
        className={className}
      />
    </a>
  );

  const handleConnectWallet = async () => {
    await context.connectWallet();
    setIsLogined(true);
  };

  React.useEffect(() => {
    if (isConnected && isLogined) {
      showWalletPage();
    }
  }, [isConnected, isLogined]);

  return (
    <div className="WalletsIsEmpty">
      <div className="WalletsIsEmpty__container">
        <div className="WalletsIsEmpty__content">
          <div>
            <h1>Your Wallet</h1>
            <p className="WalletsIsEmpty__description">
              The Narfex token facilitates multiple tokenomics, serving as a
              utility token and governance token.
            </p>
          </div>
          <div className="WalletsIsEmpty__buttons">
            <Button
              type="gray"
              size="extra_large"
              onClick={handleConnectWallet}
            >
              <div className="Button__icon">
                <SVG
                  src={require('src/asset/icons/cabinet/empty-wallet-add.svg')}
                />
              </div>
              <div className="Button__content">
                <span>{getLang('dapp_global_connect_wallet')}</span>
                <span>example wallet on MetaMask</span>
              </div>
            </Button>
            <DynamicShadow>
              <Button type="lightBlue" size="extra_large">
                <div className="Button__icon">
                  <SVG src={require('src/asset/token/wallet.svg')} />
                </div>
                <div className="Button__content">
                  <span>Create wallet</span>
                  <span>create wallet on our platform</span>
                </div>
              </Button>
            </DynamicShadow>
          </div>
          <div className="WalletsIsEmpty__links">
            <a href="http://docs.narfex.com" target="_blank">
              <OpenPopupLink title="learn about narfex" />
            </a>
            <div className="WalletsIsEmpty-social">
              <span className="WalletsIsEmpty-social__title">our social</span>
              <div className="WalletsIsEmpty-social__items">
                <LinkIcon to="https://t.me/narfexfeed" icon="telegram-solid" />
                <LinkIcon
                  to="https://discord.gg/T4hFnUaPFS"
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
