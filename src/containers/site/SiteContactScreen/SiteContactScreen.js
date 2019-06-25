import './SiteContactScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SiteWrapper from '../../../wrappers/Site/SiteWrapper';
import UI from '../../../ui';


export default class SiteContactScreen extends BaseScreen {
  render() {
    return (
      <SiteWrapper withOrangeBg>
        <div className="Layout_spacing">
          <h1 className="SiteContactScreen__heading">{this.lang.site.contactContactUs}</h1>

          <h2 className="SiteContactScreen__title">{this.lang.site.contactWriteLetter}</h2>
          <h4 className="SiteContactScreen__caption">{this.lang.site.contactWeContactYou}</h4>

          <div className="SiteContactScreen__form">
            <div className="SiteContactScreen__form__firstRow">
              <input className="SiteContactScreen__form__input" placeholder={this.lang.site.contactLogin} />
              <input className="SiteContactScreen__form__input" placeholder={this.lang.site.contactEmail} />
            </div>
            <div className="SiteContactScreen__form__secondRow">
              <input className="SiteContactScreen__form__input" placeholder={this.lang.site.contactMessage} />
              <UI.Button rounded>{this.lang.site.contactSend}</UI.Button>
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
