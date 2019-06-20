import React from 'react';

import UI from '../../../../ui';


function ResetAuth() {
  return (
    <>
      <h2 className="AuthModal__title">Reset Authenticator</h2>

      <div className="AuthModal__content">
        <UI.Input placeholder="Secret Key" />
      </div>

      <div className="AuthModal__footer">
        <UI.Button>Submit</UI.Button>
      </div>
    </>
  )
}

export default React.memo(ResetAuth);