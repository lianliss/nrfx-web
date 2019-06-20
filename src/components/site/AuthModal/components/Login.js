import React, { useState } from 'react';

import UI from '../../../../ui';
import * as steps from '../fixtures';


function Login({ changeStep }) {
  const [isPasswordVisible, updateVisibility] = useState(false);

  return (
    <>
      <h2 className="AuthModal__title">Log In</h2>

      <div className="AuthModal__content">
        <UI.Input placeholder="E-mail" />
        <div className="AuthModal__input_wrapper">
          <UI.Input type={isPasswordVisible ? 'text' : 'password'} placeholder="Password" />

          {!isPasswordVisible
            ? <img src={require('../asset/opened_eye.svg')} alt="Eye" onClick={() => updateVisibility(true)} />
            : <img src={require('../asset/closed_eye.svg')} alt="Eye" onClick={() => updateVisibility(false)} />
          }
          
        </div>
        <h4 className="AuthModal__help_link" onClick={() => changeStep(steps.RESTORE_PASSWORD)}>Forgot your password?</h4>
      </div>

      <div className="AuthModal__footer">
        <h4 className="AuthModal__footer__link" onClick={() => changeStep(steps.REGISTRATION)}>Sign Up</h4>
        <UI.Button onClick={() => changeStep(steps.GOOGLE_AUTH)}>Log In</UI.Button>
      </div>
    </>
  )
}

export default React.memo(Login);