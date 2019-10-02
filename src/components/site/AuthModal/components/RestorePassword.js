import React, { useState } from 'react';

import UI from '../../../../ui';
import * as utils from '../../../../utils';
import * as steps from '../fixtures';
import SuccessModal from '../../SuccessModal/SuccessModal';
import { resetPassword } from '../../../../actions/auth';


function RestorePassword({ changeStep, currentStep, onClose }) {
  const [email, onChange] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = () => {
    resetPassword(email)
      .then(() => changeStep(steps.RESTORE_PASSWORD_SUCCESS))
      .catch((err) => setErrorMsg(err.message));
  }

  return (
    <>
      <h2 className="AuthModal__title">{utils.getLang('site__authModalRestorePwd')}</h2>

      {currentStep === steps.RESTORE_PASSWORD
        ? (
          <>
            <div className="AuthModal__content">
              {errorMsg
                ? <p className="AuthModal__err_msg">{errorMsg}</p>
                : null}

              <UI.Input
                autoFocus
                value={email}
                onChange={(e) => onChange(e.target.value)}
                placeholder={utils.getLang('site__authModalPlaceholderEmail')}
                onKeyPress={(e) => e.key === 'Enter' ? handleSubmit() : null}
              />
            </div>

            <div className="AuthModal__footer">
              <UI.Button fontSize={15} onClick={handleSubmit}>{utils.getLang('site__contactSend')}</UI.Button>
            </div>
          </>
        ) : (
          <SuccessModal
            onClose={onClose}
            onResend={handleSubmit}
            subtitle={utils.getLang('site__authModalCheckEmailRestorePwd')}
          />
        )}
    </>
  )
}

export default React.memo(RestorePassword);