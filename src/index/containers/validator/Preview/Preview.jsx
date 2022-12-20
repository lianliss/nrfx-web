import React from 'react';

// Components
import { Button, Col } from 'ui';
import SVG from 'utils/svg-wrap';
import CabinetBlock from '../../../components/dapp/CabinetBlock/CabinetBlock';
import SocialLinks from '../../../components/dapp/SocialLinks/SocialLinks';
import BackgroundBit from '../../../components/validator/BackgroundBit/BackgroundBit';

// Icons
import blueCross from 'src/asset/backgrounds/bg-bit/blue-cross.svg';
import blueWaveLine from 'src/asset/backgrounds/bg-bit/blue-wave-line.svg';
import blueCircle from 'src/asset/backgrounds/bg-bit/blue-circle.svg';

// Styles
import './Preview.less';

function Preview() {
  return (
    <div className="ValidatorPreview">
      <CabinetBlock className="ValidatorPreview__container">
        <div className="ValidatorPreview__content">
          <h1 className="ValidatorPreview__title">Validator Admin panel</h1>
          <p className="ValidatorPreview__description">
            Validators are ambassadors and adherents of the project, they are
            earning a percentage of the exchange and from the growth of the
            NRFX/NUSD pool.
          </p>
          <div className="ValidatorPreview__buttons">
            <Button type="lightBlue" size="extra_large">
              Launch App
            </Button>
            <Button type="secondary-alice" size="extra_large">
              Verify
            </Button>
          </div>
        </div>
        <div className="ValidatorPreview__background">
          <SVG
            src={require('src/asset/backgrounds/validator-preview-bg.svg')}
          />
          <BackgroundBit
            src={blueCross}
            left={-73}
            top={131}
            width={18}
            rotate={4}
          />
          <BackgroundBit
            src={blueCross}
            width={16.44}
            top={244}
            right={-42}
            rotate={12}
          />
          <BackgroundBit
            src={blueCross}
            width={17.1}
            top={374}
            left={-133}
            rotate={-23.74}
          />
          <BackgroundBit
            src={blueCircle}
            top={26}
            right={-38}
            width={26}
            height={26}
          />
          <BackgroundBit src={blueCircle} bottom={8} left={1} />
          <BackgroundBit src={blueWaveLine} top={4} left={-57} rotate={32.8} />
          <BackgroundBit src={blueWaveLine} bottom={8} right={-52} />
        </div>
      </CabinetBlock>
      <SocialLinks />
    </div>
  );
}

export default Preview;
