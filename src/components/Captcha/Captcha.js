import "./Captcha.less";

import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import company from "src/index/constants/company";

export default React.forwardRef((props, ref) => (
  <div className="Captcha">
    <ReCAPTCHA
      ref={ref}
      sitekey={company.reCaptchaSiteKey}
      onChange={props.onChange}
    />
  </div>
));
