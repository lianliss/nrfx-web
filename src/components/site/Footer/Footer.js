import './Footer.less';

import React from 'react';
import SVG from 'react-inlinesvg';

import * as pages from '../../../constants/pages';
import * as utils from '../../../utils/index';

export default function Footer() {
  return (
    <div className="Footer">
      <div className="Footer__cont">
        <div className="Footer__links_wrap">
          <div className="Footer__links">
            <div className="Footer__links__title">{utils.getLang('site__footerProducts')}</div>
            <a href={`/#/${pages.WALLET}`} className="Footer__links__item">{utils.getLang('site__footerWallet')}</a>
            <a href={`/#/${pages.EXCHANGE}`} className="Footer__links__item">{utils.getLang('site__footerExchange')}</a>
            <a href={`/#/${pages.ROBOTS}`} className="Footer__links__item">{utils.getLang('site__footerRobots')}</a>
            <a href={`/#/${pages.INVESTMENT}`} className="Footer__links__item">{utils.getLang('site__footerInvestments')}</a>
            <a href={`/#/${pages.COMMERCE}`} className="Footer__links__item">{utils.getLang('site__footerPayment')}</a>
          </div>
          <div className="Footer__links">
            <div className="Footer__links__title">{utils.getLang('site__footerCompany')}</div>
            <a href={`/#/${pages.ABOUT}`} className="Footer__links__item">{utils.getLang('site__footerAboutUs')}</a>
            <a href={`/#/${pages.TECHNOLOGY}`} className="Footer__links__item">{utils.getLang('site__footerTechnology')}</a>
            <a href={`/#/${pages.SAFETY}`} className="Footer__links__item">{utils.getLang('site__footerSecurity')}</a>
          </div>
          <div className="Footer__links">
            <div className="Footer__links__title">Помощь</div>
            <a href={`/#/${pages.FAQ}`} className="Footer__links__item">ЧаВо</a>
            <a href={`/#/${pages.CONTACT}`} className="Footer__links__item">Связаться с нами</a>
            <a href="#" className="Footer__links__item">Пользовательское соглашение</a>
            <a href="#" className="Footer__links__item">Политика конфиденциальности</a>
          </div>
          <div className="Footer__links">
            <div className="Footer__links__title">{utils.getLang('site__footerApplication')}</div>
            <a href="#" className="Footer__links__item">App Store</a>
            <a href="#" className="Footer__links__item">Google Play</a>
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