import React, { useState, useRef } from 'react';

import UI from '../../../../ui';
import * as steps from '../fixtures';
import * as utils from '../../../../utils/index';
import { getGoogleCode } from '../../../../actions/auth';


function GoogleAuth({ changeStep, email, password, loginRes }) {
  const [gCode, changeGCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const hashRef = useRef(null);

  const handleSubmit = () => {
    getGoogleCode(email, password, gCode)
      .then(() => {
        setErrorMsg('');
        setTimeout(() => window.location = 'https://cabinet.bitcoinbot.pro/profile', 100);
      })
      .catch((err) => setErrorMsg(err.message));
  }

  const handleHashCopy = (e) => {
    hashRef.current.select();
    document.execCommand('copy');

    // In case don't want to select the hash
    // e.target.focus();
  }

  return (
    <div className="AuthModal__ga">
      {(loginRes.status !== 'ga_init')
        && <h2 className="AuthModal__title">{utils.getLang('site__authModalLogIn')}</h2>
      }

      <div className="AuthModal__content">

        {errorMsg
          ? <p className="AuthModal__err_msg">{errorMsg}</p>
          : null}

        {loginRes.status === 'ga_init' 
          && (
            <div className="AuthModal__content__ga">
              <h2 className="AuthModal__title">Enable Google Authenticator</h2>
              <p className="AuthModal__content__ga__msg">Scan QR-code by Google Authentificator or add key manually:</p>
              <img src={loginRes.url} alt="GA QR Code" />
              <input className="AuthModal__content__ga__hash" ref={hashRef} value={loginRes.hash} readOnly />
            </div>
          )}

        <div className="AuthModal__input_wrapper">
          <UI.Input
            autoFocus
            type="number"
            autoComplete="off"
            value={gCode}
            onChange={(e) => changeGCode(e.target.value)}
            placeholder={utils.getLang('site__authModalGAPlaceholder')}
            onKeyPress={(e) => (e.key === 'Enter' && gCode.length < 6) ? handleSubmit() : null}
          />

          <img src={require('../asset/google_auth.svg')} alt="Google Auth" />
        </div>
        
        {loginRes.status !== 'ga_init' && (
          <h4 className="AuthModal__help_link" onClick={() => changeStep(steps.RESET_AUTH)}>{utils.getLang('site__authModalResetKey')}</h4>
        )}
      </div>

      <div className="AuthModal__footer">
        {(loginRes.status === 'ga_init' && document.queryCommandSupported('copy')) &&
          <UI.Button type="outline" outlined onClick={handleHashCopy}>Copy Key</UI.Button>
        }
        <UI.Button onClick={handleSubmit} disabled={gCode.length < 6}>{utils.getLang('site__authModalSubmit')}</UI.Button>
      </div>
    </div>
  )
}

export default React.memo(GoogleAuth);