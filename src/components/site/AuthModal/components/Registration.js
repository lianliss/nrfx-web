import React, { useState } from 'react';

import UI from '../../../../ui';
import * as steps from '../fixtures';


function Login({ changeStep }) {
  const [isChecked, toggleCheck] = useState(false);

  return (
    <>
      <h2 className="AuthModal__title">Registration</h2>

      <div className="AuthModal__content">
        <UI.Input placeholder="E-mail" />
        <UI.Input placeholder="Referrer" />

        <UI.CheckBox checked={isChecked} onChange={() => toggleCheck(!isChecked)}>Accept Terms and Conditions</UI.CheckBox>
      </div>

      <div className="AuthModal__footer">
        <UI.Button onClick={() => changeStep(steps.REGISTRATION_SUCCESS)}>Next</UI.Button>
      </div>
    </>
  )
}

export default React.memo(Login);