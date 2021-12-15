import "./SiteTokenScreen.less";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAnalytics, logEvent } from "firebase/analytics";

import Promo from "./components/Promo/Promo";
import Benefits from "./components/Benefits/Benefits";
import TokenData from "./components/TokenData/TokenData";
// import TokenBurning from "./components/TokenBurning/TokenBurning";
// import Address from "./components/Address/Address";
import RoadMap from "./components/RoadMap/RoadMap";
import JoinUs from "./components/JounUs/JoinUs";
import Usability from "./components/Usability/Usability";
import * as actions from "../../../../actions";
import { getLang } from "src/utils";
import { Helmet } from "react-helmet";
import * as utils from "../../../../utils";

const SiteTokenScreen = props => {
  useEffect(() => {
    logEvent(getAnalytics(), "open_site_token_screen");
  });

  const handleBuy = () => {
    if (props.isLogin) {
      actions.openModal("nrfx_presale");
    } else {
      actions.openModal("auth", null, { type: "registration" });
    }
  };

  const roadMap = [
    {
      title: getLang("token_roadMapStep1"),
      phase: getLang("token_roadMapPhase1")
    },
    {
      title: getLang("token_roadMapStep2"),
      phase: getLang("token_roadMapPhase1")
    },
    {
      title: getLang("token_roadMapStep3"),
      phase: getLang("token_roadMapPhase1")
    },
    {
      title: getLang("token_roadMapStep4"),
      phase: getLang("token_roadMapPhase1")
    },
    {
      title: getLang("token_roadMapStep5"),
      phase: getLang("token_roadMapPhase1")
    },
    {
      title: getLang("token_roadMapStep6"),
      phase: getLang("token_roadMapPhase1")
    },
    {
      title: getLang("token_roadMapStep7"),
      phase: getLang("token_roadMapPhase1")
    },
    {
      title: getLang("token_roadMapStep8"),
      phase: getLang("token_roadMapPhase1")
    },
    {
      title: getLang("token_roadMapStep9"),
      phase: getLang("token_roadMapPhase1")
    },
    {
      title: getLang("token_roadMapStep10"),
      phase: getLang("token_roadMapPhase2")
    },
    {
      title: getLang("token_roadMapStep11"),
      phase: getLang("token_roadMapPhase2")
    },
    {
      title: getLang("token_roadMapStep12"),
      phase: getLang("token_roadMapPhase2")
    },
    {
      title: getLang("token_roadMapStep13"),
      phase: getLang("token_roadMapPhase2")
    },
    {
      title: getLang("token_roadMapStep14"),
      phase: getLang("token_roadMapPhase2")
    },
    {
      title: getLang("token_roadMapStep15"),
      phase: getLang("token_roadMapPhase2")
    }
  ];

  return (
    <div id="Main" className="SiteTokenScreen">
      <Helmet>
        <title>{utils.getLang("global_nrfxToken", true)}</title>
        <meta
          name="description"
          content={utils.getLang("token_promoText", true)}
        />
      </Helmet>
      <Promo roadMap={roadMap} onBuy={handleBuy} />
      <Benefits />
      <TokenData onBuy={handleBuy} />
      <RoadMap items={roadMap} />
      {/*<TokenBurning onBuy={handleBuy} />*/}
      <Usability />
      {/*<Address />*/}
      <JoinUs onBuy={handleBuy} />
    </div>
  );
};

export default connect(state => ({
  isLogin: !!state.default.profile.user
}))(SiteTokenScreen);
