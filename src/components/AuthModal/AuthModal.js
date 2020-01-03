import './AuthModal.less';

import React, { useState } from 'react';

import UI from '../../../src/ui';
import * as steps from './fixtures';
import Login from './components/Login';
import ResetAuth from './components/ResetAuth';
import RestorePassword from './components/RestorePassword';
import Registration from './components/Registration';
import ConfirmPhone from './components/ConfirmPhone';
import SmsCode from './components/SmsCode';
import GoogleAuth from './components/GoogleAuth';
import initGetParams from '../../../src/services/initialGetParams';

function AuthModal({ type, className, onClose, defaultEmail, onBack }) {
  const [currentStep, changeStep] = useState(type || steps.LOGIN);
  const [params, changeParams] = useState({});
  const [email, changeEmail] = useState(defaultEmail);
  const [password, changePassword] = useState('');

  const changeStepWithParams = (step, params) => {
    changeParams(params);
    changeStep(step);
  };

  const getCurrentContent = () => {
    switch (currentStep) {
      case steps.LOGIN:
        return <Login email={email} password={password} handleChange={handleChange} changeStep={changeStepWithParams} currentStep={currentStep} />;
      case steps.GOOGLE_AUTH:
        return <GoogleAuth params={params} email={email} password={password} handleChange={handleChange} changeStep={changeStepWithParams} currentStep={currentStep} />;
      case steps.RESET_AUTH:
      case steps.RESET_AUTH_SUCCESS:
        return <ResetAuth email={email} password={password} changeStep={changeStep} currentStep={currentStep} onClose={onBack} />;
      case steps.RESTORE_PASSWORD:
      case steps.RESTORE_PASSWORD_SUCCESS:
        return <RestorePassword changeStep={changeStep} currentStep={currentStep} onClose={onBack} />;
      case steps.REGISTRATION:
      case steps.REGISTRATION_SUCCESS:
        return <Registration changeStep={changeStep} currentStep={currentStep} onClose={onBack} />;
      case steps.CONFIRM_NUMBER:
        return <ConfirmPhone params={params} changeStep={changeStepWithParams} />
      case steps.CONFIRM_CODE:
        return <SmsCode changeStep={changeStep} params={params} />
      default:
        return <Login email={email} password={password} handleChange={handleChange} changeStep={changeStep} />;
    }
  };

  const handleChange = (value, type) => {
    if (type === 'email') {
      changeEmail(value);
    } else if (type === 'password') {
      changePassword(value);
    }
  };

  return (
    <UI.Modal
      isOpen={true}
      onClose={onClose}
      className={"AuthModal " + className}
    >

      {getCurrentContent()}

    </UI.Modal>
  )
}

export default React.memo(AuthModal);
