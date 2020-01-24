import './SiteSafetyScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import InfoCard from '../../../components/site/InfoCard/InfoCard';
import SafetyBanner from './components/SafetyBanner/SafetyBanner';
import * as utils from '../../../../utils/index';


export default class SiteSafetyScreen extends BaseScreen {
  render() {
    return (
      <div>
        <div className="Layout_spacing">
          <h1 className="SiteSafetyScreen__heading">{utils.getLang('site__safetyTitle')}</h1>

          <p className="SiteSafetyScreen__intro">
            {utils.getLang('site__safetySubTitle')}
          </p>


          <div className="SiteSafetyScreen__features">
            <h2 className="SiteSafetyScreen__title">{utils.getLang('site__safetyFeaturesTitle')}</h2>
            {this._renderFeatures()}
          </div>


          <div className="SiteSafetyScreen__banner">
            <div className="SiteSafetyScreen__banner__cont">
              <h3 className="SiteSafetyScreen__banner__title">{utils.getLang('site__safetyDoubleProtectionTitle')}</h3>
              <p className="SiteSafetyScreen__banner__caption">{utils.getLang('site__safetyDoubleProtectionSubTitle')}</p>
            </div>
            <img src={require('./asset/safety_iphone.svg')} alt="phone" />
          </div>
        </div>

        <SafetyBanner />

      </div>
    )
  }


  _renderFeatures() {
    const items = [
      {
        icon: require('./asset/safety_feature_1.svg'),
        title: utils.getLang('site__safetyTrafficTitle'),
        caption: utils.getLang('site__safetyTrafficSubTitle')
      },
      {
        icon: require('./asset/safety_feature_2.svg'),
        title: utils.getLang('site__safetyEncryptionTitle'),
        caption: utils.getLang('site__safetyEncryptionSubTitle')
      },
      {
        icon: require('./asset/safety_feature_3.svg'),
        title: utils.getLang('site__safetyDataTitle'),
        caption: utils.getLang('site__safetyDataSubTitle')
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
