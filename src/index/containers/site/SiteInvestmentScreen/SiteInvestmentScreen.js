import './SiteInvestmentScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SitePageInfoBlock from '../../../components/site/SitePageInfoBlock/SitePageInfoBlock';
import TitleWithBg from '../../../components/site/TitleWithBg/TitleWithBg';
import Banner from '../../../components/site/Banner/Banner';
import InfoCard from '../../../components/site/InfoCard/InfoCard';


export default class SiteInvestmentScreen extends BaseScreen {
  render() {
    return (
      <div>
        <div className="Layout_spacing">
          <SitePageInfoBlock
            hideWatchButton
            image={require('./asset/investment_main_image.png')}
            title={<span>{this.lang.site.investmentTitleInvestment}</span>}
            caption={<span>{this.lang.site.investmentSubTitle}</span>}
            buttonText={this.lang.site.investmentInvestBtn}
          />

          <div className="SiteInvestmentScreen__numbers">
            {this._renderNumbers()}
          </div>

          <div className="SiteInvestmentScreen__intro">
            <TitleWithBg title={this.lang.site.investmentWhatIsInvestmentTitle} bgTitle={this.lang.site.investmentWhatIsInvestmentTitle} bgTitleUppercase centered darkBg />
            <p className="SiteInvestmentScreen__caption">
              {this.lang.site.investmentWhatIsInvestmentSubTitle}
            </p>
          </div>

          <h2 className="SiteInvestmentScreen__title">{this.lang.site.investmentMoreThanDeposit}</h2>
          {this._renderFeatures()}
        </div>

        <Banner
          title={this.lang.site.investmentNeverBeenEasier}
          caption={this.lang.site.investmentIncreaseCapital}
          btnText={this.lang.site.investmentInvestBtn}
        />

      </div>
    )
  }


  _renderNumbers = () => {
    const dataWithNumbers = [
      {
        title: this.lang.site.investmentNumbersTitle1,
        caption: this.lang.site.investmentNumbersSubTitle1,
      },
      {
        title: this.lang.site.investmentNumbersTitle2,
        caption: this.lang.site.investmentNumbersSubTitle2,
      },
      {
        title: this.lang.site.investmentNumbersTitle3,
        caption: this.lang.site.investmentNumbersSubTitle3,
      },
    ]

    return dataWithNumbers.map(item => (
      <div key={item.title} className="SiteInvestmentScreen__numbers__item">
        <h2 className="SiteInvestmentScreen__numbers__item__title">{item.title}</h2>
        <p className="SiteInvestmentScreen__numbers__item__caption">{item.caption}</p>
      </div>
    ))
  }


  _renderFeatures() {
    const items = [
      {
        icon: require('./asset/investment_feature_1.svg'),
        title: this.lang.site.investmentHighYieldTitle,
        caption: this.lang.site.investmentHighYieldSubTitle
      },
      {
        icon: require('./asset/investment_feature_2.svg'),
        title: this.lang.site.investmentInsuredDepositTitle,
        caption: this.lang.site.investmentInsuredDepositSubTitle
      },
      {
        icon: require('./asset/investment_feature_3.svg'),
        title: this.lang.site.investmentConvenientOutputTitle,
        caption: this.lang.site.investmentConvenientOutputSubTitle
      },
      {
        icon: require('./asset/investment_feature_4.svg'),
        title: this.lang.site.investmentVariableDepositsTitle,
        caption: this.lang.site.investmentVariableDepositsSubTitle
      },
      {
        icon: require('./asset/investment_feature_5.svg'),
        title: this.lang.site.investmentReliablePartnerTitle,
        caption: this.lang.site.investmentReliablePartnerSubTitle
      },
    ].map((item) => {
      return (
        <InfoCard
          key={item.title}
          title={item.title}
          caption={item.caption}
          icon={item.icon}
          className="InvestmentFeature__item"
        />
      )
    });

    return (
      <div className="InvestmentFeature__items">
        {items}
      </div>
    )
  }
}
