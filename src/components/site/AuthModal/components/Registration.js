import React, { useState } from 'react';

import UI from '../../../../ui';
import * as steps from '../fixtures';
import * as utils from '../../../../utils/index';
import { registerUser } from '../../../../actions/auth';
import SuccessModal from '../../SuccessModal/SuccessModal';


function Registration({ changeStep, currentStep, email, handleChange, onClose }) {
  const [isChecked, toggleCheck] = useState(false);
  const [referrar, changeReferrar] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = () => {
    if (!email) {
      setErrorMsg(utils.getLang('site__authModalEmailRequired'));
    } else if (!referrar) {
      setErrorMsg(utils.getLang('site__authModalReferrerRequired'));
    } else if (!isChecked) {
      setErrorMsg(utils.getLang('site__authModalTermsConditionsAccept'));
    } else {
      registerUser(email, referrar)
        .then(() => changeStep(steps.REGISTRATION_SUCCESS))
        .catch((err) => setErrorMsg(err.message));
    }
  }

  const handleClose = () => {
    changeReferrar('');
    onClose();
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  return (
    <>
      <h2 className="AuthModal__title">{utils.getLang('site__authModalRegistration')}</h2>

      {currentStep === steps.REGISTRATION
        ? (
          <>
            <div className="AuthModal__content">
              {errorMsg
                ? <p className="AuthModal__err_msg">{errorMsg}</p>
                : null}

              <UI.Input placeholder={utils.getLang('site__authModalPlaceholderEmail')} value={email} onKeyPress={handleKeyPress} onChange={(e) => handleChange(e.target.value, 'email')} />
              <UI.Input placeholder={utils.getLang('site__authModalPlaceholderReferrer')} value={referrar} onKeyPress={handleKeyPress} onChange={(e) => changeReferrar(e.target.value)} />

              <UI.CheckBox checked={isChecked} onChange={() => toggleCheck(!isChecked)}>{utils.getLang('site__authModalTermsConditions')}</UI.CheckBox>
            </div>

            <div className="AuthModal__footer">
              <UI.Button onClick={handleSubmit}>{utils.getLang('site__authModalNext')}</UI.Button>
            </div>
          </>
        ) : (
          <SuccessModal
            onClose={handleClose} 
            onResend={handleSubmit}
            title={utils.getLang('site__authModalRegDone')}
            subtitle={utils.getLang('site__authModalCheckMailDone')}
          />
        )}

    </>
  )
}

export default React.memo(Registration);