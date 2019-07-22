import './AuthModal.less';

import React, { useState } from 'react';

import UI from '../../../ui';
import Login from './components/Login';
import ResetAuth from './components/ResetAuth';
import * as steps from './fixtures';
import RestorePassword from './components/RestorePassword';
import Registration from './components/Registration';


function AuthModal({ children, type, initialEmail, className }) {
  const [isOpen, toggleOpen] = useState(false);
  const [currentStep, changeStep] = useState(type || steps.LOGIN);
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');

  const getCurrentContent = () => {
    switch (currentStep) {
      case steps.LOGIN:
      case steps.GOOGLE_AUTH:
        return <Login email={email} password={password} handleChange={handleChange} changeStep={changeStep} currentStep={currentStep} />;
      case steps.RESET_AUTH:
      case steps.RESET_AUTH_SUCCESS:
        return <ResetAuth email={email} password={password} changeStep={changeStep} currentStep={currentStep} onClose={handleClose} />;
      case steps.RESTORE_PASSWORD:
      case steps.RESTORE_PASSWORD_SUCCESS:
        return <RestorePassword changeStep={changeStep} currentStep={currentStep} onClose={handleClose} />;
      case steps.REGISTRATION:
      case steps.REGISTRATION_SUCCESS:
        return <Registration email={initialEmail ? initialEmail : email} handleChange={handleChange} changeStep={changeStep} currentStep={currentStep} onClose={handleClose} />;
      default:
        return <Login email={email} password={password} handleChange={handleChange} changeStep={changeStep} />;
    }
  }

  const handleOpen = () => {
    document.body.classList.add('modal-open');
    toggleOpen(true);
  }

  const handleClose = () => {
    document.body.classList.remove('modal-open');
    toggleOpen(false);

    // Resetting the state
    changeStep(type || steps.LOGIN);
    changeEmail('');
    changePassword('');
  }

  const handleChange = (value, type) => {
    if (type === 'email') {
      changeEmail(value);
    } else if (type === 'password') {
      changePassword(value);
    }
  }

  return (
    <div className={"AuthModal " + className}>
      <span onClick={handleOpen}>
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