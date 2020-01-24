import './SiteRobotsScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SitePageInfoBlock from '../../../components/site/SitePageInfoBlock/SitePageInfoBlock';
import RegisterBanner from '../../../components/site/RegisterBanner/RegisterBanner';
import InfoCard from '../../../components/site/InfoCard/InfoCard';
import SupportedPlatforms from './components/SupportedPlatforms';
import * as utils from '../../../../utils/index';


export default class SiteRobotsScreen extends BaseScreen {
  render() {
    return (
      <div className="Robots__screen">
        <div className="Layout_spacing">
          <SitePageInfoBlock
            image={require('./asset/robots_main_image.svg')}
            title={<span>{utils.getLang('site__robotsTitle')}</span>}
            caption={<span>{utils.getLang('site__robotsSubTitle')}</span>}
            buttonText={utils.getLang('site__site.toTryBtn')}
          />

          <div className="SiteSectionHeader">
            <div className="SiteSectionHeaderTitle">{utils.getLang('site__robotsHowEarnMoreTitle')}</div>
            <div className="SiteSectionHeaderCaption">{utils.getLang('site__robotsHowEarnMoreSubTitle')}</div>
          </div>

          {this._renderFeatures()}

          <SupportedPlatforms />
        </div>

        <RegisterBanner />

      </div>
    )
  }

  _renderFeatures() {
    const items = [
      {
        icon: require('./asset/robots_feature_1.svg'),
        title: utils.getLang('site__robotsTradingStrategiesTitle'),
        caption: utils.getLang('site__robotsTradingStrategiesSubTitle')
      },
      {
        icon: require('./asset/robots_feature_2.svg'),
        title: utils.getLang('site__robotsSpeedTitle'),
        caption: utils.getLang('site__robotsSpeedSubTitle')
      },
      {
        icon: require('./asset/robots_feature_3.svg'),
        title: utils.getLang('site__robotsAutomationTitle'),
        caption: utils.getLang('site__robotsAutomationSubTitle')
      },
      {
        icon: require('./asset/robots_feature_4.svg'),
        title: utils.getLang('site__robotsMulticurrencyTitle'),
        caption: utils.getLang('site__robotsMulticurrencySubTitle')
      },
      {
        icon: require('./asset/robots_feature_5.svg'),
        title: utils.getLang('site__robotsArtificialIntelligenceTitle'),
        caption: utils.getLang('site__robotsArtificialIntelligenceSubTitle')
      },
      {
        icon: require('./asset/robots_feature_6.svg'),
        title: utils.getLang('site__robotsTimeSavingTitle'),
        caption: utils.getLang('site__robotsTimeSavingSubTitle')
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
