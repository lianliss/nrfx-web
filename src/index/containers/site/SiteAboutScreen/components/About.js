import React from "react";
import SVG from "react-inlinesvg";
import { connect } from "react-redux";

import TitleWithBg from "../../../../components/site/TitleWithBg/TitleWithBg";
import InfoSection from "../../../../components/site/InfoSection/InfoSection";
import { data } from "../fixtures";
import * as utils from "../../../../../utils";

function About() {
  return (
    <>
      <div className="SiteAboutScreen__intro">
        <TitleWithBg
          title={utils.getLang("site__aboutShortTitle")}
          bgTitle={utils.getLang("site__aboutShortTitle")}
          centered
        />
        <p className="SiteAboutScreen__caption">
          {utils.getLang("site__aboutShortTitleText")}
        </p>
      </div>

      <div className="SiteAboutScreen__career">
        <SVG src={require("../asset/about__career.svg")} />
        <h2 className="SiteAboutScreen__career__title">
          {utils.getLang("site__aboutWorkBitcoinbotTitle")}
        </h2>
        <p className="SiteAboutScreen__career__caption">
          {utils.getLang("site__aboutWorkBitcoinbotTitleText")}
        </p>
        <a href="/contact" className="SiteAboutScreen__link">
          {utils.getLang("site_aboutContact")}
        </a>
      </div>

      <InfoSection
        firstInfo={data.misssionInfo}
        secondInfo={data.historyInfo}
      />
    </>
  );
}

const mapStateToProps = state => ({
  currentLang: state.default.currentLang
});

export default React.memo(connect(mapStateToProps)(About));
