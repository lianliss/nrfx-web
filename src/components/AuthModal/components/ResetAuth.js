import React, { useState } from 'react';

import * as UI from 'src/ui';
import * as utils from 'utils';
import * as steps from '../fixtures';
import { resetGoogleCode } from 'actions/auth';
import SuccessModal from 'src/index/components/site/SuccessModal/SuccessModal';


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
      <UI.ModalHeader>{utils.getLang("site__authModalResetAuth")}</UI.ModalHeader>

      {currentStep === steps.RESET_AUTH
        ? (
          <>
            <div className="AuthModal__content">
              {errorMsg
                ? <p className="AuthModal__err_msg">{errorMsg}</p>
                : null}

              <div className="AuthModal__input_wrapper">
                <UI.Input
                  autoComplete="off"
                  autoFocus
                  value={secretKey}
                  onChange={(e) => changeSecretKey(e.target.value)}
                  placeholder={utils.getLang('site__authModalSecretKey')}
                  type='password'
                  onKeyPress={(e) => e.key === 'Enter' ? handleSubmit() : null}
                />
              </div>
            </div>

            <div className="AuthModal__footer">
              <UI.Button fontSize={15} onClick={handleSubmit}>{utils.getLang('site__authModalResetAuthSubmit')}</UI.Button>
            </div>
          </>
        ) : (
          <SuccessModal
            onClose={onClose}
            subtitle={utils.getLang('site__resetAuthModalSubtitle')}
          />
        )}
    </>
  )
}

export default React.memo(ResetAuth);
