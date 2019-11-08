import './SiteWalletScreen.less';

import React from 'react';
import { Helmet } from 'react-helmet';

import BaseScreen from '../../BaseScreen';
import SitePageInfoBlock from '../../../components/site/SitePageInfoBlock/SitePageInfoBlock';
import MobileAppBanner from '../../../components/site/MobileAppBanner/MobileAppBanner';
import InfoCard from '../../../components/site/InfoCard/InfoCard';
import * as utils from '../../../../utils/index';


export default class SiteWalletScreen extends BaseScreen {
  render() {
    return (
      <div className="Wallet__screen">
        <Helmet>
          <meta title="" content="" />
        </Helmet>

        <div className="Layout_spacing">
          <SitePageInfoBlock
            image={require('./asset/wallet_main_image.png')}
            title={<span>{utils.nl2br(this.lang.site.walletTitle)}</span>}
            caption={<span>{this.lang.site.walletSubTitle}</span>}
            buttonText={this.lang.site.walletCreateBtn}
          />

          <div className="SiteSectionHeader">
            <div className="SiteSectionHeaderTitle">{this.lang.site.walletBitcoinbotWallet}</div>
          </div>

          {this._renderFeatures()}
        </div>

        <MobileAppBanner />
      </div>
    )
  }

  _renderFeatures() {
    const items = [
      {
        icon: require('./asset/wallet_feature_1.svg'),
        title: this.lang.site.walletSimpleTitle,
        caption: this.lang.site.walletSimpleSubTitle
      },
      {
        icon: require('./asset/wallet_feature_2.svg'),
        title: this.lang.site.walletReliableTitle,
        caption:this.lang.site.walletReliableSubTitle
      },
      {
        icon: require('./asset/wallet_feature_3.svg'),
        title: this.lang.site.walletConvenientTitle,
        caption:  this.lang.site.walletConvenientSubTitle
      },
      {
        icon: require('./asset/wallet_feature_4.svg'),
        title: this.lang.site.walletFreeTitle,
        caption: this.lang.site.walletFreeSubTitle
      },
    ].map((item) => {
      return (
        <InfoCard
          key={item.title}
          title={item.title}
          caption={item.caption}
          icon={item.icon}
          className="WalletFeature__item"
        />
      )
    });

    return (
      <div className="WalletFeature__items">
        {items}
      </div>
    )
  }
}
