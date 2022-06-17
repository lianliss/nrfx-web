import React from 'react';

// Components
import * as UI from 'src/ui';

// Utils
import { steps } from '../../constants/steps';

function JoinThePool({ setStep, setPoolAddress }) {
  const [value, setValue] = React.useState('');

  const inputHandler = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="PrivatePools__JoinThePool">
      <div className="row">
        <label>
          <span>Pool address</span>
          <UI.Input
            placeholder="Pool address"
            value={value}
            onTextChange={inputHandler}
          />
        </label>
      </div>
      <div className="row">
        <UI.Button
          onClick={() => {
            setPoolAddress(
              'testText012x0x0901291aadcaewg12311asdfa23131231231312z'
            );
            setStep(steps.information);
          }}
          type="lightBlue"
        >
          Find Pool
        </UI.Button>
      </div>
      <div className="row">
        <UI.Button type="secondary" onClick={() => setStep(steps.main)}>
          Back
        </UI.Button>
      </div>
    </div>
  );
}

export default JoinThePool;
