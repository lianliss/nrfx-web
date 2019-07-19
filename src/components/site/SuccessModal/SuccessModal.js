import './SuccessModal.less';

import React, { useState } from 'react';

import UI from '../../../ui';
import * as utils from '../../../utils';


function SuccessModal({ title, subtitle, onClose, onResend }) {
  const [timeRemaining, updateTiming] = useState(60);
  const [isRunning, setIsRunning] = useState(true);
  const [isActiveResend, activateResend] = useState(false);

  const handleResend = () => {
    onResend();
    updateTiming(60);
    setIsRunning(true);
    activateResend(false);
  }

  utils.useInterval(() => {
    if (timeRemaining === 0) {
      setIsRunning(false);
      activateResend(true);
    } else {
      updateTiming(timeRemaining - 1);
    }
  }, isRunning ? 1000 : null);

  return (
    <div className="SuccessModal">
      <div className="SuccessModal__content">
        <img src={require('../../../asset/site/success_tick.svg')} alt="Success" className="SuccessModal__tick" />

        {!!title && <p className="SuccessModal__content__title">{title}</p>}
        {!!subtitle && <p className="SuccessModal__content__msg">{subtitle}</p>}
      </div>

      <div className="SuccessModal__footer">
        <p
          onClick={isActiveResend ? handleResend : null}
          className={"SuccessModal__resend " + (isActiveResend ? "SuccessModal__resend__active" : "")}
        >
          {utils.getLang('site__authModalResend') + (!isActiveResend ? ` ${timeRemaining}s` : '')}
        </p>
        <UI.Button onClick={onClose}>{utils.getLang('site__authModalOk')}</UI.Button>
      </div>
    </div>
  )
}

export default React.memo(SuccessModal);