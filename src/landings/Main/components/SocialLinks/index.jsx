import React from 'react';

// Components
import SocialLink from '../SocialLink';
import { Row } from 'ui';

// Utils
import socialNames from '../../constants/socialNames';

// Styles
import './index.less';

function SocialLinks() {
  return (
    <Row className="MainLanding-SocialLinks" wrap>
      <SocialLink name={socialNames.telegram} />
      <SocialLink name={socialNames.discord} />
      <SocialLink name={socialNames.twitter} />
      <SocialLink name={socialNames.facebook} />
      <SocialLink name={socialNames.instagram} />
    </Row>
  );
}

export default SocialLinks;
