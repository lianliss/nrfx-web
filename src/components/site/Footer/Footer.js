import React from 'react';
import './Footer.less';
import SVG from 'react-inlinesvg';

export default function Footer() {
  return (
    <div className="Footer">
      <div className="Footer__cont">
        <div className="Footer__links_wrap">
          <div className="Footer__links">
            <div className="Footer__links__title">Продукты</div>
            <a href="#" className="Footer__links__item">Кошелек</a>
            <a href="#" className="Footer__links__item">Биржа</a>
            <a href="#" className="Footer__links__item">Роботы</a>
            <a href="#" className="Footer__links__item">Инвестиции</a>
            <a href="#" className="Footer__links__item">Оплата</a>
          </div>
          <div className="Footer__links">
            <div className="Footer__links__title">Компания</div>
            <a href="#" className="Footer__links__item">О нас</a>
            <a href="#" className="Footer__links__item">Технологии</a>
            <a href="#" className="Footer__links__item">Безопасность</a>
          </div>
          <div className="Footer__links">
            <div className="Footer__links__title">Помощь</div>
            <a href="#" className="Footer__links__item">ЧаВо</a>
            <a href="#" className="Footer__links__item">Связаться с нами</a>
            <a href="#" className="Footer__links__item">Пользовательское соглашение</a>
            <a href="#" className="Footer__links__item">Политика конфиденциальности</a>
          </div>
          <div className="Footer__links">
            <div className="Footer__links__title">Приложение</div>
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