import React, { useState } from 'react';

import UI from '../../../../ui';
import * as steps from '../fixtures';
import * as utils from '../../../../utils/index';
import { getGoogleCode } from '../../../../actions/auth';


function GoogleAuth({ changeStep, email, password }) {
  const [gCode, changeGCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = () => {
    getGoogleCode(email, password, gCode)
      .then(() => {
        setErrorMsg('');
        setTimeout(() => window.location = 'https://cabinet.bitcoinbot.pro/profile', 100);
      })
      .catch((err) => setErrorMsg(err.message));
  }

  return (
    <>
      <h2 className="AuthModal__title">{utils.getLang('site__authModalLogIn')}</h2>

      <div className="AuthModal__content">

        {errorMsg
          ? <p className="AuthModal__err_msg">{errorMsg}</p>
          : null}

        <div className="AuthModal__input_wrapper">
          <UI.Input placeholder="Google Authenticator Code" value={gCode} onChange={(e) => changeGCode(e.target.value)} />

          <img src={require('../asset/google_auth.svg')} alt="Google Auth" />
        </div>
        
        <h4 className="AuthModal__help_link" onClick={() => changeStep(steps.RESET_AUTH)}>{utils.getLang('site__authModalResetKey')}</h4>
      </div>

      <div className="AuthModal__footer">
        <UI.Button onClick={handleSubmit}>{utils.getLang('site__authModalSubmit')}</UI.Button>
      </div>
    </>
  )
}

export default React.memo(GoogleAuth);