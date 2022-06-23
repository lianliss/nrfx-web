import React from 'react';
import PropTypes from 'prop-types';

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
            setPoolAddress(value);
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

JoinThePool.propTypes = {
  setStep: PropTypes.func,
  setPoolAddress: PropTypes.func,
};

JoinThePool.defaultProps = {
  setStep: () => {},
  setPoolAddress: () => {},
};

export default JoinThePool;
