import './SiteMainScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SiteWrapper from '../../../wrappers/Site/SiteWrapper';
import SitePageInfoBlock from '../../../components/site/SitePageInfoBlock/SitePageInfoBlock';
import HomepageProduct from '../../../components/site/HomepageProduct/HomepageProduct';
import MobileAppBanner from '../../../components/site/MobileAppBanner/MobileAppBanner';
import RegisterBanner from '../../../components/site/RegisterBanner/RegisterBanner';
import InfoCard from '../../../components/site/InfoCard/InfoCard';


export default class SiteMainScreen extends BaseScreen {
  render() {
    return (
      <SiteWrapper isHomepage>
        <SitePageInfoBlock
          image={require('../../../containers/site/SiteMainScreen/asset/homepage_screen.png')}
          title={<span>BITCOINBOT:<br />Кошелек</span>}
          caption={<span>Почувствуйте все преимущества цифровых<br />финансов в единой платформе</span>}
          buttonText={this.lang.homeBegin}
        />
        <div className="SiteSectionHeader">
          <div className="SiteSectionHeaderTitle">{this.lang.homeBitcoibotCombine}</div>
          <div className="SiteSectionHeaderCaption">{this.lang.homeBitcoibotCombineSubTitle}</div>
        </div>
        <div className="SiteHomepageProducts">
          <HomepageProduct
            title={this.lang.homeExchange}
            bgTitle="Exchange"
            icon="exchange"
            seeMoreLink="exchange"
          >{[this.lang.homeExchangeSubTitile1, this.lang.homeExchangeSubTitile2, this.lang.homeExchangeSubTitile3]}</HomepageProduct>
          <HomepageProduct
            title={this.lang.homeWallet}
            bgTitle="Wallets"
            icon="wallet"
            seeMoreLink="wallet"
            reverse
          >{[this.lang.homeWalletSubTitle1, this.lang.homeWalletSubTitle4, this.lang.homeWalletSubTitle3]}</HomepageProduct>
          <HomepageProduct
            title={this.lang.homeRobots}
            bgTitle="Robots"
            icon="robot"
            seeMoreLink="robots"
          >{[this.lang.homeRobotsSubTitle1, this.lang.homeRobotsSubTitle2, this.lang.homeRobotsSubTitle3]}</HomepageProduct>
          <HomepageProduct
            title={this.lang.homeInvestments}
            bgTitle="Investment"
            icon="investment"
            seeMoreLink="investment"
            reverse
          >{[this.lang.homeInvestmentsSubTitle1, this.lang.homeInvestmentsSubTitle2, this.lang.homeInvestmentsSubTitle3]}</HomepageProduct>
          <HomepageProduct
            title={this.lang.homePayment}
            bgTitle="Commerce"
            icon="commerce"
            seeMoreLink="commerce"
          >{[this.lang.homePaymentSubTitle1, this.lang.homePaymentSubTitle2, this.lang.homePaymentSubTitle3]}</HomepageProduct>
        </div>

        <div className="SiteSectionHeader">
          <div className="SiteSectionHeaderTitle">{this.lang.homeSecurityTitle}</div>
          <div className="SiteSectionHeaderCaption">{this.lang.homeSecuritySubaTitle}</div>
        </div>

        {this._renderSafety()}
        
        <RegisterBanner isCurly />

        <MobileAppBanner />

      </SiteWrapper>
    )
  }

  _renderSafety() {
    const items = [{
      icon: require('./asset/homepage_safety_1.svg'),
      title: this.lang.homeSafetyTitle1,
      caption: this.lang.homeSafetySubTitle1
    }, {
      icon: require('./asset/homepage_safety_2.svg'),
      title: this.lang.homeSafetyTitle2,
      caption: this.lang.homeSafetySubTitle2
    }, {
      icon: require('./asset/homepage_safety_3.svg'),
      title: this.lang.homeSafetyTitle3,
      caption: this.lang.homeSafetySubTitle3
    }].map((item) => {
      return (
        <InfoCard
          key={item.title}
          title={item.title}
          caption={item.caption}
          icon={item.icon}
          className="SiteHomepageSafety__item"
          btn={<a href="#" className="SiteHomepageSafety__item__more">{this.lang.homeLearnMore}</a>}
        />
      )
    });

    return (
      <div className="SiteHomepageSafety__items">
        {items}
      </div>
    )
  }
}
