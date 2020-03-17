import React from "react";
import { connect } from "react-redux";

import TitleWithBg from "../../../../components/site/TitleWithBg/TitleWithBg";
import InfoSection from "../../../../components/site/InfoSection/InfoSection";
import { data } from "../fixtures";
import * as utils from "../../../../../utils";
import { getLang } from "../../../../../utils";

function Mission({ lang }) {
  const _renderValues = () => {
    const values = [
      {
        title: getLang("site__aboutMissionTechnologyDevelopmentTitle"),
        caption: getLang("site__aboutMissionTechnologyDevelopmentSubTitle"),
        icon: require("../asset/change.svg")
      },
      {
        title: getLang("site__aboutMissionCommunityUsersTitle"),
        caption: getLang("site__aboutMissionCommunityUsersSubTitle"),
        icon: require("../asset/community.svg")
      },
      {
        title: getLang("site__aboutMissionTrustReliabilityTitle"),
        caption: getLang("site__aboutMissionTrustReliabilitySubTitle"),
        icon: require("../asset/trust.svg")
      }
    ];

    return values.map(val => (
      <div className="SiteAboutScreen__mission__value" key={val.title}>
        <img
          className="SiteAboutScreen__mission__value__icon"
          src={val.icon}
          alt={val.title}
        />
        <div className="SiteAboutScreen__mission__value__cont">
          <h3 className="SiteAboutScreen__mission__value__title">
            {val.title}
          </h3>
          <p className="SiteAboutScreen__mission__value__caption">
            {val.caption}
          </p>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="SiteAboutScreen__intro">
        <TitleWithBg
          title={getLang("site__aboutMissionOurMissionTitle")}
          bgTitle={getLang("site__aboutMissionOurMissionTitle")}
          centered
        />
        <p className="SiteAboutScreen__caption">
          {utils.nl2br(getLang("site__aboutMissionOurMissionSubTitle"))}
        </p>
      </div>

      <div className="SiteAboutScreen__mission__values">
        <h2 className="SiteAboutScreen__mission__values__title">
          {getLang("site__aboutMissionValuesUnitUs")}
        </h2>

        {_renderValues()}
      </div>

      <InfoSection firstInfo={data.aboutInfo} secondInfo={data.historyInfo} />
    </>
  );
}

const mapStateToProps = state => ({
  currentLang: state.default.currentLang
});

export default React.memo(connect(mapStateToProps)(Mission));
