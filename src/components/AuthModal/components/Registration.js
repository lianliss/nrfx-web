import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import UI from 'src/ui';
import * as steps from '../fixtures';
import * as utils from 'src/utils';
import * as actions from 'src/actions';
import { registerUser } from 'src/actions/auth';
import SuccessModal from 'src/index/components/site/SuccessModal/SuccessModal';
import initGetParams from 'src/services/initialGetParams';
import { registrationSetValue } from 'src/actions/index';
import Captcha from '../../Captcha/Captcha';
import * as pages from 'src/index/constants/pages';

function Registration({ changeStep, currentStep, email, onClose, refParam, referrer, registrationSetValue }) {

  const [isChecked, toggleCheck] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [token, setToken] = useState(null);
  const captchaRef = useRef();
  const isProduction = utils.isProduction();
  const disabled = utils.isProduction() ? (!token || !email) : !email;

  const handleSubmit = () => {
    if (!email) {
      setErrorMsg(utils.getLang('site__authModalEmailRequired'));
    } else if (!utils.isEmail(email)) {
      setErrorMsg(utils.getLang('global_InvalidEmail'));
    } else if (!isChecked) {
      setErrorMsg(utils.getLang('site__authModalTermsConditionsAccept'));
    } else {
      let inviteLink = initGetParams.params.i;
      registerUser(email.trim(), (refParam || referrer), inviteLink, token)
        .then(({ hash }) => {
          if (hash) {
            window.location.href = '/' + pages.REGISTER + '?hash=' + hash;
            // router.navigate(pages.REGISTER, { hash });
          } else {
            changeStep(steps.REGISTRATION_SUCCESS);
          }
        })
        .catch((err) => {
          if (isProduction) {
            captchaRef.current.props.grecaptcha.reset();
          }
          setErrorMsg(err.message);
        });
    }
  };

  const handleClose = () => {
    registrationSetValue('email', '');
    registrationSetValue('referrer', '');
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleChange = property => value => {
    registrationSetValue(property, value);
  };

  return (
    <div className="RegisterModal">
      <UI.ModalHeader>{utils.getLang("site__authModalRegistration")}</UI.ModalHeader>

      {currentStep === steps.REGISTRATION
        ? (
          <>
            <div className="AuthModal__content">
              {errorMsg
                ? <p className="AuthModal__err_msg">{errorMsg}</p>
                : null}

              <UI.Input
                placeholder={utils.getLang('site__authModalPlaceholderEmail')}
                value={email}
                onTextChange={handleChange('email')}
                onKeyPress={handleKeyPress}
              />

              <UI.Input
                disabled={refParam}
                value={refParam || referrer}
                placeholder={utils.getLang('site__authModalPlaceholderReferrer')}
                onTextChange={handleChange('referrer')}
                onKeyPress={handleKeyPress}
              />

              { isProduction && <Captcha ref={captchaRef} onChange={setToken} /> }

              <div className="AuthModal__content__terms">
                <UI.CheckBox checked={isChecked} onChange={() => toggleCheck(!isChecked)} />
                <span onClick={ () => actions.openModal('static_content', {type: "terms"})} className="AuthModal__content__terms__link">{utils.getLang('site__authModalTermsConditions')}</span>
              </div>
            </div>

            <div className="AuthModal__footer">
              <h4 className="AuthModal__footer__link" onClick={() => changeStep(steps.LOGIN)}>{utils.getLang('site__authModalLogInBtn')}</h4>
              <UI.Button disabled={disabled} fontSize={15} onClick={handleSubmit}>{utils.getLang('site__authModalNext')}</UI.Button>
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

export default React.memo(connect(state => ({
  email: state.default.registration.email,
  referrer: state.default.registration.referrer,
  refParam: state.default.registration.refParam,
}), {
  registrationSetValue
})(Registration));
