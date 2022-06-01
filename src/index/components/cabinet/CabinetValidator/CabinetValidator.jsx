import React from 'react';

// Components
import OpenPopupLink from '../OpenPopupLink/OpenPopupLink';
import SVG from 'utils/svg-wrap';
import CabinetBlock from '../CabinetBlock/CabinetBlock';

// Styles
import './CabinetValidator.less';

function CabinetValidator() {
  const LinkIcon = ({ icon, to, className }) => (
    <a href={to} target="_blank">
      <SVG
        src={require(`src/asset/icons/social/${icon}.svg`)}
        className={className}
      />
    </a>
  );

  return (
    <CabinetBlock className="CabinetValidator__wrap">
      <div className="CabinetValidator">
        <div className="CabinetValidator__container">
          <div className="CabinetValidator__content">
            <div>
              <h1>Become a Validator</h1>
              <p className="CabinetValidator__description">
                Coming soon. <a href="mailto:admin@narfex.com">Contact us</a>
              </p>
            </div>
            <div className="CabinetValidator__links">
              <a href="https://narfex.gitbook.io/wiki/" target="_blank">
                <OpenPopupLink title="learn about narfex" />
              </a>
              <div className="CabinetValidator-social">
                <span className="CabinetValidator-social__title">
                  our social
                </span>
                <div className="CabinetValidator-social__items">
                  <LinkIcon
                    to="https://t.me/narfexfeed"
                    icon="telegram-solid"
                  />
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
          <div className="CabinetValidator-bg">
            <img
              src={require('src/asset/backgrounds/cabinet-wallets-bg.png')}
            />
          </div>
        </div>
      </div>
    </CabinetBlock>
  );
}

export default CabinetValidator;
