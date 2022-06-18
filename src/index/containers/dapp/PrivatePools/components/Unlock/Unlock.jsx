import React from 'react';

// Components
import * as UI from 'src/ui';

// Styles
import './Unlock.less';

function Unlock() {
  const [amount, setAmount] = React.useState('0');

  return (
    <div className="PrivetaPools__Unlock">
      <div className="row">
        <div className="PrivatePools__table">
          <div className="row">
            <span>Lock-up:</span>
            <span>12:12:12</span>
          </div>
          <div className="row">
            <span>Available to withrawal:</span>
            <span>
              <UI.NumberFormat number={12} />
            </span>
          </div>
        </div>
      </div>
      <div className="row">
        <label>
          <span>Amount NRFX</span>
          <UI.Input
            type="number"
            placeholder="Amount"
            value={amount}
            onTextChange={(value) => setAmount(value)}
          />
        </label>
      </div>
      <div className="row">
        <UI.Button type="lightBlue">Unlock</UI.Button>
        <UI.Button type="lightBlue">Withdrawal</UI.Button>
      </div>
      <div className="row"></div>
    </div>
  );
}

export default Unlock;
