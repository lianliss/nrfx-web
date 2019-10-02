import React, { useState, useRef } from 'react';

import UI from '../../../../ui';
import * as steps from '../fixtures';
import * as utils from '../../../../utils/index';
import { getGoogleCode } from '../../../../actions/auth';
import router from '../../../../router';
import * as pages from '../../../../constants/pages';

function GoogleAuth({ changeStep, email, password, params }) {
  const [gaCode, changeGaCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const hashRef = useRef(null);
  const { loginRes } = params;

  const handleSubmit = (code) => {
    const googleCode = code ? code : gaCode;

    getGoogleCode(email, password, googleCode)
      .then((data) => {
        setErrorMsg('');
        if (data.status === 'phone_not_verified') {
          changeStep(steps.CONFIRM_NUMBER, { phoneCode: data.phone_code, phoneNumber: data.phone_number, googleCode });
        } else {
          router.navigate(pages.PROFILE, {}, { reload: true });
        }
      })
      .catch((err) => setErrorMsg(err.message));
  };

  const handleHashCopy = (e) => {
    hashRef.current.select();
    document.execCommand('copy');

    // In case don't want to select the hash
    // e.target.focus();
  };

  const handleChange = (e) => {
    const val = e.target.value;

    if (val.length <= 6) {
      changeGaCode(val);
    }

    if (val.length === 6) {
      handleSubmit(val);
    }
  };

  return (
    <div className="AuthModal__ga">
      {(loginRes.need_ga_setup !== true)
        && <h2 className="AuthModal__title">{utils.getLang('site__authModalLogIn')}</h2>
      }

      <div className="AuthModal__content">

        {errorMsg
          ? <p className="AuthModal__err_msg">{errorMsg}</p>
          : null}

        {loginRes.need_ga_setup === true
          && (
            <div className="AuthModal__content__ga">
              <h2 className="AuthModal__title">{utils.getLang('site__authModalTitle')}</h2>
              <p className="AuthModal__content__ga__msg">{utils.getLang('site__authModalContentGA')}</p>
              <img src={loginRes.url} alt="GA QR Code" />
              <input className="AuthModal__content__ga__hash" ref={hashRef} value={loginRes.hash} readOnly />
            </div>
          )}

        <div className="AuthModal__input_wrapper">
          <UI.Input
            autoFocus
            type="number"
            autoComplete="off"
            value={gaCode}
            onChange={handleChange}
            placeholder={utils.getLang('site__authModalGAPlaceholder')}
            onKeyPress={(e) => (e.key === 'Enter' && gaCode.length < 6) ? handleSubmit() : null}
          />

          <img src={require('../asset/google_auth.svg')} alt="Google Auth" />
        </div>
        
        {loginRes.need_ga_setup !== true && (
          <h4 className="AuthModal__help_link" onClick={() => changeStep(steps.RESET_AUTH)}>{utils.getLang('site__authModalResetKey')}</h4>
        )}
      </div>

      <div className="AuthModal__footer">
        {(loginRes.need_ga_setup === true && document.queryCommandSupported('copy')) &&
          <UI.Button fontSize={15} type="outline" outlined onClick={handleHashCopy}>Copy Key</UI.Button>
        }
        <UI.Button fontSize={15} onClick={() => handleSubmit()} disabled={gaCode.length < 6}>{utils.getLang('site__authModalSubmit')}</UI.Button>
      </div>
    </div>
  )
}

export default React.memo(GoogleAuth);