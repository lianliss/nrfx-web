import React from 'react';

// Components
import LineBreaker from 'src/ui/components/LineBreaker/LineBreaker';
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import SocialLinks from '../SocialLinks/SocialLinks';

// Utils
import { getLang } from 'src/utils';

// Styles
import './CabinetValidator.less';

function CabinetValidator() {
  return (
    <CabinetBlock className="CabinetValidator__wrap">
      <div className="CabinetValidator">
        <div className="CabinetValidator__container">
          <div className="CabinetValidator__content">
            <div>
              <h1>{getLang('dapp_validator_page_title')}</h1>
              <p className="CabinetValidator__description">
                {getLang('dapp_validator_page_subtitle')}
              </p>
              <a href="mailto:admin@narfex.com">
                {getLang('dapp_global_contact_us')} ›
              </a>
            </div>
            <SocialLinks />
          </div>
          <div className="CabinetValidator-bg">
            <img
              src={require('./asset/bg.svg').default}
              className="desktop-bg"
            />
            <img
              src={require('./asset/bg-mobile.svg').default}
              className="mobile-bg"
            />
          </div>
        </div>
      </div>
    </CabinetBlock>
  );
}

export default CabinetValidator;
