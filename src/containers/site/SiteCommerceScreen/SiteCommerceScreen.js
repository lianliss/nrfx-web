import './SiteCommerceScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SiteWrapper from '../../../wrappers/Site/SiteWrapper';
import SitePageInfoBlock from '../../../components/site/SitePageInfoBlock/SitePageInfoBlock';
import TitleWithBg from '../../../components/site/TitleWithBg/TitleWithBg';
import FeatureCard from '../../../components/site/FeatureCard/FeatureCard';
import Steps from '../../../components/site/Steps/Steps';
import Banner from '../../../components/site/Banner/Banner';


export default class SiteCommerceScreen extends BaseScreen {
  stepsData = [
    {
      num: 1,
      title: this.lang.site.commerceStep1,
      caption: this.lang.site.commerceStep1Title,
    },
    {
      num: 2,
      title: this.lang.site.commerceStep2,
      caption: this.lang.site.commerceStep2Title,
    },
    {
      num: 3,
      title: this.lang.site.commerceStep3,
      caption: this.lang.site.commerceStep3Title,
    },
    {
      num: 4,
      title: this.lang.site.commerceStep4,
      caption: this.lang.site.commerceStep4Title,
    },
  ];

  render() {
    return (
      <SiteWrapper>
        <div className="Layout_spacing">
          <SitePageInfoBlock
            hideWatchButton
            image={require('../../../containers/site/SiteCommerceScreen/asset/Commerce_main_bg.svg')}
            title={<span>{this.lang.site.commerceTitle}</span>}
            caption={<span>{this.lang.site.commerceSubTitle}</span>}
            buttonText={this.lang.site.commerceRegistration}
          />

          <div className="SiteCommerceScreen__intro">
            <TitleWithBg title={this.lang.site.commerceBitcoinbotTitle} bgTitle={this.lang.site.commerceBitcoinbotTitle} bgTitleUppercase centered />
            <p className="SiteCommerceScreen__caption">
              {this.lang.site.commerceBitcoinbotSubTitle}
            </p>
          </div>

          <div className="SiteCommerceScreen__features">
            <h2 className="SiteCommerceScreen__title">{this.lang.site.commerceBenefitsTitle}</h2>
            <p className="SiteCommerceScreen__caption">{this.lang.site.commerceBenefitsSubTitle}</p>

            {this._renderFeatures()}
          </div>


          <h2 className="SiteCommerceScreen__title">{this.lang.site.commerceHowItWorksTitle}</h2>
          <p className="SiteCommerceScreen__caption">{this.lang.site.commerceHowItWorksSubTitle}</p>

          <Steps stepsData={this.stepsData} />

        </div>

        <Banner
          title={this.lang.site.commerceConnectTitle}
          caption={this.lang.site.commerceConnectSubTitle}
          btnText={this.lang.site.commerceConnectBtn}
        />
      </SiteWrapper>
    )
  }

  _renderFeatures() {
    const features = [
      {
        title: this.lang.site.commerceGlobalTitle,
        caption: this.lang.site.commerceGlobalSubTitle,
      },
      {
        title: this.lang.site.commerceFastTitle,
        caption: this.lang.site.commerceFastSubTitle,
      },
      {
        title: this.lang.site.commerceConfidentiallyTitle,
        caption: this.lang.site.commerceConfidentiallySubTitle,
      },
      {
        title: this.lang.site.commerceNoLimitsTitle,
        caption: this.lang.site.commerceNoLimitsSubTitle,
      },
      {
        title: this.lang.site.commerceWithoutIntermediariesTitle,
        caption: this.lang.site.commerceWithoutIntermediariesSubTitle,
      },
      {
        title: this.lang.site.commerceLowCommissionTitle,
        caption: this.lang.site.commerceLowCommissionSubTitle,
      },
      {
        title: this.lang.site.commerceConvenientPracticalTitle,
        caption: this.lang.site.commerceConvenientPracticalSubTitle,
      },
      {
        title: this.lang.site.commerceSafelyTitle,
        caption: this.lang.site.commerceSafelySubTitle,
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
