import './SuccessModal.less';

import React, { useState } from 'react';

import UI from '../../../ui';
import * as utils from '../../../utils';


function SuccessModal({ title, subtitle, onClose, onResend }) {
  const [timeRemaining, updateTiming] = useState(60);
  const [isRunning, setIsRunning] = useState(true);

  const handleResend = () => {
    updateTiming(60);
    onResend();
  }

  utils.useInterval(() => {
    if (timeRemaining === 0) {
      setIsRunning(false);
      onClose();
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
        <UI.Button onClick={handleResend}>{utils.getLang('site__authModalClose') + ` 0:${timeRemaining}`}</UI.Button>
      </div>
    </div>
  )
}

export default React.memo(SuccessModal);