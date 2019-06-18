import './SiteContactScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SiteWrapper from '../../../wrappers/Site/SiteWrapper';
import UI from '../../../ui';


export default class SiteContactScreen extends BaseScreen {
  render() {
    return (
      <SiteWrapper withOrangeBg>
        <h1 className="SiteContactScreen__heading">Связаться с нами</h1>


        <h2 className="SiteContactScreen__title">Написать письмо</h2>
        <h4 className="SiteContactScreen__caption">Мы свяжемся с вами по электронной почте очень скоро!</h4>

        <div className="SiteContactScreen__form">
          <div className="SiteContactScreen__form__firstRow">
            <input className="SiteContactScreen__form__input" placeholder="Логин" />
            <input className="SiteContactScreen__form__input" placeholder="E-mail" />
          </div>
          <div className="SiteContactScreen__form__secondRow">
            <input className="SiteContactScreen__form__input" placeholder="Сообщение" />
            <UI.Button rounded>Отправить</UI.Button>
          </div>
        </div>


        <div className="SiteContactScreen__socials">
          <p className="SiteContactScreen__socials__title">Наши социальные сети</p>

          <div className="SiteContactScreen__socials__icons">
            <a href="#" className="SiteContactScreen__social">
              <img src={require('./asset/facebook.svg')} alt="Social icon" />
            </a>
            <a href="#" className="SiteContactScreen__social">
              <img src={require('./asset/twitter.svg')} alt="Social icon" />
            </a>
            <a href="#" className="SiteContactScreen__social">
              <img src={require('./asset/instagram.png')} alt="Social icon" />
            </a>
            <a href="#" className="SiteContactScreen__social">
              <img src={require('./asset/youtube.svg')} alt="Social icon" />
            </a>
            <a href="#" className="SiteContactScreen__social">
              <img src={require('./asset/telegram.svg')} alt="Social icon" />
            </a>
          </div>
        </div>


      </SiteWrapper>
    )
  }
}
