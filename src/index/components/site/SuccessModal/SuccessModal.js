import './SuccessModal.less';

import React from 'react';

import UI from '../../../../ui';
import * as utils from '../../../../utils';
import Resend from '../Resend/Resend';


function SuccessModal({ title, subtitle, onClose, onResend }) {
  return (
    <div className="SuccessModal">
      <div className="SuccessModal__content">
        <img src={require('../../../../asset/site/success_tick.svg')} alt="Success" className="SuccessModal__tick" />

        {!!title && <p className="SuccessModal__content__title">{title}</p>}
        {!!subtitle && <p className="SuccessModal__content__msg">{subtitle}</p>}
      </div>

      <div className="Resend__footer">
        {!!onResend && <Resend onResend={onResend} />}
        <UI.Button fontSize={15} onClick={onClose}>{utils.getLang('site__authModalOk')}</UI.Button>
      </div>
    </div>
  )
}

export default React.memo(SuccessModal);