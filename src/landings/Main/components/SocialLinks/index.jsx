import React from 'react';

// Components
import SocialLink from '../SocialLink';
import { Row } from 'ui';

// Utils
import socialNames from '../../constants/socialNames';
import socialLinksType from '../../constants/socialLinksType';

// Styles
import './index.less';

function SocialLinks({
  adaptive,
  wrap = true,
  type = socialLinksType.buttons,
}) {
  return (
    <Row
      className={`MainLanding-SocialLinks ${type}`}
      wrap={wrap}
      justifyContent={adaptive ? 'center' : 'flex-start'}
    >
      <SocialLink name={socialNames.telegram} type={type} />
      <SocialLink name={socialNames.discord} type={type} />
      <SocialLink name={socialNames.twitter} type={type} />
      <SocialLink name={socialNames.medium} type={type} />
      <SocialLink name={socialNames.instagram} type={type} />
    </Row>
  );
}

export default SocialLinks;
