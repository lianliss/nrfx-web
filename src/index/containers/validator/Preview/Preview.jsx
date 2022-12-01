import React from 'react';

// Components
import { Button, Col } from 'ui';
import CabinetBlock from '../../../components/dapp/CabinetBlock/CabinetBlock';
import SocialLinks from '../../../components/dapp/SocialLinks/SocialLinks';

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
      </CabinetBlock>
      <SocialLinks />
    </div>
  );
}

export default Preview;
