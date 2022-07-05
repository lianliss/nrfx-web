import React from 'react';

// Components
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import { Row, Button } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Utils
import COMPANY from 'src/index/constants/company';

// Styles
import './SocialMedia.less';

function SocialMedia() {
  const SocialLink = ({ icon, title, to, className }) => (
    <a href={`//${to}`} target="_blank">
      <SVG src={require(`src/asset/icons/social/${icon}.svg`)} />
      <span className="link-title">{title}</span>
    </a>
  );

  return (
    <CabinetBlock className="SocialMedia">
      <CabinetBlock className="SocialMedia__container">
        <h1>Social Media</h1>
        <Row>
          <Button type="secondary-light">
            <SocialLink icon="telegram-solid" title="Telegram" />
          </Button>
          <Button type="secondary-light">
            <SocialLink icon="discord-solid" title="Discord" />
          </Button>
        </Row>
        <Row>
          <Button type="secondary-light">
            <SocialLink icon="instagram" title="Instagram" />
          </Button>
          <Button type="secondary-light">
            <SocialLink icon="M-solid" title="Medium" />
          </Button>
        </Row>
        <Row>
          <Button type="secondary-light">
            <SocialLink icon="twitter-solid" title="Twitter" />
          </Button>
          <Button type="secondary-light">
            <SocialLink icon="youtube-solid" title="YouTube" />
          </Button>
        </Row>
      </CabinetBlock>
    </CabinetBlock>
  );
}

export default SocialMedia;
