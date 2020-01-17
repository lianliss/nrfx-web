import './SiteContactScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import COMPANY from '../../../constants/company';
import { isEmail } from '../../../../utils';
import UI from '../../../../ui';
import TitleWithBg from '../../../components/site/TitleWithBg/TitleWithBg';
import SVG from 'react-inlinesvg';
import MobileAppBanner from '../../../components/site/MobileAppBanner/MobileAppBanner';

const SnItem = props => {
  return props.link ? (
    <UI.ContentBox onClick={() => {
      window.open("https://" + props.link)
    }} className="SiteContactScreen__sn__item">
      <SVG src={props.icon}/>
      <div className="SiteContactScreen__sn__item__content">
        <h3>{props.title}</h3>
        <a href={"https://" + props.link}>{props.link.replace('https://', '')}</a>
      </div>
    </UI.ContentBox>
  ) : null;
};


export default class SiteContactScreen extends BaseScreen {
  state = {
    name: '',
    email: '',
    message: '',
    isEmailValid: true,
    rows: 3,
  };

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
  };

  render() {
    return (
      <div>
        <div className="SiteContactScreen Layout_spacing">
          <h1 className="SiteContactScreen__heading">{this.lang.site.contactContactUs}</h1>
          <div className="SiteContactScreen__content">
            <TitleWithBg title={this.lang.site.contactSubTitle} bgTitle={this.lang.site.contactSubTitleBackground} centered />
            <p className="SiteContactScreen__description">{this.lang.site.contactDescription}</p>

            <div className="SiteContactScreen__link_list">
              <UI.ContentBox onClick={() => {window.jivo_api && window.jivo_api.open()}} className="SiteContactScreen__link_item">
                <SVG src={require('../../../../asset/120/chat.svg')}/>
                <h3 className="SiteContactScreen__link_item__title">{this.lang.site.contactChatTitle}</h3>
                <p>{this.lang.site.contactChatDescription}</p>
              </UI.ContentBox>

              <UI.ContentBox onClick={() => window.open(COMPANY.faqUrl)} className="SiteContactScreen__link_item">
                <SVG src={require('../../../../asset/120/info.svg')}/>
                <h3 className="SiteContactScreen__link_item__title">{this.lang.site.contactFaqTitle}</h3>
                <p>{this.lang.site.contactFaqDescription}</p>
              </UI.ContentBox>

              <UI.ContentBox onClick={() => {window.location.href = `mailto:${COMPANY.email.support}`}} className="SiteContactScreen__link_item">
                <SVG src={require('../../../../asset/120/email_success.svg')}/>
                <h3 className="SiteContactScreen__link_item__title">{this.lang.site.contactEmailTitle}</h3>
                <h2><a href={`mailto:${COMPANY.email.support}`}>{COMPANY.email.support}</a></h2>
                <p>{this.lang.site.contactEmailDescription}</p>
              </UI.ContentBox>

              <UI.ContentBox className="SiteContactScreen__link_item disabled">
                <SVG src={require('../../../../asset/120/code.svg')}/>
                <h3 className="SiteContactScreen__link_item__title">{this.lang.site.contactApiTitle}</h3>
                <p>{this.lang.site.contactApiDescription}</p>
              </UI.ContentBox>
            </div>

            <TitleWithBg title={this.lang.site.contactSocialNetworksTitle} bgTitle={this.lang.site.contactSocialNetworksTitleBackground} centered />

            <div className="SiteContactScreen__sn">
              <SnItem
                icon={require('../../../../asset/social/vk.svg')}
                title={this.lang.global_social_vkontakte}
                link={COMPANY.social.vk}
              />
              <SnItem
                icon={require('../../../../asset/social/facebook.svg')}
                title={this.lang.global_social_facebook}
                link={COMPANY.social.facebook}
              />
              <SnItem
                icon={require('../../../../asset/social/instagram.svg')}
                title={this.lang.global_social_instagram}
                link={COMPANY.social.instagram}
              />
              <SnItem
                icon={require('../../../../asset/social/twitter.svg')}
                title={this.lang.global_social_twitter}
                link={COMPANY.social.twitter}
              />
              <SnItem
                icon={require('../../../../asset/social/telegram.svg')}
                title={this.lang.global_social_telegram}
                link={COMPANY.social.telegram}
              />
            </div>

            <TitleWithBg title={this.lang.site.contactTelegramTitle} bgTitle={this.lang.site.contactTelegramTitleBackground} centered />

            <div className="SiteContactScreen__sn">
              <SnItem
                icon={require('../../../../asset/social/telegram.svg')}
                title="Русский"
                link="t.me/Narfex_ru"
              />
              <SnItem
                icon={require('../../../../asset/social/telegram.svg')}
                title="English"
                link="t.me/Narfex_en"
              />
              <SnItem
                icon={require('../../../../asset/social/telegram.svg')}
                title="Indonesian"
                link="bit.ly/bbproidn"
              />
            </div>

          </div>
        </div>
        <MobileAppBanner />
      </div>
    )
  }
}
