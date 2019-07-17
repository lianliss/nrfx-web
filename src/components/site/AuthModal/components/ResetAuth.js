import React, { useState } from 'react';

import UI from '../../../../ui';
import * as utils from '../../../../utils';
import * as steps from '../fixtures';
import { resetGoogleCode } from '../../../../actions/auth';
import SuccessModal from '../../SuccessModal/SuccessModal';


function ResetAuth({ email, password, currentStep, onClose, changeStep }) {
  const [errorMsg, setErrorMsg] = useState('');
  const [secretKey, changeSecretKey] = useState('');


  const handleSubmit = () => {
    resetGoogleCode(secretKey, email, password)
      .then(() => {
        setErrorMsg('');
        changeStep(steps.RESET_AUTH_SUCCESS);
      })
      .catch((err) => setErrorMsg(err.message));
  }

  return (
    <>
      <h2 className="AuthModal__title">{utils.getLang('site__authModalResetAuth')}</h2>

      {currentStep === steps.RESET_AUTH
        ? (
          <>
            <div className="AuthModal__content">
              {errorMsg
                ? <p className="AuthModal__err_msg">{errorMsg}</p>
                : null}

              <UI.Input
                autoFocus
                placeholder="Secret Key"
                value={secretKey}
                onChange={(e) => changeSecretKey(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' ? handleSubmit() : null}
              />
            </div>

            <div className="AuthModal__footer">
              <UI.Button onClick={handleSubmit}>{utils.getLang('site__authModalResetAuthSubmit')}</UI.Button>
            </div>
          </>
        ) : (
          <SuccessModal
            onClose={onClose}
            onResend={handleSubmit}
            subtitle={utils.getLang('site__authModalCheckEmailRestoreAuth')}
          />
        )}
    </>
  )
}

export default React.memo(ResetAuth);