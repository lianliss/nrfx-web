import './SiteContactScreen.less';

import React from 'react';
import { Helmet } from 'react-helmet';

import BaseScreen from '../../BaseScreen';
import RecaptchaModal from '../../../components/site/RecaptchaModal/RecaptchaModal';
import { isEmail } from '../../../../utils';
import UI from '../../../../ui';
import TitleWithBg from '../../../components/site/TitleWithBg/TitleWithBg';
import SVG from 'react-inlinesvg';
import MobileAppBanner from '../../../components/site/MobileAppBanner/MobileAppBanner';
import router from '../../../../router';
import * as PAGES from '../../../constants/pages';


const SnItem = props => (
  <UI.ContentBox onClick={() => {
    window.open("https://" + props.link)
  }} className="SiteContactScreen__sn__item">
    <SVG src={props.icon} />
    <div className="SiteContactScreen__sn__item__content">
      <h3>{props.title}</h3>
      <a href={"https://" + props.link}>{props.link}</a>
    </div>
  </UI.ContentBox>
);


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

  handleSubmit = (recaptchaToken) => {
    //const { name, email, message } = this.state;
  };

  render() {
    const { name, email, message, isEmailValid, rows } = this.state;
    const isSubmitDisabled = !isEmailValid || !email || !message;

    return (
      <div>
        <Helmet>
          <meta title={this.lang.site.contactContactUs} content={this.lang.site.contactSubTitle} />
        </Helmet>

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

              <UI.ContentBox onClick={() => router.navigate(PAGES.FAQ)} className="SiteContactScreen__link_item">
                <SVG src={require('../../../../asset/120/info.svg')}/>
                <h3 className="SiteContactScreen__link_item__title">{this.lang.site.contactFaqTitle}</h3>
                <p>{this.lang.site.contactFaqDescription}</p>
              </UI.ContentBox>

              <UI.ContentBox onClick={() => {window.location.href = 'mailto:support@bitcoinbot.com'}} className="SiteContactScreen__link_item">
                <SVG src={require('../../../../asset/120/email_success.svg')}/>
                <h3 className="SiteContactScreen__link_item__title">{this.lang.site.contactEmailTitle}</h3>
                <h2><a href="mailto:support@bitcoinbot.com">support@bitcoinbot.com</a></h2>
                <p>{this.lang.site.contactEmailDescription}</p>
              </UI.ContentBox>

              <UI.ContentBox className="SiteContactScreen__link_item disabled">
                <SVG src={require('../../../../asset/120/code.svg')}/>
                <h3 className="SiteContactScreen__link_item__title">{this.lang.site.contactApiTitle}</h3>
                <p>{this.lang.site.contactApiDescription}</p>
              </UI.ContentBox>
            </div>

            <TitleWithBg title={this.lang.site.contactTelegramTitle} bgTitle={this.lang.site.contactTelegramTitleBackground} centered />

            <div className="SiteContactScreen__sn">
              <SnItem
                icon={require('../../../../asset/social/telegram.svg')}
                title="Русский"
                link="t.me/BitcoinBotPro_Russian"
              />
              <SnItem
                icon={require('../../../../asset/social/telegram.svg')}
                title="English"
                link="t.me/BitcoinBotPro_English"
              />
              <SnItem
                icon={require('../../../../asset/social/telegram.svg')}
                title="Indonesian"
                link="t.me/BitcoinBotPro_Indonesian"
              />
            </div>

            <TitleWithBg title={this.lang.site.contactSocialNetworksTitle} bgTitle={this.lang.site.contactSocialNetworksTitleBackground} centered />

            <div className="SiteContactScreen__sn">
              <SnItem
                icon={require('../../../../asset/social/vk.svg')}
                title={this.lang.global_social_vkontakte}
                link="vk.com/bitcoinbot_pro"
              />
              <SnItem
                icon={require('../../../../asset/social/facebook.svg')}
                title={this.lang.global_social_facebook}
                link="facebook.com/Bitcoinbotpro-432506870546401"
              />
              <SnItem
                icon={require('../../../../asset/social/instagram.svg')}
                title={this.lang.global_social_instagram}
                link="instagram.com/bitcoinbot_pro"
              />
              <SnItem
                icon={require('../../../../asset/social/twitter.svg')}
                title={this.lang.global_social_twitter}
                link="twitter.com/BitcoinBot_pro"
              />
            </div>
          </div>
        </div>
        <MobileAppBanner />
      </div>
    )
  }
}
