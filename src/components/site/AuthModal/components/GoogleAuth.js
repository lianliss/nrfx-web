import React from 'react';

import UI from '../../../../ui';
import * as steps from '../fixtures';


function GoogleAuth({ changeStep }) {
  return (
    <>
      <h2 className="AuthModal__title">Log In</h2>

      <div className="AuthModal__content">
        <div className="AuthModal__input_wrapper">
          <UI.Input placeholder="Google Authenticator Code" />

          <img src={require('../asset/google_auth.svg')} alt="Google Auth" />
        </div>
        
        <h4 className="AuthModal__help_link" onClick={() => changeStep(steps.RESET_AUTH)}>
          Reset Authenticator Key
        </h4>
      </div>

      <div className="AuthModal__footer">
        <UI.Button>Submit</UI.Button>
      </div>
    </>
  )
}

export default React.memo(GoogleAuth);