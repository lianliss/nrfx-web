import './SiteExchangeScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SiteWrapper from '../../../wrappers/Site/SiteWrapper';
import SitePageInfoBlock from '../../../components/site/SitePageInfoBlock/SitePageInfoBlock';
import TitleWithBg from '../../../components/site/TitleWithBg/TitleWithBg';
import Banner from '../../../components/site/Banner/Banner';
import InfoCard from '../../../components/site/InfoCard/InfoCard';
import UI from '../../../ui';


export default class SiteExchangeScreen extends BaseScreen {
  render() {
    return (
      <SiteWrapper>
        <SitePageInfoBlock
          image={require('./asset/exchange_main_image.svg')}
          title={<span>Технологичная биржа</span>}
          caption={<span>Купить, продать и обменять криптовалюту в считанные минуты</span>}
          buttonText="Начать"
        />


        <div className="SiteExchangeScreen__market">
          <img src={require('./asset/exchange_data.svg')} alt="Exchange market" className="SiteExchangeScreen__market__image" />
          <UI.Button rounded>Смотреть биржу</UI.Button>
        </div>


        <h2 className="SiteExchangeScreen__title">Какие возможности открываются вам <br /> на BITCOINBOT бирже</h2>
        {this._renderFeatures()}


        <div className="SiteExchangeScreen__interface">
          <div className="SiteExchangeScreen__interface__cont">
            <TitleWithBg title="Настраиваемый интерфейс" bgTitle="Interface" />

            <p>
              BITCOINBOT дает возможность настроить интерфейс и организовать рабочее пространство в соответствии с вашими предпочтениями.
            </p>

            <ul>
              <li><span>В вашем распоряжение множество инструментов для удобной торговли;</span></li>
              <li><span>Компактный или полноэкранный режим работы;</span></li>
              <li><span>Переключайтесь между светлой и темной темой;</span></li>
              <li><span>Актуальное время всегда перед вам.</span></li>
            </ul>

            <p>
              Минимализм – простой интерфейс не отвлекает от самого важного, всегда будьте в курсе цен и не упускайте возможность.
            </p>
          </div>

          <div className="SiteExchangeScreen__interface__img">
            <img src={require('./asset/exchange_interface.svg')} alt="Exchange interface" className="" />
          </div>
        </div>


        <Banner
          title="Готовы начать торговать?"
          caption="Создайте аккаунт бесплатно и начните торговать прямо сейчас"
          btnText="Начать торговать"
        />

      </SiteWrapper>
    )
  }


  _renderFeatures() {
    const items = [
      {
        icon: require('./asset/exchange_feature_1.svg'),
        title: 'Выгодный курс',
        caption: 'Благодаря нашему уникальному алгоритму всегда покупайте криптовалюты по выгодной цене',
      },
      {
        icon: require('./asset/exchange_feature_2.svg'),
        title: 'Высокая скорость',
        caption: 'Пропускная способность биржи более 2.500.000 транзакций в секунду, что делает нас одной из самых быстрых бирж на рынке',      
      },
      {
        icon: require('./asset/exchange_feature_3.svg'),
        title: 'Эффективная волатильность',
        caption: 'Используя ликвидность различных криптовалютных бирж на одной платформе обеспечиваем высокую волатильность',      
      },
      {
        icon: require('./asset/exchange_feature_4.svg'),
        title: 'Высокая ликвидность',
        caption: 'Большие объемы торгов на различных криптовалютных парах. Будьте уверены, что ваши ордера выполнятся быстро вне зависимости от загруженности платформы',      
      },
      {
        icon: require('./asset/exchange_feature_5.svg'),
        title: 'Удобный интерфейс',
        caption: 'Интуитивно понятный и легкий в использовании. Настройте интерфейс для торговли под свои предпочтения',      
      },
    ].map((item) => {
      return (
        <InfoCard
          key={item.title}
          title={item.title}
          caption={item.caption}
          icon={item.icon}
          className="ExchangeFeature__item"
        />
      )
    });

    return (
      <div className="ExchangeFeature__items">
        {items}
      </div>
    )
  }
}
