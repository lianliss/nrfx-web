import React from 'react';

import { Button } from 'src/ui';
import CabinetBlock from '../../../CabinetBlock/CabinetBlock';
import OpenPopupLink from '../../../OpenPopupLink/OpenPopupLink';
import SVG from 'utils/svg-wrap';

import DynamicShadow from 'src/ui/components/DynamicShadow/DynamicShadow';
import './WalletsIsEmpty.less';

function WalletsIsEmpty(props) {
  const LinkIcon = ({ icon, to, className }) => (
    <a href={to} target="_blank">
      <SVG
        src={require(`src/asset/icons/social/${icon}.svg`)}
        className={className}
      />
    </a>
  );

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
            <Button type="gray" size="extra_large">
              <div className="Button__icon">
                <SVG
                  src={require('src/asset/icons/cabinet/empty-wallet-add.svg')}
                />
              </div>
              <div className="Button__content">
                <span>Connect wallet</span>
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
            <OpenPopupLink title="learn about wallet" />
            <div className="WalletsIsEmpty-social">
              <span className="WalletsIsEmpty-social__title">our social</span>
              <div className="WalletsIsEmpty-social__items">
                <LinkIcon to="https://web.telegram.org" icon="telegram-solid" />
                <LinkIcon to="https://discord.com" icon="discord-solid" />
                <LinkIcon to="https://instagram.com" icon="instagram-solid" />
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
