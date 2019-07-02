import React from 'react';

import UI from '../../../../ui';
import * as utils from '../../../../utils';
import * as steps from '../fixtures';
import SuccessModal from '../../SuccessModal/SuccessModal';


function RestorePassword({ changeStep, currentStep, onClose }) {
  return (
    <>
      <h2 className="AuthModal__title">{utils.getLang('site__authModalRestorePwd')}</h2>

      {currentStep === steps.RESTORE_PASSWORD
        ? (
          <>
            <div className="AuthModal__content">
              <UI.Input placeholder={utils.getLang('site__authModalPlaceholderEmail')} />
            </div>

            <div className="AuthModal__footer">
              <UI.Button onClick={() => changeStep(steps.RESTORE_PASSWORD_SUCCESS)}>{utils.getLang('site__authModalSend')}</UI.Button>
            </div>
          </>
        ) : (
          <SuccessModal
            onClose={onClose}
            onResend={() => {}}
            subtitle={utils.getLang('site__authModalCheckEmailRestorePwd')}
          />
        )}

    </>
  )
}

export default React.memo(RestorePassword);