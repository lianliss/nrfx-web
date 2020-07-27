import React, { useState } from "react";

import * as UI from "src/ui";
import * as utils from "utils";
import Resend from "src/index/components/site/Resend/Resend";
import * as PAGES from "src/index/constants/pages";
import { checkSmsCode } from "actions/auth";

function SmsCode({ changeStep, params }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [code, changeCode] = useState("");
  const { countryCode, number } = params;

  const handleSubmit = () => {
    checkSmsCode(countryCode, number, code)
      .then(() => {
        setErrorMsg("");
        setTimeout(() => (window.location = "/" + PAGES.PARTNERS), 100);
      })
      .catch(err => setErrorMsg(err.message));
  };

  return (
    <div className="AuthModal__Phone">
      <UI.ModalHeader>
        {utils.getLang("site__authModalEnterCodeSMS")}
      </UI.ModalHeader>

      <div className="AuthModal__content">
        {errorMsg ? <p className="AuthModal__err_msg">{errorMsg}</p> : null}

        <UI.Input
          placeholder={utils.getLang("site__authModalEnterCode")}
          value={code}
          onChange={e => changeCode(e.target.value)}
          onKeyPress={e => (e.key === "Enter" ? handleSubmit() : null)}
        />
      </div>

      <div className="Resend__footer">
        <Resend onResend={handleSubmit} />
        <UI.Button fontSize={15} onClick={handleSubmit}>
          {utils.getLang("site__authModalConfirm")}
        </UI.Button>
      </div>
    </div>
  );
}

export default React.memo(SmsCode);
