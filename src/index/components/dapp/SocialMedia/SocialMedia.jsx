import React from 'react';

// Components
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import { Row, Button } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Utils
import COMPANY from 'src/index/constants/company';
import useAdaptive from 'src/hooks/adaptive';
import { TABLET } from 'src/index/constants/breakpoints';
import { classNames as cn } from 'src/utils';

// Styles
import './SocialMedia.less';

function SocialMedia() {
  const adaptive = useAdaptive(TABLET);

  const SocialLink = ({ icon, title, to }) => (
    <a href={`//${to}`} target="_blank">
      <SVG src={require(`src/asset/icons/social/${icon}.svg`)} />
      <span className="link-title">{title}</span>
    </a>
  );

  return (
    <CabinetBlock className={cn('SocialMedia', { adaptive })}>
      <CabinetBlock className="SocialMedia__container">
        <h1>Social Media</h1>
        <Row wrap>
          <Button type="secondary-light">
            <SocialLink
              icon="telegram-solid"
              title="Telegram"
              to={COMPANY.social.telegram}
            />
          </Button>
          <Button type="secondary-light">
            <SocialLink
              icon="discord-solid"
              title="Discord"
              to={COMPANY.social.discord}
            />
          </Button>
        </Row>
        <Row wrap>
          <Button type="secondary-light">
            <SocialLink
              icon="instagram"
              title="Instagram"
              to={COMPANY.social.instagram}
            />
          </Button>
          <Button type="secondary-light">
            <SocialLink
              icon="M-solid"
              title="Medium"
              to={COMPANY.social.medium}
            />
          </Button>
        </Row>
        <Row wrap>
          <Button type="secondary-light">
            <SocialLink
              icon="twitter-solid"
              title="Twitter"
              to={COMPANY.social.twitter}
            />
          </Button>
          <Button type="secondary-light">
            <SocialLink
              icon="youtube-solid"
              title="YouTube"
              to={COMPANY.social.youtube}
            />
          </Button>
        </Row>
      </CabinetBlock>
    </CabinetBlock>
  );
}

export default SocialMedia;