import React from 'react';

// Components
import SocialLink from '../SocialLink';
import { Row } from 'ui';

// Utils
import socialNames from '../../constants/socialNames';

// Styles
import './index.less';

function SocialLinks({ adaptive }) {
  return (
    <Row
      className="MainLanding-SocialLinks"
      wrap
      justifyContent={adaptive ? 'center' : 'flex-start'}
    >
      <SocialLink name={socialNames.telegram} />
      <SocialLink name={socialNames.discord} />
      <SocialLink name={socialNames.twitter} />
      <SocialLink name={socialNames.facebook} />
      <SocialLink name={socialNames.instagram} />
    </Row>
  );
}

export default SocialLinks;
