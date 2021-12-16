import React, { useState } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";

import * as UI from "../../../ui";
import * as steps from "../fixtures";
import * as utils from "../../../utils";
import { getGoogleCode } from "../../../actions/auth";
import router from "../../../router";
import * as pages from "../../../index/constants/pages";
import * as adminPages from "../../../admin/constants/pages";
import SVG from "utils/svg-wrap";

function GoogleAuth({ changeStep, email, password }) {
  const [gaCode, changeGaCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = code => {
    const googleCode = code ? code : gaCode;
    setPending(true);
    setErrorMsg("");

    getGoogleCode(email, password, googleCode)
      .then(data => {
        if (data.status === "phone_not_verified") {
          changeStep(steps.CONFIRM_NUMBER, {
            phoneCode: data.phone_code,
            phoneNumber: data.phone_number,
            googleCode
          });
        } else if (process.env.DOMAIN === "admin") {
          router.navigate(adminPages.PANEL);
        } else {
          router.navigate(
            router.getState().name === pages.EXCHANGE
              ? pages.EXCHANGE
              : pages.WALLET
          );

          logEvent(getAnalytics(), "auth");
        }
      })
      .catch(err => setErrorMsg(err.message))
      .finally(() => {
        setPending(false);
      });
  };

  const handleChange = e => {
    const val = e.target.value;

    if (val.length <= 6) {
      changeGaCode(val);
    }

    if (val.length === 6) {
      handleSubmit(val);
    }
  };

  return (
    <div className="AuthModal__ga">
      <UI.ModalHeader>{utils.getLang("site__authModalLogIn")}</UI.ModalHeader>

      <div className="AuthModal__content">
        {errorMsg ? <p className="AuthModal__err_msg">{errorMsg}</p> : null}

        <UI.Input
          autoFocus
          type="code"
          cell
          mouseWheel={false}
          autoComplete="off"
          value={gaCode}
          onChange={handleChange}
          placeholder={utils.getLang("site__authModalGAPlaceholder")}
          indicator={<SVG src={require("../../../asset/google_auth.svg")} />}
        />

        <h4
          className="AuthModal__help_link"
          onClick={() => changeStep(steps.RESET_AUTH)}
        >
          {utils.getLang("site__authModalResetKey")}
        </h4>
      </div>

      <div className="AuthModal__footer">
        <UI.Button
          fontSize={15}
          onClick={() => handleSubmit()}
          state={pending && "loading"}
          disabled={gaCode.length < 6}
        >
          {utils.getLang("site__authModalSubmit")}
        </UI.Button>
      </div>
    </div>
  );
}

export default React.memo(GoogleAuth);
