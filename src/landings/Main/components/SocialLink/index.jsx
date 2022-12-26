import React from 'react';

// Components
import SVG from 'utils/svg-wrap';

// Utils
import company from 'src/index/constants/company';
import socialIcons from '../../constants/socialIcons';

// Styles
import './index.less';

function SocialLink({ name, type }) {
  const icon = socialIcons[name];

  return (
    <a
      className={`MainLanding-SocialLink ${type}`}
      href={`https://${company.social[name]}`}
      target="_blank"
    >
      {icon && <SVG src={icon} flex />}
    </a>
  );
}

export default SocialLink;
