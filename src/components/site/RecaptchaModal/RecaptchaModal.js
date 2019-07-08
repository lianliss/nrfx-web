import './RecaptchaModal.less';

import React from 'react';
import { ReCaptcha } from 'react-recaptcha-google'

import UI from '../../../ui';


class RecaptchaModal extends React.PureComponent {
  timer = null;
  state = {
    isOpen: false,
    verified: false,
  }

  componentDidMount() {
    if (this.captcha) {
      this.captcha.reset();
    }
  }

  onLoadRecaptcha = () => {
    if (this.captcha) {
      this.captcha.reset();
    }
  }

  verifyCallback = (recaptchaToken) => {
    // Here you will get the final recaptchaToken!!!  
    console.log(recaptchaToken, "<= your recaptcha token");
    this.props.onVerify(recaptchaToken);
    this.setState({
      verified: true,
    });
    this.timer = setTimeout(() => this.setState({ isOpen: false, verified: false }), 1000);
  }

  toggleModal = (isOpen) => {
    this.setState({ isOpen });
  }

  render() {
    const { className, children, disabled } = this.props;
    const { verified } = this.state;
  
    return (
      <div className={"RecaptchaModal " + className}>
        <span className={disabled ? "disabled-btn" : ""} onClick={() => !disabled ? this.toggleModal(true) : null}>
          {children}
        </span>
  
        <UI.Modal
          isOpen={this.state.isOpen}
          onClose={() => this.toggleModal(false)}
        >
          <div className="RecaptchaModal__content">

            {!verified 
              ? (
                <div className="RecaptchaModal__recaptcha_wrapper">
                  <ReCaptcha
                    ref={(el) => { this.captcha = el; }}
                    size="normal"
                    render="explicit"
                    sitekey="6LeuvZIUAAAAAHyn4R0mUwHjpUJKA4luAT-PJWwn"
                    onloadCallback={this.onLoadRecaptcha}
                    verifyCallback={this.verifyCallback}
                  />
                </div>

              ) : (
                <div className="RecaptchaModal__success">
                  <img src={require('../../../asset/site/success_tick.svg')} alt="Success" />

                  <p>Successfully sent!</p>                  
                </div>
              )}
          </div>
  
  
        </UI.Modal>
      </div>
    )
  }
}

export default React.memo(RecaptchaModal);