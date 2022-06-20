import React from 'react';
import PropTypes from 'prop-types';

// Components
import * as UI from 'src/ui';

// Utils
import { steps } from '../../constants/steps';

// Styles
import './CreatePool.less';

function CreatePool({ setStep, setPoolAddress, poolAddress }) {
  const [value, setValue] = React.useState('');
  const [isCreated, setIsCreated] = React.useState(false);

  const inputHandler = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="PrivatePools__CreatePool">
      {poolAddress ? (
        <div>
          <h3>Pool Address:</h3>
          <UI.CopyText
            className="PrivatePools__address"
            text={poolAddress}
          ></UI.CopyText>
          <p className="default-text">
            Save and share your pool address with friends
          </p>
        </div>
      ) : (
        <>
          <div className="row">
            <label>
              <span>Pool amount</span>
              <UI.Input
                placeholder="Pool amount"
                value={value}
                onTextChange={inputHandler}
              />
            </label>
          </div>
          <div className="row">
            <UI.Button
              type="lightBlue"
              onClick={() => {
                setPoolAddress(
                  'testText012x0x0901291aadcaewg12311asdfa23131231231312z'
                );
                setIsCreated(true);
              }}
            >
              Create pool
            </UI.Button>
          </div>
        </>
      )}
      <div className="row">
        <UI.Button
          type="secondary"
          onClick={() => {
            if (isCreated) {
              setStep(steps.information);
            } else {
              setStep(steps.main);
            }
          }}
        >
          {isCreated ? 'Information' : 'Back'}
        </UI.Button>
      </div>
    </div>
  );
}

CreatePool.propTypes = {
  setStep: PropTypes.func,
  setPoolAddress: PropTypes.func,
  poolAddress: PropTypes.string,
};

CreatePool.defaultProps = {
  setStep: () => {},
  setPoolAddress: () => {},
  poolAddress: null,
};

export default CreatePool;
