import "./SiteTokenScreen.less";
import React from "react";

import Promo from "./components/Promo/Promo";
import Benefits from "./components/Benefits/Benefits";
import TokenBurning from "./components/TokenBurning/TokenBurning";
import Address from "./components/Address/Address";
import * as actions from "../../../../actions";

export default props => {
  const handleBuy = () => {
    if (props.isLogin) {
      actions.openModal("nrfx_presale");
    } else {
      actions.openModal("auth", null, { type: "registration" });
    }
  };

  return (
    <div className="SiteTokenScreen">
      <Promo onBuy={handleBuy} />
      <Benefits />
      <TokenBurning onBuy={handleBuy} />
      <Address />
    </div>
  );
};
