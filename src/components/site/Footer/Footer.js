import './Footer.less';

import React from 'react';
import SVG from 'react-inlinesvg';

import * as pages from '../../../constants/pages';
import * as utils from '../../../utils/index';
import * as actions from '../../../actions';

export default function Footer() {
  return (
    <div className="Footer">
      <div className="Footer__cont">
        <div className="Footer__links_wrap">
          <div className="Footer__links">
            <div className="Footer__links__title">{utils.getLang('site__footerProducts')}</div>
            <a href={`/${pages.WALLET}`} className="Footer__links__item">{utils.getLang('site__homeWallet')}</a>
            <a href={`/${pages.SITE_EXCHANGE}`} className="Footer__links__item">{utils.getLang('site__footerExchange')}</a>
            <a href={`/${pages.ROBOTS}`} className="Footer__links__item">{utils.getLang('site__footerRobots')}</a>
            <a href={`/${pages.INVESTMENT}`} className="Footer__links__item">{utils.getLang('site__footerInvestments')}</a>
            <a href={`/${pages.COMMERCE}`} className="Footer__links__item">{utils.getLang('site__footerPayment')}</a>
          </div>
          <div className="Footer__links">
            <div className="Footer__links__title">{utils.getLang('site__footerCompany')}</div>
            <a href={`/${pages.ABOUT}`} className="Footer__links__item">{utils.getLang('site__footerAboutUs')}</a>
            <a href={`/${pages.TECHNOLOGY}`} className="Footer__links__item">{utils.getLang('site__footerTechnology')}</a>
            <a href={`/${pages.SAFETY}`} className="Footer__links__item">{utils.getLang('site__footerSecurity')}</a>
          </div>
          <div className="Footer__links">
            <div className="Footer__links__title">{utils.getLang('site__footerHelp')}</div>
            <a href="https://bitcoinbot.wiki/" className="Footer__links__item">{utils.getLang('site__footerFAQ')}</a>
            <a href={`/${pages.CONTACT}`} className="Footer__links__item">{utils.getLang('site__footerContactUs')}</a>
            <span onClick={() => actions.openModal('static_content', null, {type: "terms"})} className="Footer__links__item">{utils.getLang('site__footerTermsUse')}</span>
            <span onClick={() => actions.openModal('static_content', null, {type: "privacy"})} className="Footer__links__item">{utils.getLang('site__footerPrivacyPolicy')}</span>
          </div>
          <div className="Footer__links">
            <div className="Footer__links__title">{utils.getLang('site__footerApplication')}</div>
            <a href="#" className="Footer__links__item">{utils.getLang('site__footerAppStore')}</a>
            <a href="https://play.google.com/store/apps/details?id=com.bitcoinbot&hl=en" className="Footer__links__item">{utils.getLang('site__footerGooglePlay')}</a>
          </div>
        </div>
        <div className="Footer__bottom">
          <div className="Footer__logo">
            <SVG src={require('../../../asset/logo_full.svg')} />
          </div>
          <div className="Footer__copyright">© 2017-{new Date().getYear() + 1900} BITCOINBOT</div>
          <div className="Footer__socials">
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/Bitcoinbotpro-432506870546401/" className="Footer__social">
              <SVG src={require('../../../asset/site/footer_facebook.svg')} />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/BitcoinBot_pro" className="Footer__social">
              <SVG src={require('../../../asset/site/footer_twitter.svg')} />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/bitcoinbot_pro/" className="Footer__social">
              <SVG src={require('../../../asset/site/footer_instagram.svg')} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}