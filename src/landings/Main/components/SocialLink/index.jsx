import React from 'react';
import PropTypes from 'prop-types';

// Components
import SVG from 'utils/svg-wrap';

// Utils
import company from 'src/index/constants/company';
import socialIcons from '../../constants/socialIcons';
import socialLinkTypes from '../../constants/socialLinkTypes';

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

SocialLink.propTypes = {
  name: PropTypes.oneOf(Object.keys(socialIcons)),
  type: PropTypes.oneOf(Object.values(socialLinkTypes)),
};

SocialLink.defaultProps = {
  name: null,
  type: 'buttons',
};

export default SocialLink;
