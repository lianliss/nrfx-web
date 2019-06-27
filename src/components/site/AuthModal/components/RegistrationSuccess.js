import React from 'react';

import UI from '../../../../ui';
import * as utils from "../../../../utils";


function RestorePasswordSuccess({ onClose }) {
  return (
    <>
      <h2 className="AuthModal__title">{utils.getLang('site__authModalRegistration')}</h2>

      <div className="AuthModal__content">
        <img src={require('../../../../asset/site/success_tick.svg')} alt="Success" className="AuthModal__tick" />

        <p className="AuthModal__content__title">{utils.getLang('site__authModalRegDone')}</p>
        <p className="AuthModal__content__msg">{utils.getLang('site__authModalCheckMailDone')}</p>
      </div>

      <div className="AuthModal__footer">
        <UI.Button onClick={onClose}>{utils.getLang('site__authModalClose')}</UI.Button>
      </div>
    </>
  )
}

export default React.memo(RestorePasswordSuccess);