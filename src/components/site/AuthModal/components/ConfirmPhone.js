import React, { useState } from 'react';

import UI from '../../../../ui';
import * as utils from '../../../../utils';
import * as steps from '../fixtures';
import countries from '../../../../constants/countries.json';
import { sendSmsCode } from '../../../../actions/auth';


const codes = countries.map(country => ({
  title: <span className="AuthModal__Phone__dropdown" key={country.code}>
    <img src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/4x3/${country.code.toLowerCase()}.svg`} alt={country.name} />
    {country.dial_code}
  </span>,
  value: country.code,
}));

function ConfirmPhone({ changeStep, params }) {
  const currentCode = codes.find(c => {
    const dialCode = c.title.props.children[1];
    return dialCode === params.phoneCode;
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [countryCode, changeCode] = useState(currentCode);
  const [number, changeNumber] = useState(params.phoneNumber);

  const handleSubmit = () => {
    sendSmsCode(countryCode, number, params.googleCode)
      .then(() => {
        setErrorMsg('');
        changeStep(steps.CONFIRM_CODE, { countryCode, number });
      })
      .catch((err) => setErrorMsg(err.message));
  }

  const handleNumberFocus = (e) => {
    if (number === params.phoneNumber) {
      changeNumber('');
    }
  }

  return (
    <div className="AuthModal__Phone">
      <h2 className="AuthModal__title">{utils.getLang('site__authModalConfirmNumber')}</h2>

      <div className="AuthModal__content">
        {errorMsg
          ? <p className="AuthModal__err_msg">{errorMsg}</p>
          : null}

        <div className="AuthModal__inputs__wrapper">
          <UI.Dropdown
            value={countryCode}
            options={codes}
            onChange={(value) => changeCode(value)}
            placeholder={utils.getLang('site__authModalSecretKey')}
          />

          <UI.Input
            value={number}
            onChange={(e) => changeNumber(e.target.value)}
            onFocus={handleNumberFocus}
            onKeyPress={(e) => e.key === 'Enter' ? handleSubmit() : null}
          />
        </div>
      </div>

      <div className="AuthModal__footer">
        <UI.Button onClick={handleSubmit}>{utils.getLang('site__authModalSendCode')}</UI.Button>
      </div>
    </div>
  )
}

export default React.memo(ConfirmPhone);