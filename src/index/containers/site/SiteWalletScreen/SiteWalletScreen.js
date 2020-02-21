import './SiteWalletScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SitePageInfoBlock from '../../../components/site/SitePageInfoBlock/SitePageInfoBlock';
import MobileAppBanner from '../../../components/site/MobileAppBanner/MobileAppBanner';
import InfoCard from '../../../components/site/InfoCard/InfoCard';
import * as utils from '../../../../utils/index';


export default class SiteWalletScreen extends BaseScreen {
  render() {
    return (
      <div className="Wallet__screen">
        <div className="Layout_spacing">
          <SitePageInfoBlock
            image={require('./asset/wallet_main_image.png')}
            title={<span>{utils.getLang('site__walletTitle')}</span>}
            caption={<span>{utils.getLang('site__walletSubTitle')}</span>}
            buttonText={utils.getLang('site__walletCreateBtn')}
          />

          <div className="SiteSectionHeader">
            <div className="SiteSectionHeaderTitle">{utils.getLang('site__walletBitcoinbotWallet')}</div>
          </div>

          {this._renderFeatures()}
        </div>

        {/*<MobileAppBanner />*/}
      </div>
    )
  }

  _renderFeatures() {
    const items = [
      {
        icon: require('./asset/wallet_feature_1.svg'),
        title: utils.getLang('site__walletSimpleTitle'),
        caption: utils.getLang('site__walletSimpleSubTitle')
      },
      {
        icon: require('./asset/wallet_feature_2.svg'),
        title: utils.getLang('site__walletReliableTitle'),
        caption: utils.getLang('site__walletReliableSubTitle')
      },
      {
        icon: require('./asset/wallet_feature_3.svg'),
        title: utils.getLang('site__walletConvenientTitle'),
        caption: utils.getLang('site__walletConvenientSubTitle')
      },
      {
        icon: require('./asset/wallet_feature_4.svg'),
        title: utils.getLang('site__walletFreeTitle'),
        caption: utils.getLang('site__walletFreeSubTitle')
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
