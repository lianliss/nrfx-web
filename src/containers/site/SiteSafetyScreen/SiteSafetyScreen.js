import './SiteSafetyScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SiteWrapper from '../../../wrappers/Site/SiteWrapper';
import InfoCard from '../../../components/site/InfoCard/InfoCard';
import SafetyBanner from './components/SafetyBanner/SafetyBanner';
import * as utils from '../../../utils/index';


export default class SiteSafetyScreen extends BaseScreen {
  render() {
    return (
      <SiteWrapper withOrangeBg>
        <h1 className="SiteSafetyScreen__heading">{this.lang.site.safetyTitle}</h1>

        <p className="SiteSafetyScreen__intro">
          {this.lang.site.safetySubTitle}
        </p>


        <div className="SiteSafetyScreen__features">
          <h2 className="SiteSafetyScreen__title">{utils.nl2br(this.lang.site.safetyFeaturesTitle)}</h2>
          {this._renderFeatures()}
        </div>


        <div className="SiteSafetyScreen__banner">
          <div className="SiteSafetyScreen__banner__cont">
            <h3 className="SiteSafetyScreen__banner__title">{this.lang.site.safetyDoubleProtectionTitle}</h3>
            <p className="SiteSafetyScreen__banner__caption">{this.lang.site.safetyDoubleProtectionSubTitle}</p>
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
        title: this.lang.site.safetyTrafficTitle,
        caption: this.lang.site.safetyTrafficSubTitle
      },
      {
        icon: require('./asset/safety_feature_2.svg'),
        title: this.lang.site.safetyEncryptionTitle,
        caption: this.lang.site.safetyEncryptionSubTitle
      },
      {
        icon: require('./asset/safety_feature_3.svg'),
        title: this.lang.site.safetyDataTitle,
        caption: this.lang.site.safetyDataSubTitle
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
