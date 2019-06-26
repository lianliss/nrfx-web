import './RecaptchaModal.less';

import React from 'react';
import { ReCaptcha } from 'react-recaptcha-google'

import UI from '../../../ui';


class RecaptchaModal extends React.PureComponent {
  state = {
    isOpen: false,
  }

  componentDidMount() {
    if (this.captcha) {
      console.log("started, just a second...")
      this.captcha.reset();
      // this.captcha.execute();
    }
  }

  onLoadRecaptcha = () => {
    if (this.captcha) {
      this.captcha.reset();
      // this.captcha.execute();
    }
  }

  verifyCallback = (recaptchaToken) => {
    // Here you will get the final recaptchaToken!!!  
    console.log(recaptchaToken, "<= your recaptcha token")
  }

  toggleModal = (isOpen) => {
    this.setState({ isOpen });
  }

  render() {
    const { className, children } = this.props;
  
    return (
      <div className={"RecaptchaModal " + className}>
        <span onClick={() => this.toggleModal(true)}>
          {children}
        </span>
  
        <UI.Modal
          isOpen={this.state.isOpen}
          onClose={() => this.toggleModal(false)}
        >

          <div className="RecaptchaModal__content">
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

            <UI.Button rounded>Submit</UI.Button>
          </div>
  
  
        </UI.Modal>
      </div>
    )
  }
}

export default React.memo(RecaptchaModal);