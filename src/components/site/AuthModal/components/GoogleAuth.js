import React, { useState } from 'react';

import UI from '../../../../ui';
import * as steps from '../fixtures';
import { getGoogleCode } from '../../../../actions/auth';


function GoogleAuth({ changeStep, email, password }) {
  const [gCode, changeGCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = () => {
    getGoogleCode(email, password, gCode)
      .then(() => {
        setErrorMsg('');
        // TODO: should redirect
      })
      .catch((err) => setErrorMsg(err.message));
  }

  return (
    <>
      <h2 className="AuthModal__title">Log In</h2>

      <div className="AuthModal__content">

        {errorMsg
          ? <p className="AuthModal__err_msg">{errorMsg}</p>
          : null}

        <div className="AuthModal__input_wrapper">
          <UI.Input placeholder="Google Authenticator Code" value={gCode} onChange={(e) => changeGCode(e.target.value)} />

          <img src={require('../asset/google_auth.svg')} alt="Google Auth" />
        </div>
        
        <h4 className="AuthModal__help_link" onClick={() => changeStep(steps.RESET_AUTH)}>
          Reset Authenticator Key
        </h4>
      </div>

      <div className="AuthModal__footer">
        <UI.Button onClick={handleSubmit}>Submit</UI.Button>
      </div>
    </>
  )
}

export default React.memo(GoogleAuth);