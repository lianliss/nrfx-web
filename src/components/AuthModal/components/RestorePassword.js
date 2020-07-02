import React, { useState, useCallback } from "react";

import * as UI from "src/ui";
import * as utils from "utils";
import * as steps from "../fixtures";
import SuccessModal from "src/index/components/site/SuccessModal/SuccessModal";
import { resetPassword } from "actions/auth";

function RestorePassword({ changeStep, currentStep, onClose }) {
  const [email, onChange] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [restorePasswordPending, setRestorePasswordPending] = useState(false);

  const handleSubmit = useCallback(() => {
    setRestorePasswordPending(true);
    resetPassword(email)
      .then(() => changeStep(steps.RESTORE_PASSWORD_SUCCESS))
      .catch(err => setErrorMsg(err.message))
      .finally(() => {
        setRestorePasswordPending(false);
      });
  }, [setRestorePasswordPending, changeStep, setErrorMsg, email]);

  return (
    <>
      <UI.ModalHeader>
        {utils.getLang("site__authModalRestorePwd")}
      </UI.ModalHeader>

      {currentStep === steps.RESTORE_PASSWORD ? (
        <>
          <div className="AuthModal__content">
            {errorMsg ? <p className="AuthModal__err_msg">{errorMsg}</p> : null}

            <UI.Input
              autoFocus
              value={email}
              onChange={e => onChange(e.target.value)}
              placeholder={utils.getLang("site__authModalPlaceholderEmail")}
              onKeyPress={e => (e.key === "Enter" ? handleSubmit() : null)}
            />
          </div>

          <div className="AuthModal__footer">
            <UI.Button
              state={restorePasswordPending && "loading"}
              fontSize={15}
              onClick={handleSubmit}
            >
              {utils.getLang("site__contactSend")}
            </UI.Button>
          </div>
        </>
      ) : (
        <SuccessModal
          onClose={onClose}
          onResend={handleSubmit}
          subtitle={utils.getLang("site__authModalCheckEmailRestorePwd")}
        />
      )}
    </>
  );
}

export default React.memo(RestorePassword);
