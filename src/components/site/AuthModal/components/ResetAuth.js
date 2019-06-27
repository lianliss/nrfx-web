import React, { useState } from 'react';

import UI from '../../../../ui';
import * as utils from "../../../../utils";
import { resetGoogleCode } from '../../../../actions/auth';


function ResetAuth({ email, password }) {
  const [errorMsg, setErrorMsg] = useState('');
  const [secretKey, changeSecretKey] = useState('');


  const handleSubmit = () => {
    resetGoogleCode(secretKey, email, password)
      .then(() => {
        setErrorMsg('');
        // TODO: should redirect
      })
      .catch((err) => setErrorMsg(err.message));
  }

  return (
    <>
      <h2 className="AuthModal__title">{utils.getLang('site__authModalResetAuth')}</h2>

      <div className="AuthModal__content">
        {errorMsg
          ? <p className="AuthModal__err_msg">{errorMsg}</p>
          : null}

        <UI.Input placeholder="Secret Key" value={secretKey} onChange={(e) => changeSecretKey(e.target.value)} />
      </div>

      <div className="AuthModal__footer">
        <UI.Button onClick={handleSubmit}>{utils.getLang('site__authModalResetAuthSubmit')}</UI.Button>
      </div>
    </>
  )
}

export default React.memo(ResetAuth);