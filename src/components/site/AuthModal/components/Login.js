import React, { useState } from 'react';

import UI from '../../../../ui';
import { getAuth } from '../../../../actions/auth';
import * as utils from '../../../../utils/index';
import * as steps from '../fixtures';


function Login({ changeStep, email, password, handleChange }) {
  const [isPasswordVisible, updateVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const handleSubmit = () => {
    if (!email) {
      setErrorMsg('Email is required');
    } else if (!password) {
      setErrorMsg('Password is required');
    } else {
      getAuth(email, password)
        .then(() => {
          setErrorMsg('');
          changeStep(steps.GOOGLE_AUTH);
        })
        .catch((err) => {
          setErrorMsg(err.message);
        });
    }
  }

  return (
    <>
      <h2 className="AuthModal__title">{utils.getLang('site__authModalLogIn')}</h2>

      <div className="AuthModal__content">
        
        {errorMsg 
          ? <p className="AuthModal__err_msg">{errorMsg}</p>
          : null}

        <UI.Input value={email} onChange={(e) => handleChange(e.target.value, 'email')} placeholder={utils.getLang('site__authModalPlaceholderEmail')} />
        <div className="AuthModal__input_wrapper">
          <UI.Input
            value={password}
            onChange={(e) => handleChange(e.target.value, 'password')}
            placeholder={utils.getLang('site__authModalPlaceholderPwd')}
            type={isPasswordVisible ? 'text' : 'password'}
          />

          {!isPasswordVisible
            ? <img src={require('../asset/opened_eye.svg')} alt="Eye" onClick={() => updateVisibility(true)} />
            : <img src={require('../asset/closed_eye.svg')} alt="Eye" onClick={() => updateVisibility(false)} />
          }
          
        </div>
        <h4 className="AuthModal__help_link" onClick={() => changeStep(steps.RESTORE_PASSWORD)}>{utils.getLang('site__authModalForgotPwd')}</h4>
      </div>

      <div className="AuthModal__footer">
        <h4 className="AuthModal__footer__link" onClick={() => changeStep(steps.REGISTRATION)}>{utils.getLang('site__authModalSignUpBtn')}</h4>
        <UI.Button onClick={handleSubmit}>{utils.getLang('site__authModalLogInBtn')}</UI.Button>
      </div>
    </>
  )
}

export default React.memo(Login);