import React from 'react';

// Components
import * as UI from 'src/ui';
import CreatePool from './components/CreatePool/CreatePool';
import Information from './components/Information/Information';
import JoinThePool from './components/JoinThePool/JoinThePool';
import Unlock from './components/Unlock/Unlock';
import WhiteListed from './components/WhiteListed/WhiteListed';

// Utils
import { steps } from './constants/steps';

// Styles
import './PrivatePools.less';

function PrivatePools() {
  const [step, setStep] = React.useState(steps.main);
  const [poolAddress, setPoolAddress] = React.useState(null);

  return (
    <div className="PrivatePools__wrap">
      <div className="PrivatePools">
        <div className="PrivatePools__form">
          <h2>{step}</h2>
          {step === steps.main && (
            <>
              <div className="row">
                <UI.Button
                  type="lightBlue"
                  onClick={() => setStep(steps.createPool)}
                >
                  Create pool
                </UI.Button>
              </div>
              <div className="row">
                <UI.Button
                  type="lightBlue"
                  onClick={() => setStep(steps.joinThePool)}
                >
                  Join the pool
                </UI.Button>
              </div>
            </>
          )}
          {step === steps.joinThePool && (
            <JoinThePool setStep={setStep} setPoolAddress={setPoolAddress} />
          )}
          {step === steps.createPool && (
            <CreatePool
              setStep={setStep}
              setPoolAddress={setPoolAddress}
              poolAddress={poolAddress}
            />
          )}
          {step === steps.information && <Information setStep={setStep} />}
          {step === steps.whiteListed && <WhiteListed setStep={setStep} />}
          {step === steps.unlock && <Unlock setStep={setStep} />}
        </div>
      </div>
    </div>
  );
}

export default PrivatePools;
