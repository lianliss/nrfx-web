import React from 'react';

import UI from '../../../../ui';
import * as steps from '../fixtures';


function RestorePassword({ changeStep }) {
  return (
    <>
      <h2 className="AuthModal__title">Restore Password</h2>

      <div className="AuthModal__content">
        <UI.Input placeholder="Email" />
      </div>

      <div className="AuthModal__footer">
        <UI.Button onClick={() => changeStep(steps.RESTORE_PASSWORD_SUCCESS)}>Send</UI.Button>
      </div>
    </>
  )
}

export default React.memo(RestorePassword);