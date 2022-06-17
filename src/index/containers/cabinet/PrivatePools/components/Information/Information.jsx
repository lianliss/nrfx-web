import React from 'react';
import PropTypes from 'prop-types';

// Components
import * as UI from 'src/ui';

// Utils
import { steps } from '../../constants/steps';

// Styles
import './Information.less';

function Information({ setStep }) {
  const [amount, setAmount] = React.useState('0');

  return (
    <div className="PrivatePools__Information">
      <div className="PrivatePools__table">
        <div className="row">
          <span>Min deposit:</span>
          <span>
            <UI.NumberFormat number={110} />
          </span>
        </div>
        <div className="row">
          <span>Max deposit:</span>
          <span>
            <UI.NumberFormat number={1110} />
          </span>
        </div>
        <div className="row">
          <span>Pool balance:</span>
          <span>
            <UI.NumberFormat number={11210} />
          </span>
        </div>
        <div className="row">
          <span>Target amount:</span>
          <span>
            <UI.NumberFormat number={3123} />
          </span>
        </div>
        <div className="row">
          <span></span>
          <span>
            <strong>
              <em>
                <UI.NumberFormat number={1} currency="nrfx" />
                &nbsp;=&nbsp;
                <UI.NumberFormat number={0.4} currency="busd" />
              </em>
            </strong>
          </span>
        </div>
      </div>
      <div className="row deposit">
        <label>
          <span>Deposit BUSD</span>
          <UI.Input
            type="number"
            value={amount}
            onTextChange={(value) => setAmount(value)}
          />
        </label>
      </div>
      <div className="row">
        <UI.Button type="lightBlue" onClick={() => setStep(steps.whiteListed)}>
          Approve
        </UI.Button>
        <UI.Button type="lightBlue" onClick={() => setStep(steps.whiteListed)}>
          Deposit
        </UI.Button>
      </div>
    </div>
  );
}

Information.propTypes = {
  setStep: PropTypes.func,
};

Information.defaultProps = {
  setStep: () => {},
};

export default Information;
