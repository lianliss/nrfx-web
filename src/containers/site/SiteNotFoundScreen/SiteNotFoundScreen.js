import './SiteNotFoundScreen.less';

import React from 'react';
import { Helmet } from 'react-helmet';

import BaseScreen from '../../BaseScreen';
import RecaptchaModal from '../../../components/site/RecaptchaModal/RecaptchaModal';
import { isEmail, getLang } from '../../../utils';
import UI from '../../../ui';


export default class SiteNotFoundScreen extends BaseScreen {
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
  }

  render() {
    const { name, email, message, isEmailValid, rows } = this.state;
    const isSubmitDisabled = !isEmailValid || !email || !message;

    return (
      <div>
        <Helmet>
          <meta title="" content="" />
        </Helmet>

        <div className="SiteNotFoundScreen Layout_spacing">
          <div className="SiteNotFoundScreen__heading">
            <h1>404</h1>
            <h2>{getLang('site__siteNotFound')}</h2>
          </div>

          <h2 className="SiteNotFoundScreen__title">{this.lang.site.contactWriteLetter}</h2>
          <h4 className="SiteNotFoundScreen__caption">{this.lang.site.contactWeContactYou}</h4>

          <div className="SiteNotFoundScreen__form">
            <div className="SiteNotFoundScreen__form__firstRow">
              <div className="SiteNotFoundScreen__form__input__wrapper">
                <input 
                  className="SiteNotFoundScreen__form__input"
                  placeholder={this.lang.site.contactYourName}
                  value={name}
                  onChange={(e) => this.handleChange(e.target.value, 'name')}  
                />
              </div>

              <div className="SiteNotFoundScreen__form__input__wrapper">
                <input 
                  className="SiteNotFoundScreen__form__input"
                  placeholder={this.lang.site.contactEmail}
                  value={email}
                  onChange={(e) => this.handleChange(e.target.value, 'email')}  
                />
                {!isEmailValid ? <p className="SiteNotFoundScreen__form__input__err">{getLang('site__siteEnterValidMail')}</p> : null}
              </div>
            </div>

            <div className="SiteNotFoundScreen__form__input__wrapper">
              <textarea
                className="SiteNotFoundScreen__form__input"
                placeholder={this.lang.site.contactMessage}
                value={message}
                onChange={this.handleTextareaChange}  
                rows={rows}
              />
            </div>

            <div className="SiteNotFoundScreen__form__footer">
              <div className="SiteNotFoundScreen__socials__icons">
                <a href="#" className="SiteNotFoundScreen__social">
                  <img src={require('./asset/facebook.svg')} alt="Social icon" />
                </a>
                <a href="#" className="SiteNotFoundScreen__social">
                  <img src={require('./asset/twitter.svg')} alt="Social icon" />
                </a>
                <a href="#" className="SiteNotFoundScreen__social">
                  <img src={require('./asset/instagram.svg')} alt="Social icon" />
                </a>
                <a href="#" className="SiteNotFoundScreen__social">
                  <img src={require('./asset/youtube.svg')} alt="Social icon" />
                </a>
                <a href="#" className="SiteNotFoundScreen__social">
                  <img src={require('./asset/telegram.svg')} alt="Social icon" />
                </a>
              </div>

              <RecaptchaModal disabled={isSubmitDisabled} className="Send_Button" onVerify={this.handleSubmit}>
                <UI.Button rounded>{this.lang.site.contactSend}</UI.Button>
              </RecaptchaModal>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
