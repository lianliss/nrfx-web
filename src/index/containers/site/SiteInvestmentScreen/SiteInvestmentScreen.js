import './SiteInvestmentScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SitePageInfoBlock from '../../../components/site/SitePageInfoBlock/SitePageInfoBlock';
import TitleWithBg from '../../../components/site/TitleWithBg/TitleWithBg';
import Banner from '../../../components/site/Banner/Banner';
import InfoCard from '../../../components/site/InfoCard/InfoCard';
import { getLang } from '../../../../utils';


export default class SiteInvestmentScreen extends BaseScreen {
  render() {
    return (
      <div>
        <div className="Layout_spacing">
          <SitePageInfoBlock
            hideWatchButton
            image={require('./asset/investment_main_image.png')}
            title={<span>{getLang('site__investmentTitleInvestment')}</span>}
            caption={<span>{getLang('site__site.investmentSubTitle')}</span>}
            buttonText={getLang('site__site.investmentInvestBtn')}
          />

          <div className="SiteInvestmentScreen__numbers">
            {this._renderNumbers()}
          </div>

          <div className="SiteInvestmentScreen__intro">
            <TitleWithBg title={getLang('site__investmentWhatIsInvestmentTitle')} bgTitle={getLang('site__investmentWhatIsInvestmentTitle')} bgTitleUppercase centered darkBg />
            <p className="SiteInvestmentScreen__caption">
              {getLang('site__investmentWhatIsInvestmentSubTitle')}
            </p>
          </div>

          <h2 className="SiteInvestmentScreen__title">{getLang('site__investmentMoreThanDeposit')}</h2>
          {this._renderFeatures()}
        </div>

        <Banner
          title={getLang('site__investmentNeverBeenEasier')}
          caption={getLang('site__investmentIncreaseCapital')}
          btnText={getLang('site__investmentInvestBtn')}
        />

      </div>
    )
  }


  _renderNumbers = () => {
    const dataWithNumbers = [
      {
        title: getLang('site__investmentNumbersTitle1'),
        caption: getLang('site__investmentNumbersSubTitle1'),
      },
      {
        title: getLang('site__investmentNumbersTitle2'),
        caption: getLang('site__investmentNumbersSubTitle2'),
      },
      {
        title: getLang('site__investmentNumbersTitle3'),
        caption: getLang('site__investmentNumbersSubTitle3'),
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
        title: getLang('site__investmentHighYieldTitle'),
        caption: getLang('site__investmentHighYieldSubTitle')
      },
      {
        icon: require('./asset/investment_feature_2.svg'),
        title: getLang('site__investmentInsuredDepositTitle'),
        caption: getLang('site__investmentInsuredDepositSubTitle')
      },
      {
        icon: require('./asset/investment_feature_3.svg'),
        title: getLang('site__investmentConvenientOutputTitle'),
        caption: getLang('site__investmentConvenientOutputSubTitle')
      },
      {
        icon: require('./asset/investment_feature_4.svg'),
        title: getLang('site__investmentVariableDepositsTitle'),
        caption: getLang('site__investmentVariableDepositsSubTitle')
      },
      {
        icon: require('./asset/investment_feature_5.svg'),
        title: getLang('site__investmentReliablePartnerTitle'),
        caption: getLang('site__investmentReliablePartnerSubTitle')
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
