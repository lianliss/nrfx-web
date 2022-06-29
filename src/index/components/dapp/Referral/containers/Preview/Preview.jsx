import React from 'react';
import { useRoute } from 'react-router5';

// Components
import { Button } from 'src/ui';
import OpenPopupLink from '../../../OpenPopupLink/OpenPopupLink';
import SVG from 'utils/svg-wrap';

// Utils
import {
  DAPP_REFERRAL_EXCHANGER,
  DAPP_REFERRAL_FARMING,
} from 'src/index/constants/pages';

// Styles
import './Preview.less';

function Preview() {
  const { router } = useRoute();

  const LinkIcon = ({ icon, to, className }) => (
    <a href={to} target="_blank">
      <SVG
        src={require(`src/asset/icons/social/${icon}.svg`)}
        className={className}
      />
    </a>
  );

  return (
    <div className="Referral__Preview">
      <div className="Referral__Preview__container">
        <div className="Referral__Preview__content">
          <h1>Referral program</h1>
          <p className="subtitle">
            Earn up to 30% from friends’ commission on Fiat deposits and 5% from
            their NRFX token purchases through an Narfex Exchanger
          </p>
          <Button
            type="lightBlue"
            onClick={() => router.navigate(DAPP_REFERRAL_FARMING)}
          >
            <SVG src={require('src/asset/icons/cabinet/coin.svg')} />
            Referral Farming
          </Button>
          <Button
            type="lightBlue"
            onClick={() => router.navigate(DAPP_REFERRAL_EXCHANGER)}
          >
            <SVG src={require('src/asset/icons/convert-card.svg')} />
            Referral Exchenger
          </Button>
        </div>
        <div className="Referral__Preview-bg">
          <img src={require('src/asset/backgrounds/referral-preview-bg.png')} />
        </div>
      </div>
      <div className="Referral__Preview__links">
        <a href="https://narfex.gitbook.io/wiki/" target="_blank">
          <OpenPopupLink title="learn about narfex" />
        </a>
        <div className="Referral__Preview-social">
          <span className="Referral__Preview-social__title">our social</span>
          <div className="Referral__Preview-social__items">
            <LinkIcon to="https://t.me/narfexfeed" icon="telegram-solid" />
            <LinkIcon to="https://discord.gg/T4hFnUaPFS" icon="discord-solid" />
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
  );
}

export default Preview;
