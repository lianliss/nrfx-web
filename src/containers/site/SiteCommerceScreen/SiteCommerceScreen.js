import './SiteCommerceScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SiteWrapper from '../../../wrappers/Site/SiteWrapper';
import SitePageInfoBlock from '../../../components/site/SitePageInfoBlock/SitePageInfoBlock';
import TitleWithBg from '../../../components/site/TitleWithBg/TitleWithBg';
import FeatureCard from '../../../components/site/FeatureCard/FeatureCard';
import Steps from '../../../components/site/Steps/Steps';
import Banner from '../../../components/site/Banner/Banner';


const stepsData = [
  {
    num: 1,
    title: 'Шаг 1',
    caption: 'Вы продаете товар или услугу в своем магазине и устанавливаете цену в выбранной валюте',
  },
  {
    num: 2,
    title: 'Шаг 2',
    caption: 'Мы рассчитываем стоимость криптовалюты в режиме реального времени, выбирая лучшую цену на нескольких биржах',
  },
  {
    num: 3,
    title: 'Шаг 3',
    caption: 'Клиент получает платежное поручение и оплачивает товар или услугу криптовалютой',
  },
  {
    num: 4,
    title: 'Шаг 4',
    caption: 'Вы получаете криптовалюту прямо на свой кошелек в течении нескольких минут',
  },
]


export default class SiteCommerceScreen extends BaseScreen {
  render() {
    return (
      <SiteWrapper>
        <SitePageInfoBlock
          hideWatchButton
          image={require('../../../containers/site/SiteCommerceScreen/asset/Commerce_main_bg.svg')}
          title={<span>Платежная система</span>}
          caption={<span>Платежная экосистема для вас и вашего бизнеса</span>}
          buttonText="Регистрация"
        />

        <div className="SiteCommerceScreen__intro">
          <TitleWithBg title="BITCOINBOT | Сommerce" bgTitle="Commerce" bgTitleUppercase centered />
          <p className="SiteCommerceScreen__caption">
            Каждый день в мире совершается сотни миллионов покупок различных товаров, работ и услуг.
            Представляем вашему вниманию новый способ оплаты, объединивший в себе все преимущества безналичных платежей при отсутствии свойственных им недостатков.
          </p>
        </div>

        <div className="SiteCommerceScreen__features">
          <h2 className="SiteCommerceScreen__title">Преимущества</h2>
          <p className="SiteCommerceScreen__caption">Принимайте крипто-платежи для вашего бизнеса и не только</p>

          {this._renderFeatures()}
        </div>


        <h2 className="SiteCommerceScreen__title">Как это работает?</h2>
        <p className="SiteCommerceScreen__caption">Принимайте криптовалютные платежи в 4 простых шага</p>

        <Steps stepsData={stepsData} />


        <Banner
          title="Хотите принимать платежи в криптовалюте?"
          caption="Подключите BITCOINBOT | Commerce уже сейчас"
          btnText="Подключить"
        />

      </SiteWrapper>
    )
  }

  _renderFeatures() {
    const features = [
      {
        title: 'Глобально',
        caption: 'Принимайте и отправляйте платежи из любой точки мира',
      },
      {
        title: 'Быстро',
        caption: 'Принимайте и отправляйте платежи в течении нескольких минут, а не дней',
      },
      {
        title: 'Конфиденциально',
        caption: 'Все платежи анонимны, а персональные данные зашифрованы.Криптовалюта по своей природе обеспечивает конфиденциальность как для покупателя, так и для продавца',
      },
      {
        title: 'Без ограничений',
        caption: 'Проводите оплату на любую сумму, все зависит только от вас',
      },
      {
        title: 'Без посредников',
        caption: 'Станьте собственным банком.Прием криптовалютных платежей прост и бесплатен именно так, как должно быть в интернет- платежах',
      },
      {
        title: 'Низкая комиссия',
        caption: 'Обычно компании эмитенты взымают до 5 %, плюс дополнительные комиссии.Наша комиссия 0.2 %, при этом нет ежемесячной платы, платы за регистрацию и т.п.',
      },
      {
        title: 'Удобно и практично',
        caption: 'Начать очень просто, зарегистрируйтесь и используя удобный интерфейс подключите оплату в криптовалюте в несколько кликов',
      },
      {
        title: 'Безопасно',
        caption: 'Платежи в криптовалюте надежны и необратимы.Это означает, что полученные средства не будут возвращены, а фиктивные платежи невозможны',
      },
    ];

    return (
      <div className="SiteCommerceScreen__features__items">
        {features.map(feat => (
          <FeatureCard key={feat.title} title={feat.title} caption={feat.caption} />
        ))}
      </div>
    );
  }
}
