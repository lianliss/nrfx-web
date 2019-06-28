import './SiteContactScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SiteWrapper from '../../../wrappers/Site/SiteWrapper';
import RecaptchaModal from '../../../components/site/RecaptchaModal/RecaptchaModal';
import { isEmail } from '../../../utils';
import UI from '../../../ui';


export default class SiteContactScreen extends BaseScreen {
  state = {
    login: '',
    email: '',
    message: '',
    isEmailValid: true,
    rows: 1,
  }

  handleTextareaChange = (e) => {
    const textareaLineHeight = 24;
    const currentRows = ~~(e.target.scrollHeight / textareaLineHeight);
    console.log('currentRows :', currentRows);

    this.setState({ rows: currentRows });

    this.handleChange(e.target.value, 'message');
  }

  handleChange = (value, key) => {
    if (key === 'email') {
      if (!isEmail(value)) {
        this.setState({
          isEmailValid: false,
        });
      }
    }

    this.setState({
      [key]: value,
    });
  }

  render() {
    const { login, email, message, isEmailValid, rows } = this.state;

    return (
      <SiteWrapper withOrangeBg>
        <div className="Layout_spacing">
          <h1 className="SiteContactScreen__heading">{this.lang.site.contactContactUs}</h1>

          <h2 className="SiteContactScreen__title">{this.lang.site.contactWriteLetter}</h2>
          <h4 className="SiteContactScreen__caption">{this.lang.site.contactWeContactYou}</h4>

          <div className="SiteContactScreen__form">
            <div className="SiteContactScreen__form__firstRow">
              <div className="SiteContactScreen__form__input__wrapper">
                <input 
                  className="SiteContactScreen__form__input"
                  placeholder={this.lang.site.contactYourName}
                  value={login}
                  onChange={(e) => this.handleChange(e.target.value, 'login')}  
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

            <div className="SiteContactScreen__form__secondRow">
              <div className="SiteContactScreen__form__input__wrapper">
                <textarea
                  className="SiteContactScreen__form__input"
                  placeholder={this.lang.site.contactMessage}
                  value={message}
                  onChange={this.handleTextareaChange}  
                  rows={rows}
                />
              </div>

              <RecaptchaModal className="Send_Button">
                <UI.Button rounded>{this.lang.site.contactSend}</UI.Button>
              </RecaptchaModal>
            </div>
          </div>

          <div className="SiteContactScreen__socials">
            <p className="SiteContactScreen__socials__title">{this.lang.site.contactOurSocialNetworks}</p>

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

          </div>
        </div>
      </SiteWrapper>
    )
  }
}
