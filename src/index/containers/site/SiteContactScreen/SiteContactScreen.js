import './SiteContactScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import COMPANY from '../../../constants/company';
import * as utils from '../../../../utils';
import * as UI from '../../../../ui';
import TitleWithBg from '../../../components/site/TitleWithBg/TitleWithBg';
import SVG from 'react-inlinesvg';
// import MobileAppBanner from '../../../components/site//MobileAppBanner';

const SnItem = props => {
  return props.link ? (
    <UI.ContentBox onClick={() => {
      window.open("https://" + props.link)
    }} className="SiteContactScreen__sn__item">
      <SVG src={props.icon}/>
      <div className="SiteContactScreen__sn__item__content">
        <h3>{props.title}</h3>
        <a href={"https://" + props.link}>{props.displayLink || props.link.replace('https://', '')}</a>
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
      if (!utils.isEmail(value)) {
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
          <h1 className="SiteContactScreen__heading">{utils.getLang('site__contactContactUs')}</h1>
          <div className="SiteContactScreen__content">
            <TitleWithBg title={utils.getLang('site__contactSubTitle')} bgTitle={utils.getLang('site__contactSubTitleBackground')} centered />
            <p className="SiteContactScreen__description">{utils.getLang('site__contactDescription')}</p>

            <div className="SiteContactScreen__link_list">
              <UI.ContentBox onClick={() => {window.jivo_api && window.jivo_api.open()}} className="SiteContactScreen__link_item">
                <SVG src={require('../../../../asset/120/chat.svg')}/>
                <h3 className="SiteContactScreen__link_item__title">{utils.getLang('site__contactChatTitle')}</h3>
                <p>{utils.getLang('site__contactChatDescription')}</p>
              </UI.ContentBox>

              <UI.ContentBox onClick={() => window.open(COMPANY.faqUrl)} className="SiteContactScreen__link_item">
                <SVG src={require('../../../../asset/120/info.svg')}/>
                <h3 className="SiteContactScreen__link_item__title">{utils.getLang('site__contactFaqTitle')}</h3>
                <p>{utils.getLang('site__contactFaqDescription')}</p>
              </UI.ContentBox>

              <UI.ContentBox onClick={() => {window.location.href = `mailto:${COMPANY.email.support}`}} className="SiteContactScreen__link_item">
                <SVG src={require('../../../../asset/120/email_success.svg')}/>
                <h3 className="SiteContactScreen__link_item__title">{utils.getLang('site__contactEmailTitle')}</h3>
                <h2><a href={`mailto:${COMPANY.email.support}`}>{COMPANY.email.support}</a></h2>
                <p>{utils.getLang('site__contactEmailDescription')}</p>
              </UI.ContentBox>

              <UI.ContentBox className="SiteContactScreen__link_item disabled">
                <SVG src={require('../../../../asset/120/code.svg')}/>
                <h3 className="SiteContactScreen__link_item__title">{utils.getLang('site__contactApiTitle')}</h3>
                <p>{utils.getLang('site__contactApiDescription')}</p>
              </UI.ContentBox>
            </div>

            <TitleWithBg title={utils.getLang('site__contactSocialNetworksTitle')} bgTitle={utils.getLang('site__contactSocialNetworksTitleBackground')} centered />

            <div className="SiteContactScreen__sn">
              <SnItem
                icon={require('../../../../asset/social/vk.svg')}
                title={utils.getLang('global_social_vkontakte')}
                link={COMPANY.social.vk}
              />
              <SnItem
                icon={require('../../../../asset/social/facebook.svg')}
                title={utils.getLang('global_social_facebook')}
                link={COMPANY.social.facebook}
              />
              <SnItem
                icon={require('../../../../asset/social/instagram.svg')}
                title={utils.getLang('global_social_instagram')}
                link={COMPANY.social.instagram}
              />
              <SnItem
                icon={require('../../../../asset/social/twitter.svg')}
                title={utils.getLang('global_social_twitter')}
                link={COMPANY.social.twitter}
              />
              <SnItem
                icon={require('../../../../asset/social/telegram.svg')}
                title={utils.getLang('global_social_telegram')}
                link={COMPANY.social.telegram}
              />
            </div>

            <TitleWithBg title={utils.getLang('site__contactTelegramTitle')} bgTitle={utils.getLang('site__contactTelegramTitleBackground')} centered />

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
                displayLink="t.me"
                link="t.me/joinchat/CqRVWE7w_5mKt76bc1q79A"
              />
            </div>

          </div>
        </div>
        {/*<MobileAppBanner />*/}
      </div>
    )
  }
}
