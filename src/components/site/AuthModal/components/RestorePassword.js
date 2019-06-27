import React from 'react';

import UI from '../../../../ui';
import * as utils from "../../../../utils";
import * as steps from '../fixtures';


function RestorePassword({ changeStep }) {
  return (
    <>
      <h2 className="AuthModal__title">{utils.getLang('site__authModalRestorePwd')}</h2>

      <div className="AuthModal__content">
        <UI.Input placeholder={utils.getLang('site__authModalPlaceholderEmail')} />
      </div>

      <div className="AuthModal__footer">
        <UI.Button onClick={() => changeStep(steps.RESTORE_PASSWORD_SUCCESS)}>{utils.getLang('site__authModalSend')}</UI.Button>
      </div>
    </>
  )
}

export default React.memo(RestorePassword);