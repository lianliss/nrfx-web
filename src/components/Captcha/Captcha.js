import './Captcha.less'

import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import company from "src/index/constants/company";

export default props => (
  <div className="Captcha">
    <ReCAPTCHA
      sitekey={company.reCaptchaSiteKey}
      onChange={props.onChange}
    />
  </div>
)
