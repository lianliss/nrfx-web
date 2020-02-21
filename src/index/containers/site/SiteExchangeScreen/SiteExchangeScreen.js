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
            title={<span>{utils.getLang('site__exchangeTitle')}</span>}
            caption={<span>{utils.getLang('site__exchangeSubTitle')}</span>}
            onClick={() => router.navigate(PAGES.EXCHANGE)}
            buttonText={utils.getLang('site__exchangeStart')}
          />


          {/*<div className="SiteExchangeScreen__market">*/}
          {/*  <img src={require('./asset/exchange_data.svg')} alt="Exchange market" className="SiteExchangeScreen__market__image" />*/}
          {/*  <UI.Button fontSize={15} rounded>{utils.getLang('site__exchangeViewExchange')}</UI.Button>*/}
          {/*</div>*/}


          <h2 className="SiteExchangeScreen__title">{utils.getLang('site__exchangeFeaturesTitle')}</h2>
          {this._renderFeatures()}


          <div className="SiteExchangeScreen__interface">
            <div className="SiteExchangeScreen__interface__cont">
              <TitleWithBg title={utils.getLang('site__exchangeCustomizableInterface')} bgTitle={utils.getLang('site__exchangeCustomizableInterface')} />

              <p>
                {utils.getLang('site__exchangeCustomizableInterfaceTitle')}
              </p>


              <ul>
                <li><span>{utils.getLang('site__exchangeCustomizableInterfaceSubTitle1')}</span></li>
                <li><span>{utils.getLang('site__exchangeCustomizableInterfaceSubTitle2')}</span></li>
                <li><span>{utils.getLang('site__exchangeCustomizableInterfaceSubTitle3')}</span></li>
                <li><span>{utils.getLang('site__exchangeCustomizableInterfaceSubTitle4')}</span></li>
              </ul>

              <p>
                {utils.getLang('site__exchangeCustomizableInterfaceSubTitle5')}
              </p>
            </div>

            <div className="SiteExchangeScreen__interface__img">
              <img src={require('./asset/exchange_main_image.png')} alt="Exchange interface" className="" />
            </div>
          </div>

        </div>

        <Banner
          title={utils.getLang('site__exchangeReadyStartTrading')}
          caption={utils.getLang('site__exchangeSubReadyStartTrading')}
          btnText={utils.getLang('site__exchangeStartTrading')}
        />

      </div>
    )
  }


  _renderFeatures() {
    const items = [
      {
        icon: require('./asset/exchange_feature_1.svg'),
        title: utils.getLang('site__exchangeFavorableRateTitle'),
        caption: utils.getLang('site__exchangeFavorableRateSubTitle'),
      },
      {
        icon: require('./asset/exchange_feature_2.svg'),
        title: utils.getLang('site__exchangeHighSpeedTitle'),
        caption: utils.getLang('site__exchangeHighSpeedSubTitle'),
      },
      {
        icon: require('./asset/exchange_feature_3.svg'),
        title: utils.getLang('site__exchangeEffectiveVolatilityTitle'),
        caption: utils.getLang('site__exchangeEffectiveVolatilitySubTitle'),
      },
      {
        icon: require('./asset/exchange_feature_4.svg'),
        title: utils.getLang('site__exchangeHighLiquidityTitle'),
        caption: utils.getLang('site__exchangeHighLiquiditySubTitle'),
      },
      {
        icon: require('./asset/exchange_feature_5.svg'),
        title: utils.getLang('site__exchangeConvenientInterfaceTitle'),
        caption: utils.getLang('site__exchangeConvenientInterfaceSubTitle'),
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
