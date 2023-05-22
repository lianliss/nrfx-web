import React from 'react';

// Components
import SVG from 'utils/svg-wrap';
import OpenPopupLink from '../OpenPopupLink/OpenPopupLink';

// Utils
import COMPANY from '../../../constants/company';
import { getLang, classNames as cn } from 'src/utils';

// Styles
import './SocialLinks.less';

function SocialLinks({ type }) {
  const { social } = COMPANY;

  const LinkIcon = ({ icon, to, className }) => (
    <a href={`//${to}`} target="_blank">
      <SVG
        src={require(`src/asset/icons/social/${icon}.svg`)}
        className={className}
      />
    </a>
  );

  return (
    <div className={cn('SocialLinks', type)}>
      <a href="http://docs.narfex.com" target="_blank">
        <OpenPopupLink title={getLang('dapp_global_learn_about_narfex')} />
      </a>
      <div className="SocialLinks-social">
        <span className="SocialLinks-social__title">
          {getLang('dapp_global_our_social')}
        </span>
        <div className="SocialLinks-social__items">
          <LinkIcon to="t.me/narfexfeed" icon="telegram-solid" />
          <LinkIcon to={social.discord} icon="discord-solid" />
          <LinkIcon to={social.instagram} icon="instagram-solid" />
          <LinkIcon to={social.medium} icon="M-solid" />
          <LinkIcon to={social.youtube} icon="youtube-solid" />
          <LinkIcon to={social.twitter} icon="twitter-solid" />
        </div>
      </div>
    </div>
  );
}

export default SocialLinks;
