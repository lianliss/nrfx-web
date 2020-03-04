import React, { useState, useRef } from 'react';

import * as UI from 'src/ui';
import { getAuth } from 'src/actions/auth';
import Captcha from 'src/components/Captcha/Captcha';
import * as utils from 'src/utils';
import * as steps from '../fixtures';
import * as auth from '../../../services/auth';
import * as user from '../../../actions/user';
import router from '../../../router';
import * as pages from '../../../index/constants/pages';


function Login({ changeStep, email, password, token, handleChange, currentStep }) {
  const [errorMsg, setErrorMsg] = useState('');
  const [status, setStatus] = useState('');
  const isProduction = utils.isProduction();
  const disabled = isProduction ? (!email || !password || !token) : (!email || !password);

  const captchaRef = useRef();

  const handleSubmit = () => {
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
          if (res.need_ga_code) {
            changeStep(steps.GOOGLE_AUTH, { loginRes: res });
          } else {
            router.navigate(router.getState().name === pages.EXCHANGE ? pages.EXCHANGE : pages.DASHBOARD);
          }
        })
        .catch((err) => {
          if (isProduction) {
            captchaRef.current.props.grecaptcha.reset();
          }
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

        { isProduction && <Captcha ref={captchaRef} onChange={token => handleChange(token, 'token')} /> }

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
