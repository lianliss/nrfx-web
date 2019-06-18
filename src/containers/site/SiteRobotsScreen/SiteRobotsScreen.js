import './SiteRobotsScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SiteWrapper from '../../../wrappers/Site/SiteWrapper';
import SitePageInfoBlock from '../../../components/site/SitePageInfoBlock/SitePageInfoBlock';
import RegisterBanner from '../../../components/site/RegisterBanner/RegisterBanner';
import InfoCard from '../../../components/site/InfoCard/InfoCard';
import SupportedPlatforms from './components/SupportedPlatforms';


export default class SiteRobotsScreen extends BaseScreen {
  render() {
    return (
      <SiteWrapper className="Robots__screen">
        <SitePageInfoBlock
          image={require('./asset/robots_main_image.svg')}
          title={<span>Робот - лучший и самый <br /> быстрый помощник</span>}
          caption={<span>Хотите торговать выгодно, - попробуйте с нашим роботом</span>}
          buttonText="Попробовать"
        />

        <div className="SiteSectionHeader">
          <div className="SiteSectionHeaderTitle">Как зарабатывать больше?</div>
          <div className="SiteSectionHeaderCaption">Возьмите в аренду инновационных роботов для выгодной торговли на бирже</div>
        </div>

        {this._renderFeatures()}

        <SupportedPlatforms />

        <RegisterBanner />
      </SiteWrapper>
    )
  }

  _renderFeatures() {
    const items = [
      {
        icon: require('./asset/robots_feature_1.svg'),
        title: 'Торговые стратегии',
        caption: 'Мы используем проверенные и эффективно работающие алгоритмы для торговли на криптовалютном рынке'
      },
      {
        icon: require('./asset/robots_feature_2.svg'),
        title: 'Скорость',
        caption: 'Наши роботы выполняют операции за считанные секунды и реагируют на изменения рынка в режиме реального времени'
      },
      {
        icon: require('./asset/robots_feature_3.svg'),
        title: 'Автоматизация',
        caption: 'Автоматизированные криптовалютные роботы. Торгуйте 24 часа в сутки, 7 дней в неделю и 365 дней в году'
      },
      {
        icon: require('./asset/robots_feature_4.svg'),
        title: 'Мультивалютность',
        caption: 'Роботы могут торговать не только на Bitcoin, но и на многих других парах криптовалют'
      },
      {
        icon: require('./asset/robots_feature_5.svg'),
        title: 'Искусственный интеллект ',
        caption: 'Роботы проводят анализ рынка на основе технологии машинного обучения, обмениваясь информацией между собой, получают актуальную информацию об изменениях рынка'
      },
      {
        icon: require('./asset/robots_feature_6.svg'),
        title: 'Экономия времени',
        caption: 'Мы ценим ваше время, поэтому наши роботы торгуют, даже когда вы спите или отдыхаете. Торговля никогда не была такой простой и эффективной'
      },
    ].map((item) => {
      return (
        <InfoCard
          key={item.title} 
          title={item.title}
          caption={item.caption}
          icon={item.icon}
          className="RobotsFeature__item"
        />
      )
    });

    return (
      <div className="RobotsFeature__items">
        {items}
      </div>
    )
  }
}
