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
  const description =
    'Validators are ambassadors and adherents\n of the project, they are earning a percentage\n of the exchange and from the growth\n of the NRFX/NUSD pool.\n Anyone in the world can become a validator\n and start earn on the fiat exchange process more than on other platforms, companies and even exchanges can be validators and earn with us.\n We are open for partnerships, contact us.';

  return (
    <CabinetBlock className="CabinetValidator__wrap">
      <div className="CabinetValidator">
        <div className="CabinetValidator__container">
          <div className="CabinetValidator__content">
            <div>
              <h1>Become a Validator</h1>
              <p className="CabinetValidator__description">
                <LineBreaker text={getLang(description)} />
              </p>
              <a href="mailto:admin@narfex.com">Сontact us ›</a>
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
