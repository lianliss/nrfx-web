import './SiteContactScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SiteWrapper from '../../../wrappers/Site/SiteWrapper';
import RecaptchaModal from '../../../components/site/RecaptchaModal/RecaptchaModal';
import { sendContactForm } from '../../../actions/contact';
import { isEmail } from '../../../utils';
import UI from '../../../ui';


export default class SiteContactScreen extends BaseScreen {
  state = {
    name: '',
    email: '',
    message: '',
    isEmailValid: true,
    rows: 3,
  }

  handleTextareaChange = (e) => {
    const textareaLineHeight = 22;
    const currentRows = ~~(e.target.scrollHeight / textareaLineHeight);

    this.setState({ rows: currentRows });

    this.handleChange(e.target.value, 'message');
  }

  handleChange = (value, key) => {
    const { isEmailValid } = this.state;

    if (key === 'email') {
      if (!isEmail(value)) {
        this.setState({
          isEmailValid: false,
        });
      } else if (!isEmailValid) {
        this.setState({
          isEmailValid: true,
        });
      }
    }

    this.setState({
      [key]: value,
    });
  }

  handleSubmit = (recaptchaToken) => {
    const { name, email, message } = this.state;

    sendContactForm(recaptchaToken, message, email, name);
  }

  render() {
    const { name, email, message, isEmailValid, rows } = this.state;
    const isSubmitDisabled = !isEmailValid || !email || !message;

    return (
      <SiteWrapper withOrangeBg>
        <div className="SiteContactScreen Layout_spacing">
          <h1 className="SiteContactScreen__heading">{this.lang.site.contactContactUs}</h1>

          <h2 className="SiteContactScreen__title">{this.lang.site.contactWriteLetter}</h2>
          <h4 className="SiteContactScreen__caption">{this.lang.site.contactWeContactYou}</h4>

          <div className="SiteContactScreen__form">
            <div className="SiteContactScreen__form__firstRow">
              <div className="SiteContactScreen__form__input__wrapper">
                <input 
                  className="SiteContactScreen__form__input"
                  placeholder={this.lang.site.contactYourName}
                  value={name}
                  onChange={(e) => this.handleChange(e.target.value, 'name')}  
                />
              </div>

              <div className="SiteContactScreen__form__input__wrapper">
                <input 
                  className="SiteContactScreen__form__input"
                  placeholder={this.lang.site.contactEmail}
                  value={email}
                  onChange={(e) => this.handleChange(e.target.value, 'email')}  
                />
                {!isEmailValid ? <p className="SiteContactScreen__form__input__err">Please enter a valid e-mail</p> : null}
              </div>
            </div>

            <div className="SiteContactScreen__form__input__wrapper">
              <textarea
                className="SiteContactScreen__form__input"
                placeholder={this.lang.site.contactMessage}
                value={message}
                onChange={this.handleTextareaChange}  
                rows={rows}
              />
            </div>

            <div className="SiteContactScreen__form__footer">
              <div className="SiteContactScreen__socials__icons">
                <a href="#" className="SiteContactScreen__social">
                  <img src={require('./asset/facebook.svg')} alt="Social icon" />
                </a>
                <a href="#" className="SiteContactScreen__social">
                  <img src={require('./asset/twitter.svg')} alt="Social icon" />
                </a>
                <a href="#" className="SiteContactScreen__social">
                  <img src={require('./asset/instagram.svg')} alt="Social icon" />
                </a>
                <a href="#" className="SiteContactScreen__social">
                  <img src={require('./asset/youtube.svg')} alt="Social icon" />
                </a>
                <a href="#" className="SiteContactScreen__social">
                  <img src={require('./asset/telegram.svg')} alt="Social icon" />
                </a>
              </div>

              <RecaptchaModal disabled={isSubmitDisabled} className="Send_Button" onVerify={this.handleSubmit}>
                <UI.Button rounded>{this.lang.site.contactSend}</UI.Button>
              </RecaptchaModal>
            </div>
          </div>

        </div>
      </SiteWrapper>
    )
  }
}
