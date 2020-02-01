import React, { useState, useRef } from 'react';

import UI from 'src/ui';
import { getAuth } from 'src/actions/auth';
import Captcha from 'src/components/Captcha/Captcha';
import * as utils from 'utils';
import * as steps from '../fixtures';


function Login({ changeStep, email, password, token, handleChange, currentStep }) {
  const [errorMsg, setErrorMsg] = useState('');
  const [status, setStatus] = useState('');
  const disabled = !email || !password || !token;
  const captchaRef = useRef();

  const handleSubmit = () => {
    const { grecaptcha } = captchaRef.current.props;

    if (!email) {
      setErrorMsg(utils.getLang('site__authModalEmailRequired'));
    } else if (!password) {
      setErrorMsg(utils.getLang('site__authModalPwdRequired'));
    } else {
      setStatus('loading');
      setErrorMsg('');
      getAuth(email.trim(), password, token)
        .then((res) => {
          setErrorMsg('');
          changeStep(steps.GOOGLE_AUTH, { loginRes: res });
        })
        .catch((err) => {
          grecaptcha.reset();
          setErrorMsg(err.message);
        }).finally(() => {
          setStatus('');
        });
    }
  };



  return (
    <>
      <UI.ModalHeader>{utils.getLang("site__authModalLogIn")}</UI.ModalHeader>

      <div className="AuthModal__content">

        {errorMsg
          ? <p className="AuthModal__err_msg">{errorMsg}</p>
          : null}

        <UI.Input
          value={email}
          onChange={(e) => handleChange(e.target.value, 'email')}
          placeholder={utils.getLang('site__authModalPlaceholderEmailOrUsername')}
          onKeyPress={(e) => e.key === 'Enter' ? handleSubmit() : null}
        />
        <div className="AuthModal__input_wrapper">
          <UI.Input
            value={password}
            autoComplete="off"
            onChange={(e) => handleChange(e.target.value, 'password')}
            placeholder={utils.getLang('site__authModalPlaceholderPwd')}
            onKeyPress={(e) => e.key === 'Enter' ? handleSubmit() : null}
            type="password"
          />
        </div>

        <Captcha ref={captchaRef} onChange={token => handleChange(token, 'token')} />

        <h4 className="AuthModal__help_link" onClick={() => changeStep(steps.RESTORE_PASSWORD)}>{utils.getLang('site__authModalForgotPwd')}</h4>

      </div>

      <div className="AuthModal__footer">
        <h4 className="AuthModal__footer__link" onClick={() => changeStep(steps.REGISTRATION)}>{utils.getLang('site__commerceRegistration')}</h4>
        <UI.Button disabled={disabled} state={status} fontSize={15} onClick={handleSubmit}>{utils.getLang('site__authModalLogInBtn')}</UI.Button>
      </div>
    </>
  )
}

export default React.memo(Login);
