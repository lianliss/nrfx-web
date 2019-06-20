import './AuthModal.less';

import React, { useState } from 'react';

import UI from '../../../ui';
import Login from './components/Login';
import GoogleAuth from './components/GoogleAuth';
import ResetAuth from './components/ResetAuth';
import * as steps from './fixtures';
import RestorePassword from './components/RestorePassword';
import RestorePasswordSuccess from './components/RestorePasswordSuccess';
import Registration from './components/Registration';
import RegistrationSuccess from './components/RegistrationSuccess';


function AuthModal({ children, type }) {
  const [isOpen, toggleOpen] = useState(false);
  const [currentStep, changeStep] = useState(type || steps.LOGIN);

  const getCurrentContent = () => {
    switch (currentStep) {
      case steps.LOGIN:
        return <Login changeStep={changeStep} />;
      case steps.GOOGLE_AUTH:
        return <GoogleAuth changeStep={changeStep} />;
      case steps.RESET_AUTH:
        return <ResetAuth changeStep={changeStep} />;
      case steps.RESTORE_PASSWORD:
        return <RestorePassword changeStep={changeStep} />;
      case steps.RESTORE_PASSWORD_SUCCESS:
        return <RestorePasswordSuccess onClose={handleClose} />;
      case steps.REGISTRATION:
        return <Registration changeStep={changeStep} />;
      case steps.REGISTRATION_SUCCESS:
        return <RegistrationSuccess onClose={handleClose} />;
      default:
        return <Login changeStep={changeStep} />;
    }
  }

  const handleClose = () => {
    toggleOpen(false);
    changeStep(steps.LOGIN);
  }

  return (
    <div className="AuthModal">
      <span onClick={() => toggleOpen(true)}>
        {children}
      </span>
      <UI.Modal
        isOpen={isOpen}
        onClose={handleClose}
      >

        {getCurrentContent()}

      </UI.Modal>
    </div>
  )
}

export default React.memo(AuthModal);