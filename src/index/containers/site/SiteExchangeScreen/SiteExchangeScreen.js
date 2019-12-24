import './SiteExchangeScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SitePageInfoBlock from '../../../components/site/SitePageInfoBlock/SitePageInfoBlock';
import TitleWithBg from '../../../components/site/TitleWithBg/TitleWithBg';
import Banner from '../../../components/site/Banner/Banner';
import InfoCard from '../../../components/site/InfoCard/InfoCard';
import UI from '../../../../ui';
import * as utils from '../../../../utils/index';
import router from '../../../../router';
import * as PAGES from '../../../constants/pages';


export default class SiteExchangeScreen extends BaseScreen {
  render() {
    return (
      <div>

        <div className="Layout_spacing">
          <SitePageInfoBlock
            image={require('./asset/exchange_main_image.png')}
            title={<span>{this.lang.site.exchangeTitle}</span>}
            caption={<span>{this.lang.site.exchangeSubTitle}</span>}
            onClick={() => router.navigate(PAGES.EXCHANGE)}
            buttonText={this.lang.site.exchangeStart}
          />


          <div className="SiteExchangeScreen__market">
            <img src={require('./asset/exchange_data.svg')} alt="Exchange market" className="SiteExchangeScreen__market__image" />
            <UI.Button fontSize={15} rounded>{this.lang.site.exchangeViewExchange}</UI.Button>
          </div>


          <h2 className="SiteExchangeScreen__title">{utils.nl2br(this.lang.site.exchangeFeaturesTitle)}</h2>
          {this._renderFeatures()}


          <div className="SiteExchangeScreen__interface">
            <div className="SiteExchangeScreen__interface__cont">
              <TitleWithBg title={this.lang.site.exchangeCustomizableInterface} bgTitle={this.lang.site.exchangeCustomizableInterface} />

              <p>
                {this.lang.site.exchangeCustomizableInterfaceTitle}
              </p>


              <ul>
                <li><span>{this.lang.site.exchangeCustomizableInterfaceSubTitle1}</span></li>
                <li><span>{this.lang.site.exchangeCustomizableInterfaceSubTitle2}</span></li>
                <li><span>{this.lang.site.exchangeCustomizableInterfaceSubTitle3}</span></li>
                <li><span>{this.lang.site.exchangeCustomizableInterfaceSubTitle4}</span></li>
              </ul>

              <p>
                {this.lang.site.exchangeCustomizableInterfaceSubTitle5}
              </p>
            </div>

            <div className="SiteExchangeScreen__interface__img">
              <img src={require('./asset/exchange_main_image.png')} alt="Exchange interface" className="" />
            </div>
          </div>

        </div>

        <Banner
          title={this.lang.site.exchangeReadyStartTrading}
          caption={this.lang.site.exchangeSubReadyStartTrading}
          btnText={this.lang.site.exchangeStartTrading}
        />

      </div>
    )
  }


  _renderFeatures() {
    const items = [
      {
        icon: require('./asset/exchange_feature_1.svg'),
        title: this.lang.site.exchangeFavorableRateTitle,
        caption: this.lang.site.exchangeFavorableRateSubTitle,
      },
      {
        icon: require('./asset/exchange_feature_2.svg'),
        title: this.lang.site.exchangeHighSpeedTitle,
        caption: this.lang.site.exchangeHighSpeedSubTitle,
      },
      {
        icon: require('./asset/exchange_feature_3.svg'),
        title: this.lang.site.exchangeEffectiveVolatilityTitle,
        caption: this.lang.site.exchangeEffectiveVolatilitySubTitle,
      },
      {
        icon: require('./asset/exchange_feature_4.svg'),
        title: this.lang.site.exchangeHighLiquidityTitle,
        caption: this.lang.site.exchangeHighLiquiditySubTitle,
      },
      {
        icon: require('./asset/exchange_feature_5.svg'),
        title: this.lang.site.exchangeConvenientInterfaceTitle,
        caption: this.lang.site.exchangeConvenientInterfaceSubTitle,
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
