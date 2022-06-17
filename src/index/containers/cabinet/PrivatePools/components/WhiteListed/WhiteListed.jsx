import React from 'react';

// Components
import * as UI from 'src/ui';

// Utils
import { steps } from '../../constants/steps';

// Styles
import './WhiteListed.less';

function WhiteListed({ setStep }) {
  return (
    <div className="PrivatePools__WhiteListed">
      <div className="PrivatePools__table">
        <div className="row">
          <span>Pool whitelisted:</span>
          <span>Yes</span>
        </div>
        <div className="row">
          <div className="col">
            <span>1 NRFX = 0.4 BUSD</span>
          </div>
        </div>
      </div>
      <UI.Button type="lightBlue" onClick={() => setStep(steps.unlock)}>
        Buy NRFX
      </UI.Button>
    </div>
  );
}

export default WhiteListed;
