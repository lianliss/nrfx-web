import './Footer.less';

import * as utils from '../../../utils/index';
import React from 'react';
import SVG from 'react-inlinesvg';

export default function Footer() {
  return (
    <div className="Footer">
      <div className="Footer__cont">
        <div className="Footer__links_wrap">
          <div className="Footer__links">
            <div className="Footer__links__title">{utils.getLang('site__footerProducts')}</div>
            <a href="#" className="Footer__links__item">{utils.getLang('site__footerWallet')}</a>
            <a href="#" className="Footer__links__item">{utils.getLang('site__footerExchange')}</a>
            <a href="#" className="Footer__links__item">{utils.getLang('site__footerRobots')}</a>
            <a href="#" className="Footer__links__item">{utils.getLang('site__footerInvestments')}</a>
            <a href="#" className="Footer__links__item">{utils.getLang('site__footerPayment')}</a>
          </div>
          <div className="Footer__links">
            <div className="Footer__links__title">{utils.getLang('site__footerCompany')}</div>
            <a href="#" className="Footer__links__item">{utils.getLang('site__footerAboutUs')}</a>
            <a href="#" className="Footer__links__item">{utils.getLang('site__footerTechnology')}</a>
            <a href="#" className="Footer__links__item">{utils.getLang('site__footerSecurity')}</a>
          </div>
          <div className="Footer__links">
            <div className="Footer__links__title">{utils.getLang('site__footerHelp')}</div>
            <a href="#" className="Footer__links__item">{utils.getLang('site__footerFAQ')}</a>
            <a href="#" className="Footer__links__item">{utils.getLang('site__footerContactUs')}</a>
            <a href="#" className="Footer__links__item">{utils.getLang('site__footerTermsUse')}</a>
            <a href="#" className="Footer__links__item">{utils.getLang('site__footerPrivacyPolicy')}</a>
          </div>
          <div className="Footer__links">
            <div className="Footer__links__title">{utils.getLang('site__footerApplication')}</div>
            <a href="#" className="Footer__links__item">{utils.getLang('site__footerAppStore')}</a>
          </div>
        </div>
        <div className="Footer__bottom">
          <div className="Footer__logo">
            <SVG src={require('../../../asset/logo_big_orange.svg')} />
          </div>
          <div className="Footer__copyright">© 2017-2019 BITCOINBOT</div>
          <div className="Footer__socials">
            <a href="#" className="Footer__social">
              <SVG src={require('../../../asset/site/footer_facebook.svg')} />
            </a>
            <a href="#" className="Footer__social">
              <SVG src={require('../../../asset/site/footer_twitter.svg')} />
            </a>
            <a href="#" className="Footer__social">
              <SVG src={require('../../../asset/site/footer_instagram.svg')} />
            </a>
            <a href="#" className="Footer__social">
              <SVG src={require('../../../asset/site/footer_youtube.svg')} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}