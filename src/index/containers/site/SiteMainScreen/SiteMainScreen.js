import './SiteMainScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SitePageInfoBlock from '../../../components/site/SitePageInfoBlock/SitePageInfoBlock';
import HomepageProduct from '../../../components/site/HomepageProduct/HomepageProduct';
import MobileAppBanner from '../../../components/site/MobileAppBanner/MobileAppBanner';
import RegisterBanner from '../../../components/site/RegisterBanner/RegisterBanner';
import InfoCard from '../../../components/site/InfoCard/InfoCard';
import * as pages from '../../../constants/pages';
import * as utils from '../../../../utils/index';
import * as actions from '../../../../actions';
import TypedText from '../../../components/site/TypedText/TypedText';
import initGetParams from '../../../../services/initialGetParams';
import COMPANY from '../../../constants/company';

export default class SiteMainScreen extends BaseScreen {
  componentDidMount() {
    if (initGetParams.params.i) {
      actions.sendInviteLinkView(initGetParams.params.i);
    }
  }

  getAnimatedTitle = () => {
    const products = [
      'site__homeSlideExchange',
      'site__homeSlideWallet',
      'site__homeSlideRobots',
    ];

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
        <div className="Layout_spacing">
          <SitePageInfoBlock
            image={require('../../site/SiteMainScreen/asset/homepage_screen.png')}
            title={<span>{COMPANY.name}:<br />{this.getAnimatedTitle()}</span>}
            caption={<span>{utils.getLang('site__homeWalletSubTitile')}</span>}
            buttonText={utils.getLang('site__homeBegin')}
          />

          <div className="SiteSectionHeader">
            <div className="SiteSectionHeaderTitle">{utils.getLang('site__homeBitcoibotCombine')}</div>
            <div className="SiteSectionHeaderCaption">{utils.getLang('site__homeBitcoibotCombineSubTitle')}</div>
          </div>
        </div>


        <div className="SiteHomepageProducts">
          <div className="Layout_spacing">

            <HomepageProduct
              title={utils.getLang('site__homeExchange')}
              bgTitle={utils.getLang('site__homeExchange')}
              icon="exchange"
              seeMoreLink={pages.SITE_EXCHANGE}
            >{[utils.getLang('site__homeExchangeSubTitile1'), utils.getLang('site__homeExchangeSubTitile2'), utils.getLang('site__homeExchangeSubTitile3')]}</HomepageProduct>
            <HomepageProduct
              title={utils.getLang('site__homeRobots')}
              bgTitle={utils.getLang('site__homeRobots')}
              icon="robot"
              reverse
              seeMoreLink={pages.ROBOTS}
            >{[utils.getLang('site__homeRobotsSubTitle1'), utils.getLang('site__homeRobotsSubTitle2'), utils.getLang('site__homeRobotsSubTitle3')]}</HomepageProduct>
            <HomepageProduct
              title={utils.getLang('site__homeWallet')}
              bgTitle={utils.getLang('site__homeWallet')}
              icon="wallet"
              seeMoreLink={pages.WALLET}
            >{[utils.getLang('site__homeWalletSubTitle1'), utils.getLang('site__homeWalletSubTitle4'), utils.getLang('site__homeWalletSubTitle3')]}</HomepageProduct>

            {/*<HomepageProduct*/}
            {/*  title={this.lang.site.homeInvestments}*/}
            {/*  bgTitle={this.lang.site.homeInvestments}*/}
            {/*  icon="investment"*/}
            {/*  seeMoreLink={pages.INVESTMENT}*/}
            {/*  reverse*/}
            {/*>{[this.lang.site.homeInvestmentsSubTitle1, this.lang.site.homeInvestmentsSubTitle2, this.lang.site.homeInvestmentsSubTitle3]}</HomepageProduct>*/}

            {/*<HomepageProduct*/}
            {/*  title={this.lang.site.homePayment}*/}
            {/*  bgTitle={this.lang.site.homePayment}*/}
            {/*  icon="commerce"*/}
            {/*  seeMoreLink={pages.COMMERCE}*/}
            {/*>{[this.lang.site.homePaymentSubTitle1, this.lang.site.homePaymentSubTitle2, this.lang.site.homePaymentSubTitle3]}</HomepageProduct>*/}
          </div>
        </div>


        <div className="SiteMainScreen__safety">
          <div className="SiteSectionHeader">
            <div className="SiteSectionHeaderTitle">{utils.getLang('site__homeSecurityTitle')}</div>
            <div className="SiteSectionHeaderCaption">{utils.getLang('site__homeSecuritySubTitle')}</div>
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
      title: utils.getLang('site__homeSafetyTitle1'),
      caption: utils.getLang('site__homeSafetySubTitle1'),
      route: pages.SAFETY,
    }, {
      icon: require('./asset/homepage_safety_2.svg'),
      title: utils.getLang('site__homeSafetyTitle2'),
      caption: utils.getLang('site__homeSafetySubTitle2'),
      route: pages.SAFETY,
    }, {
      icon: require('./asset/homepage_safety_3.svg'),
      title: utils.getLang('site__homeSafetyTitle3'),
      caption: utils.getLang('site__homeSafetySubTitle3'),
      route: pages.TECHNOLOGY,
    }].map((item) => {
      return (
        <InfoCard
          key={item.title}
          title={item.title}
          caption={item.caption}
          icon={item.icon}
          className="SiteHomepageSafety__item"
          btn={<a href={`/${item.route}`} className="SiteHomepageSafety__item__more">{utils.getLang('site__homeLearnMore')}</a>}
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
