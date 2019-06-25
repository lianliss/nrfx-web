import React from 'react';

import UI from '../../../../ui';


function RestorePasswordSuccess({ onClose }) {
  return (
    <>
      <h2 className="AuthModal__title">Registration</h2>

      <div className="AuthModal__content">
        <img src={require('../../../../asset/site/success_tick.svg')} alt="Success" className="AuthModal__tick" />

        <p className="AuthModal__content__title">Your Registration Successfully Done!</p>
        <p className="AuthModal__content__msg">Please Check Your Email to Complete!</p>
      </div>

      <div className="AuthModal__footer">
        <UI.Button onClick={onClose}>Close</UI.Button>
      </div>
    </>
  )
}

export default React.memo(RestorePasswordSuccess);