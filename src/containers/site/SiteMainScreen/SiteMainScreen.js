import './SiteMainScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SiteWrapper from '../../../wrappers/Site/SiteWrapper';
import SitePageInfoBlock from '../../../components/site/SitePageInfoBlock/SitePageInfoBlock';
import HomepageProduct from '../../../components/site/HomepageProduct/HomepageProduct';
import MobileAppBanner from '../../../components/site/MobileAppBanner/MobileAppBanner';
import InfoCard from '../../../components/site/InfoCard/InfoCard';


export default class SiteMainScreen extends BaseScreen {
  render() {
    return (
      <SiteWrapper isHomepage>
        <SitePageInfoBlock
          image={require('../../../containers/site/SiteMainScreen/asset/homepage_screen.png')}
          title={<span>BITCOINBOT:<br />Кошелек</span>}
          caption={<span>Почувствуйте все преимущества цифровых<br />финансов в единой платформе</span>}
          buttonText="Начать"
        />
        <div className="SiteSectionHeader">
          <div className="SiteSectionHeaderTitle">BITCOINBOT объединяет</div>
          <div className="SiteSectionHeaderCaption">Оцените пять ключевых продуктов на одной платформе</div>
        </div>
        <div className="SiteHomepageProducts">
          <HomepageProduct
            title="Биржа"
            bgTitle="Exchange"
            icon="exchange"
          >{['Покупайте популярные криптовалюты', 'Выгодный курс', 'Низкие комиссии']}</HomepageProduct>
          <HomepageProduct
            title="Кошелек"
            bgTitle="Wallets"
            icon="wallet"
            seeMoreLink="wallet"
            reverse
          >{['Все ваши цифровые активы в одном месте', 'Мультивалютный счет', 'Данные зашифрованы и надежно защищены']}</HomepageProduct>
          <HomepageProduct
            title="Роботы"
            bgTitle="Robots"
            icon="robot"
          >{['Автоматизированная торговля с BITCOINBOT 24/7', 'Высокая скорость выполнения операций', 'Анализ рынка по различным индикаторам']}</HomepageProduct>
          <HomepageProduct
            title="Инвестиции"
            bgTitle="Investment"
            icon="investment"
            reverse
          >{['Выгодные условия', 'Депозиты в нескольких криптовалютах', 'Высокая доходность по депозитам']}</HomepageProduct>
          <HomepageProduct
            title="Оплата"
            bgTitle="Commerce"
            icon="commerce"
          >{['Принимайте платежи из любой точки мира', 'Платежи в течении нескольких минут, а не дней', 'Все платежи анонимны, а данные зашифрованы']}</HomepageProduct>
        </div>
        <div className="SiteSectionHeader">
          <div className="SiteSectionHeaderTitle">Безопасность превыше всего</div>
          <div className="SiteSectionHeaderCaption">Для нас безопасность цифровых валют и пользовательских данных в приоритете</div>
        </div>
        {this._renderSafety()}
        {this._renderRegister()}


        <MobileAppBanner />

      </SiteWrapper>
    )
  }

  _renderSafety() {
    const items = [{
      icon: require('./asset/homepage_safety_1.svg'),
      title: 'Защищенное подключение',
      caption: 'Трафик нашего веб-сайта полностью проходит по зашифрованному SSL протоколу'
    }, {
      icon: require('./asset/homepage_safety_2.svg'),
      title: 'Безопасное хранение',
      caption: 'Мы уделяем особое внимание вопросу безопасности и постоянно добавляем новые уровни защиты'
    }, {
      icon: require('./asset/homepage_safety_3.svg'),
      title: 'Технологичная надежность',
      caption: 'Многоуровневая и многокластерная системная архитектура'
    }].map((item) => {
      return (
        <InfoCard
          key={item.title}
          title={item.title}
          caption={item.caption}
          icon={item.icon}
          btn={<a href="#" className="SiteHomepageSafety__item__more">Узнать больше</a>}
        />
      )
    });

    return (
      <div className="SiteHomepageSafety__items">
        {items}
      </div>
    )
  }

  _renderRegister() {
    return (
      <div className="SiteHomepageRegister">
        <div className="SiteHomepageRegister__title">Создайте единый аккаунт сейчас</div>
        <div className="SiteHomepageRegister__caption">Попробовать все преимущества BITCOINBOT очень просто </div>
        <div className="SiteHomepageRegister__form">
          <input type="email" className="SiteHomepageRegister__form__input" placeholder="E-mail" />
          <div className="SiteHomepageRegister__form__button">Регистрация</div>
        </div>
      </div>
    )
  }
}
