import "./SiteCommerceScreen.less";

import React from "react";

import BaseScreen from "../../BaseScreen";
import SitePageInfoBlock from "../../../components/site/SitePageInfoBlock/SitePageInfoBlock";
import TitleWithBg from "../../../components/site/TitleWithBg/TitleWithBg";
import FeatureCard from "../../../components/site/FeatureCard/FeatureCard";
import Steps from "../../../components/site/Steps/Steps";
import Banner from "../../../components/site/Banner/Banner";
import * as utils from "../../../../utils";

export default class SiteCommerceScreen extends BaseScreen {
  stepsData = [
    {
      num: 1,
      title: utils.getLang("site__commerceStep1"),
      caption: utils.getLang("site__commerceStep1Title")
    },
    {
      num: 2,
      title: utils.getLang("site__commerceStep2"),
      caption: utils.getLang("site__commerceStep2Title")
    },
    {
      num: 3,
      title: utils.getLang("site__commerceStep3"),
      caption: utils.getLang("site__commerceStep3Title")
    },
    {
      num: 4,
      title: utils.getLang("site__commerceStep4"),
      caption: utils.getLang("site__commerceStep4Title")
    }
  ];

  render() {
    return (
      <div>
        <div className="Layout_spacing">
          <SitePageInfoBlock
            hideWatchButton
            image={require("../../site/SiteCommerceScreen/asset/Commerce_main_bg.svg")}
            title={<span>{utils.getLang("site__commerceTitle")}</span>}
            caption={<span>{utils.getLang("site__commerceSubTitle")}</span>}
            buttonText={utils.getLang("site__commerceRegistration")}
          />

          <div className="SiteCommerceScreen__intro">
            <TitleWithBg
              title={utils.getLang("site__commerceBitcoinbotTitle")}
              bgTitle={utils.getLang("site__commerceBitcoinbotTitle")}
              bgTitleUppercase
              centered
            />
            <p className="SiteCommerceScreen__caption">
              {utils.getLang("site__commerceBitcoinbotSubTitle")}
            </p>
          </div>

          <div className="SiteCommerceScreen__features">
            <h2 className="SiteCommerceScreen__title">
              {utils.getLang("site__commerceBenefitsTitle")}
            </h2>
            <p className="SiteCommerceScreen__caption">
              {utils.getLang("site__commerceBenefitsSubTitle")}
            </p>

            {this._renderFeatures()}
          </div>

          <h2 className="SiteCommerceScreen__title">
            {utils.getLang("site__commerceHowItWorksTitle")}
          </h2>
          <p className="SiteCommerceScreen__caption">
            {utils.getLang("site__commerceHowItWorksSubTitle")}
          </p>

          <Steps stepsData={this.stepsData} />
        </div>

        <Banner
          title={utils.getLang("site__commerceConnectTitle")}
          caption={utils.getLang("site__commerceConnectSubTitle")}
          btnText={utils.getLang("site__commerceConnectBtn")}
        />
      </div>
    );
  }

  _renderFeatures() {
    const features = [
      {
        title: utils.getLang("site__commerceGlobalTitle"),
        caption: utils.getLang("site__commerceGlobalSubTitle")
      },
      {
        title: utils.getLang("site__commerceFastTitle"),
        caption: utils.getLang("site__commerceFastSubTitle")
      },
      {
        title: utils.getLang("site__commerceConfidentiallyTitle"),
        caption: utils.getLang("site__commerceConfidentiallySubTitle")
      },
      {
        title: utils.getLang("site__commerceNoLimitsTitle"),
        caption: utils.getLang("site__commerceNoLimitsSubTitle")
      },
      {
        title: utils.getLang("site__commerceWithoutIntermediariesTitle"),
        caption: utils.getLang("site__commerceWithoutIntermediariesSubTitle")
      },
      {
        title: utils.getLang("site__commerceLowCommissionTitle"),
        caption: utils.getLang("site__commerceLowCommissionSubTitle")
      },
      {
        title: utils.getLang("site__commerceConvenientPracticalTitle"),
        caption: utils.getLang("site__commerceConvenientPracticalSubTitle")
      },
      {
        title: utils.getLang("site__commerceSafelyTitle"),
        caption: utils.getLang("site__commerceSafelySubTitle")
      }
    ];

    return (
      <div className="SiteCommerceScreen__features__items">
        {features.map(feat => (
          <FeatureCard
            key={feat.title}
            title={feat.title}
            caption={feat.caption}
          />
        ))}
      </div>
    );
  }
}
