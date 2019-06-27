import React, { useState } from 'react';

import UI from '../../../../ui';
import * as steps from '../fixtures';
import * as utils from '../../../../utils/index';
import { registerUser } from '../../../../actions/auth';


function Registration({ changeStep, email, handleChange }) {
  const [isChecked, toggleCheck] = useState(false);
  const [referrar, changeReferrar] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = () => {
    if (!email) {
      setErrorMsg('Email is required');
    } else if (!referrar) {
      setErrorMsg('Referrar is required');
    } else if (!isChecked) {
      setErrorMsg('Please accept Terms and Conditions');
    } else {
      registerUser(email, referrar)
        .then(() => changeStep(steps.REGISTRATION_SUCCESS))
        .catch((err) => setErrorMsg(err.message));
    }
  }

  return (
    <>
      <h2 className="AuthModal__title">{utils.getLang('site__authModalRegistration')}</h2>

      <div className="AuthModal__content">
        {errorMsg
          ? <p className="AuthModal__err_msg">{errorMsg}</p>
          : null}

        <UI.Input placeholder={utils.getLang('site__authModalPlaceholderEmail')} value={email} onChange={(e) => handleChange(e.target.value, 'email')} />
        <UI.Input placeholder={utils.getLang('site__authModalPlaceholderReferrer')} value={referrar} onChange={(e) => changeReferrar(e.target.value)} />

        <UI.CheckBox checked={isChecked} onChange={() => toggleCheck(!isChecked)}>{utils.getLang('site__authModalTermsConditions')}</UI.CheckBox>
      </div>

      <div className="AuthModal__footer">
        <UI.Button onClick={handleSubmit}>{utils.getLang('site__authModalNext')}</UI.Button>
      </div>
    </>
  )
}

export default React.memo(Registration);