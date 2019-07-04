import './SiteRobotsScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SiteWrapper from '../../../wrappers/Site/SiteWrapper';
import SitePageInfoBlock from '../../../components/site/SitePageInfoBlock/SitePageInfoBlock';
import RegisterBanner from '../../../components/site/RegisterBanner/RegisterBanner';
import InfoCard from '../../../components/site/InfoCard/InfoCard';
import SupportedPlatforms from './components/SupportedPlatforms';
import * as utils from '../../../utils/index';


export default class SiteRobotsScreen extends BaseScreen {
  render() {
    return (
      <SiteWrapper className="Robots__screen">
        <div className="Layout_spacing">
          <SitePageInfoBlock
            image={require('./asset/robots_main_image.svg')}
            title={<span>{utils.nl2br(this.lang.site.robotsTitle)}</span>}
            caption={<span>{this.lang.site.robotsSubTitle}</span>}
            buttonText={this.lang.site.toTryBtn}
          />

          <div className="SiteSectionHeader">
            <div className="SiteSectionHeaderTitle">{this.lang.site.robotsHowEarnMoreTitle}</div>
            <div className="SiteSectionHeaderCaption">{this.lang.site.robotsHowEarnMoreSubTitle}</div>
          </div>

          {this._renderFeatures()}

          <SupportedPlatforms />
        </div>

        <RegisterBanner />

      </SiteWrapper>
    )
  }

  _renderFeatures() {
    const items = [
      {
        icon: require('./asset/robots_feature_1.svg'),
        title: this.lang.site.robotsTradingStrategiesTitle,
        caption: this.lang.site.robotsTradingStrategiesSubTitle
      },
      {
        icon: require('./asset/robots_feature_2.svg'),
        title: this.lang.site.robotsSpeedTitle,
        caption: this.lang.site.robotsSpeedSubTitle
      },
      {
        icon: require('./asset/robots_feature_3.svg'),
        title: this.lang.site.robotsAutomationTitle,
        caption: this.lang.site.robotsAutomationSubTitle
      },
      {
        icon: require('./asset/robots_feature_4.svg'),
        title: this.lang.site.robotsMulticurrencyTitle,
        caption: this.lang.site.robotsMulticurrencySubTitle
      },
      {
        icon: require('./asset/robots_feature_5.svg'),
        title: this.lang.site.robotsArtificialIntelligenceTitle,
        caption: this.lang.site.robotsArtificialIntelligenceSubTitle
      },
      {
        icon: require('./asset/robots_feature_6.svg'),
        title: this.lang.site.robotsTimeSavingTitle,
        caption: this.lang.site.robotsTimeSavingSubTitle
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
