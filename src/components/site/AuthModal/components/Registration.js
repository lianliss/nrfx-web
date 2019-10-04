import React, { useState } from 'react';

import UI from '../../../../ui';
import * as steps from '../fixtures';
import * as utils from '../../../../utils/index';
import {registerUser} from '../../../../actions/auth';
import SuccessModal from '../../SuccessModal/SuccessModal';
import StaticContentModal from '../../StaticContentModal/StaticContentModal';

function Registration({ changeStep, currentStep, email, handleChange, onClose, refParam }) {

  const [isChecked, toggleCheck] = useState(false);
  const [referrer, changeReferrer] = useState(refParam);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = () => {

    if (!email) {
      setErrorMsg(utils.getLang('site__authModalEmailRequired'));
    } else if (!utils.isEmail(email)) {
      setErrorMsg(utils.getLang('global_InvalidEmail'));
    } else if (!isChecked) {
      setErrorMsg(utils.getLang('site__authModalTermsConditionsAccept'));
    } else {
      registerUser(email, referrer)
        .then(() => changeStep(steps.REGISTRATION_SUCCESS))
        .catch((err) => setErrorMsg(err.message));
    }
  };

  const handleClose = () => {
    changeReferrer('');
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="RegisterModal">
      <h2 className="AuthModal__title">{utils.getLang('site__authModalRegistration')}</h2>

      {currentStep === steps.REGISTRATION
        ? (
          <>
            <div className="AuthModal__content">
              {errorMsg
                ? <p className="AuthModal__err_msg">{errorMsg}</p>
                : null}

              <UI.Input placeholder={utils.getLang('site__authModalPlaceholderEmail')} value={email} onKeyPress={handleKeyPress} onChange={(e) => handleChange(e.target.value, 'email')} />
              <UI.Input disabled={refParam} placeholder={utils.getLang('site__authModalPlaceholderReferrer')} value={referrer} onKeyPress={handleKeyPress} onChange={(e) => changeReferrer(e.target.value)} />

              <div className="AuthModal__content__terms">
                <UI.CheckBox checked={isChecked} onChange={() => toggleCheck(!isChecked)} />
                <StaticContentModal type="terms">
                  <span className="AuthModal__content__terms__link">{utils.getLang('site__authModalTermsConditions')}</span>
                </StaticContentModal>
              </div>
            </div>

            <div className="AuthModal__footer">
              <UI.Button fontSize={15} onClick={handleSubmit}>{utils.getLang('site__authModalNext')}</UI.Button>
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

    </div>
  )
}

export default React.memo(Registration);