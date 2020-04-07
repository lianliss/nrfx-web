import "./SiteTokenScreen.less";
import React from "react";
import { connect } from "react-redux";

import Promo from "./components/Promo/Promo";
import Benefits from "./components/Benefits/Benefits";
import TokenData from "./components/TokenData/TokenData";
import TokenBurning from "./components/TokenBurning/TokenBurning";
import Address from "./components/Address/Address";
import RoadMap from "./components/RoadMap/RoadMap";
import JoinUs from "./components/JounUs/JoinUs";
import * as actions from "../../../../actions";
import { getLang } from "src/utils";

const SiteTokenScreen = props => {
  const handleBuy = () => {
    if (props.isLogin) {
      actions.openModal("nrfx_presale");
    } else {
      actions.openModal("auth", null, { type: "registration" });
    }
  };

  const roadMap = [
    { title: getLang("token_roadMapStep1"), time: 1585872000000 },
    { title: getLang("token_roadMapStep2"), time: 1586649600000 },
    { title: getLang("token_roadMapStep3"), time: 1591920000000 },
    { title: getLang("token_roadMapStep4"), time: 1594512000000 }
  ];

  return (
    <div className="SiteTokenScreen">
      <Promo onBuy={handleBuy} />
      <Benefits />
      <TokenData onBuy={handleBuy} />
      <RoadMap items={roadMap} />
      <TokenBurning onBuy={handleBuy} />
      <Address />
      <JoinUs onBuy={handleBuy} />
    </div>
  );
};

export default connect(state => ({
  isLogin: !!state.default.profile.user
}))(SiteTokenScreen);
