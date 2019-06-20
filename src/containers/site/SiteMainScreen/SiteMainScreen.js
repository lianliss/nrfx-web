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
          buttonText={this.lang.site.homeBegin}
        />
        <div className="SiteSectionHeader">
          <div className="SiteSectionHeaderTitle">{this.lang.site.homeBitcoibotCombine}</div>
          <div className="SiteSectionHeaderCaption">{this.lang.site.homeBitcoibotCombineSubTitle}</div>
        </div>
        <div className="SiteHomepageProducts">
          <HomepageProduct
            title={this.lang.site.homeExchange}
            bgTitle="Exchange"
            icon="exchange"
            seeMoreLink="exchange"
          >{[this.lang.site.homeExchangeSubTitile1, this.lang.site.homeExchangeSubTitile2, this.lang.site.homeExchangeSubTitile3]}</HomepageProduct>
          <HomepageProduct
            title={this.lang.site.homeWallet}
            bgTitle="Wallets"
            icon="wallet"
            seeMoreLink="wallet"
            reverse
          >{[this.lang.site.homeWalletSubTitle1, this.lang.site.homeWalletSubTitle4, this.lang.site.homeWalletSubTitle3]}</HomepageProduct>
          <HomepageProduct
            title={this.lang.site.homeRobots}
            bgTitle="Robots"
            icon="robot"
            seeMoreLink="robots"
          >{[this.lang.site.homeRobotsSubTitle1, this.lang.site.homeRobotsSubTitle2, this.lang.site.homeRobotsSubTitle3]}</HomepageProduct>
          <HomepageProduct
            title={this.lang.site.homeInvestments}
            bgTitle="Investment"
            icon="investment"
            seeMoreLink="investment"
            reverse
          >{[this.lang.site.homeInvestmentsSubTitle1, this.lang.site.homeInvestmentsSubTitle2, this.lang.site.homeInvestmentsSubTitle3]}</HomepageProduct>
          <HomepageProduct
            title={this.lang.site.homePayment}
            bgTitle="Commerce"
            icon="commerce"
            seeMoreLink="commerce"
          >{[this.lang.site.homePaymentSubTitle1, this.lang.site.homePaymentSubTitle2, this.lang.site.homePaymentSubTitle3]}</HomepageProduct>
        </div>

        <div className="SiteSectionHeader">
          <div className="SiteSectionHeaderTitle">{this.lang.site.homeSecurityTitle}</div>
          <div className="SiteSectionHeaderCaption">{this.lang.site.homeSecuritySubaTitle}</div>
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
      title: this.lang.site.homeSafetyTitle1,
      caption: this.lang.homeSafetySubTitle1
    }, {
      icon: require('./asset/homepage_safety_2.svg'),
      title: this.lang.site.homeSafetyTitle2,
      caption: this.lang.site.homeSafetySubTitle2
    }, {
      icon: require('./asset/homepage_safety_3.svg'),
      title: this.lang.site.homeSafetyTitle3,
      caption: this.lang.site.homeSafetySubTitle3
    }].map((item) => {
      return (
        <InfoCard
          key={item.title}
          title={item.title}
          caption={item.caption}
          icon={item.icon}
          className="SiteHomepageSafety__item"
          btn={<a href="#" className="SiteHomepageSafety__item__more">{this.lang.site.homeLearnMore}</a>}
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
