import React from 'react';

// Components
import SVG from 'utils/svg-wrap';
import OpenPopupLink from '../OpenPopupLink/OpenPopupLink';

// Styles
import './SocialLinks.less';

function SocialLinks() {
  const LinkIcon = ({ icon, to, className }) => (
    <a href={to} target="_blank">
      <SVG
        src={require(`src/asset/icons/social/${icon}.svg`)}
        className={className}
      />
    </a>
  );

  return (
    <div className="SocialLinks">
      <a href="https://narfex.gitbook.io/wiki/" target="_blank">
        <OpenPopupLink title="learn about narfex" />
      </a>
      <div className="SocialLinks-social">
        <span className="SocialLinks-social__title">our social</span>
        <div className="SocialLinks-social__items">
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
  );
}

export default SocialLinks;
