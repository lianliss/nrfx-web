import './SiteSafetyScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SiteWrapper from '../../../wrappers/Site/SiteWrapper';
import InfoCard from '../../../components/site/InfoCard/InfoCard';
import SafetyBanner from './components/SafetyBanner/SafetyBanner';


export default class SiteSafetyScreen extends BaseScreen {
  render() {
    return (
      <SiteWrapper withOrangeBg>
        <h1 className="SiteSafetyScreen__heading">Безопасность превыше всего</h1>

        <p className="SiteSafetyScreen__intro">
          Для нас безопасность средств и пользовательских данных всегда в приоритете. Мы уделяем особое внимание вопросу безопасности и постоянно добавляем новые уровни защиты на платформе. Обращаем ваше внимание, что мы не можем раскрывать слишком много подробностей о мерах безопасности, реализованных на платформе        
        </p>


        <div className="SiteSafetyScreen__features">
          <h2 className="SiteSafetyScreen__title">Лучшие технологии <br /> для вашего спокойствия</h2>
          {this._renderFeatures()}
        </div>


        <div className="SiteSafetyScreen__banner">
          <div className="SiteSafetyScreen__banner__cont">
            <h3 className="SiteSafetyScreen__banner__title">Двойная защита</h3>
            <p className="SiteSafetyScreen__banner__caption">Помимо логина и пароля, ваш аккаунт защищен дополнительным уровнем безопасности, при помощи двухфакторной аутентификации (2FA)</p>
          </div>
          <img src={require('./asset/safety_iphone.svg')} alt="phone"/>
        </div>


        <SafetyBanner />

      </SiteWrapper>
    )
  }


  _renderFeatures() {
    const items = [
      {
        icon: require('./asset/safety_feature_1.svg'),
        title: 'Трафик',
        caption: 'Трафик нашего веб-сайта полностью проходит шифрование SSL (https)'
      },
      {
        icon: require('./asset/safety_feature_2.svg'),
        title: 'Шифрование',
        caption: 'Кошельки и данные хранятся с использованием шифрования AES-256'
      },
      {
        icon: require('./asset/safety_feature_3.svg'),
        title: 'Данные',
        caption: 'Персональные данные хранятся в соответствии с регламентом Европейского союза GDPR'
      },
    ].map((item) => {
      return (
        <InfoCard
          key={item.title}
          title={item.title}
          caption={item.caption}
          icon={item.icon}
          className="SafetyFeature__item"
        />
      )
    });

    return (
      <div className="SafetyFeature__items">
        {items}
      </div>
    )
  }
}
