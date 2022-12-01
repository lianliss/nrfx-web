import React from 'react';

// Components
import { Button } from 'ui';
import CabinetBlock from '../../../components/dapp/CabinetBlock/CabinetBlock';

// Styles
import './Login.less';

function Login() {
  return (
    <div className="ValidatorLogin">
      <CabinetBlock className="ValidatorLogin__container">
        <div className="ValidatorLogin__content">
          <h1 className="ValidatorLogin__title">Validator Admin panel</h1>
          <p className="ValidatorLogin__description">
            Validators are ambassadors and adherents of the project, they are
            earning a percentage of the exchange and from the growth of the
            NRFX/NUSD pool.
          </p>
          <div className="ValidatorLogin__buttons">
            <Button type="lightBlue" size="extra_large">
              Launch App
            </Button>
            <Button type="secondary-alice" size="extra_large">
              Verify
            </Button>
          </div>
        </div>
      </CabinetBlock>
    </div>
  );
}

export default Login;
