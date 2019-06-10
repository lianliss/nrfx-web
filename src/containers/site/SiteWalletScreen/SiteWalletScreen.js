import React from 'react';

import BaseScreen from '../../BaseScreen';
import SiteWrapper from '../../../wrappers/Site/SiteWrapper';
import SitePageInfoBlock from '../../../components/site/SitePageInfoBlock/SitePageInfoBlock';
import MobileAppBanner from '../../../components/site/MobileAppBanner/MobileAppBanner';
import InfoCard from '../../../components/site/InfoCard/InfoCard';

import './SiteWalletScreen.less';


export default class SiteWalletScreen extends BaseScreen {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <SiteWrapper>
        <SitePageInfoBlock
          image={require('./asset/wallet_main_image.svg')}
          title={<span>Один кошелек <br /> много возможностей</span>}
          caption={<span>Простой и надежный криптовалютный кошелек</span>}
          buttonText="Создать"
        />
        <div className="SiteSectionHeader">
          <div className="SiteSectionHeaderTitle">Кошелек BITCOINBOT</div>
        </div>

        {this._renderFeatures()}

        <MobileAppBanner />
      </SiteWrapper>
    )
  }

  _renderFeatures() {
    const items = [
      {
        icon: require('./asset/wallet_feature_1.svg'),
        title: 'Простой',
        caption: 'Все ваши цифровые активы в одном месте. Храните, отправляйте и получайте криптовалюты в несколько кликов'
      },
      {
        icon: require('./asset/wallet_feature_2.svg'),
        title: 'Надежный',
        caption: 'Мы прилагаем огромные усилия для защиты ваших активов. Средств на кошельках хранятся с использованием шифрования AES-256'
      },
      {
        icon: require('./asset/wallet_feature_3.svg'),
        title: 'Удобный',
        caption: 'Используйте все преимущества своих цифровых активов на единой платформе'
      },
      {
        icon: require('./asset/wallet_feature_4.svg'),
        title: 'Бесплатный',
        caption: 'Никаких комиссий за прием криптовалют и обслуживание. Собственный банк в ваших руках'
      },
    ].map((item) => {
      return (
        <InfoCard
          key={item.title}
          title={item.title}
          caption={item.caption}
          icon={item.icon}
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
