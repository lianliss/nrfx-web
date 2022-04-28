import React from 'react';

import { Button } from 'src/ui';
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import SVG from 'utils/svg-wrap';

import './CabinetWallets.less';
import DynamicShadow from '../../../../ui/components/DynamicShadow/DynamicShadow';

function CabinetWallets() {
  return (
    <CabinetBlock className="CabinetWallets">
      <div className="CabinetWallets__container">
        <h1>Your Wallet</h1>
        <p className="CabinetWallets__description">
          The Narfex token facilitates multiple tokenomics, serving as a utility
          token and governance token.
        </p>
        <div className="CabinetWallets__buttons">
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
        <div className="CabinetWallets__links">
          <a href="/" className="CabinetWallets__link">
            learn about wallet
            <SVG src={require('src/asset/icons/export.svg')} />
          </a>
          <div className="CabinetWallets-social">
            <span className="CabinetWallets-social__title">our social</span>
            <div className="CabinetWallets-social__items">
              <a href="https://telegram.com">
                <SVG
                  src={require('src/asset/icons/social/telegram-solid.svg')}
                  className="telegram"
                />
              </a>
              <a href="https://discord.com">
                <SVG
                  src={require('src/asset/icons/social/discord-solid.svg')}
                  className="discord"
                />
              </a>
              <a href="https://instagram.com">
                <SVG
                  src={require('src/asset/icons/social/instagram-solid.svg')}
                  className="instagram"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="CabinetWallets-bg">
        <img src={require('src/asset/backgrounds/cabinet-wallets-bg.png')} />
      </div>
    </CabinetBlock>
  );
}

export default CabinetWallets;
