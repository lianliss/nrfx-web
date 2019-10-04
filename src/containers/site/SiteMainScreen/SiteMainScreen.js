import './SiteMainScreen.less';

import React from 'react';
import { Helmet } from 'react-helmet';

import BaseScreen from '../../BaseScreen';
import SitePageInfoBlock from '../../../components/site/SitePageInfoBlock/SitePageInfoBlock';
import HomepageProduct from '../../../components/site/HomepageProduct/HomepageProduct';
import MobileAppBanner from '../../../components/site/MobileAppBanner/MobileAppBanner';
import RegisterBanner from '../../../components/site/RegisterBanner/RegisterBanner';
import InfoCard from '../../../components/site/InfoCard/InfoCard';
import * as pages from '../../../constants/pages';
import * as utils from '../../../utils/index';
import * as actions from '../../../actions';
import TypedText from '../../../components/site/TypedText/TypedText';
import initGetParams from '../../../services/initialGetParams';


export default class SiteMainScreen extends BaseScreen {
  componentDidMount() {
    if (initGetParams.params.i) {
      actions.sendInviteLinkView(initGetParams.params.i);
    }
  }

  getAnimatedTitle = () => {
    const { site } = this.lang;
    const products = [site.homeSlideExchange, site.homeSlideWallet, site.homeSlideInvestments, site.homeSlideRobots, site.homeSlidePayment];
    
    return (
      <TypedText products={products} />
    )
  }

  componentWillUnmount() {
    clearInterval(this.animationTimer);
  }

  render() {
    return (
      <div>
        <Helmet>
          <meta title="" content="" />
        </Helmet>

        <div className="Layout_spacing">
          <SitePageInfoBlock
            image={require('../../../containers/site/SiteMainScreen/asset/homepage_screen.png')}
            title={<span>BITCOINBOT:<br />{this.getAnimatedTitle()}</span>}
            caption={<span>{utils.nl2br(this.lang.site.homeWalletSubTitile)}</span>}
            buttonText={this.lang.site.homeBegin}
          />

          <div className="SiteSectionHeader">
            <div className="SiteSectionHeaderTitle">{this.lang.site.homeBitcoibotCombine}</div>
            <div className="SiteSectionHeaderCaption">{this.lang.site.homeBitcoibotCombineSubTitle}</div>
          </div>
        </div>


        <div className="SiteHomepageProducts">
          <div className="Layout_spacing">

            <HomepageProduct
              title={this.lang.site.homeExchange}
              bgTitle={this.lang.site.homeExchange}
              icon="exchange"
              seeMoreLink={pages.EXCHANGE}
            >{[this.lang.site.homeExchangeSubTitile1, this.lang.site.homeExchangeSubTitile2, this.lang.site.homeExchangeSubTitile3]}</HomepageProduct>
            <HomepageProduct
              title={this.lang.site.homeWallet}
              bgTitle={this.lang.site.homeWallet}
              icon="wallet"
              seeMoreLink={pages.WALLET}
              reverse
            >{[this.lang.site.homeWalletSubTitle1, this.lang.site.homeWalletSubTitle4, this.lang.site.homeWalletSubTitle3]}</HomepageProduct>
            <HomepageProduct
              title={this.lang.site.homeRobots}
              bgTitle={this.lang.site.homeRobots}
              icon="robot"
              seeMoreLink={pages.ROBOTS}
            >{[this.lang.site.homeRobotsSubTitle1, this.lang.site.homeRobotsSubTitle2, this.lang.site.homeRobotsSubTitle3]}</HomepageProduct>
            <HomepageProduct
              title={this.lang.site.homeInvestments}
              bgTitle={this.lang.site.homeInvestments}
              icon="investment"
              seeMoreLink={pages.INVESTMENT}
              reverse
            >{[this.lang.site.homeInvestmentsSubTitle1, this.lang.site.homeInvestmentsSubTitle2, this.lang.site.homeInvestmentsSubTitle3]}</HomepageProduct>
            <HomepageProduct
              title={this.lang.site.homePayment}
              bgTitle={this.lang.site.homePayment}
              icon="commerce"
              seeMoreLink={pages.COMMERCE}
            >{[this.lang.site.homePaymentSubTitle1, this.lang.site.homePaymentSubTitle2, this.lang.site.homePaymentSubTitle3]}</HomepageProduct>
          </div>
        </div>


        <div className="SiteMainScreen__safety">
          <div className="SiteSectionHeader">
            <div className="SiteSectionHeaderTitle">{this.lang.site.homeSecurityTitle}</div>
            <div className="SiteSectionHeaderCaption">{this.lang.site.homeSecuritySubTitle}</div>
          </div>

          {this._renderSafety()}
        </div>


        <RegisterBanner isCurly />

        <MobileAppBanner />

      </div>
    )
  }

  _renderSafety() {
    const items = [{
      icon: require('./asset/homepage_safety_1.svg'),
      title: this.lang.site.homeSafetyTitle1,
      caption: this.lang.site.homeSafetySubTitle1,
      route: pages.SAFETY,
    }, {
      icon: require('./asset/homepage_safety_2.svg'),
      title: this.lang.site.homeSafetyTitle2,
      caption: this.lang.site.homeSafetySubTitle2,
      route: pages.SAFETY,
    }, {
      icon: require('./asset/homepage_safety_3.svg'),
      title: this.lang.site.homeSafetyTitle3,
      caption: this.lang.site.homeSafetySubTitle3,
      route: pages.TECHNOLOGY,
    }].map((item) => {
      return (
        <InfoCard
          key={item.title}
          title={item.title}
          caption={item.caption}
          icon={item.icon}
          className="SiteHomepageSafety__item"
          btn={<a href={`/${item.route}`} className="SiteHomepageSafety__item__more">{this.lang.site.homeLearnMore}</a>}
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
