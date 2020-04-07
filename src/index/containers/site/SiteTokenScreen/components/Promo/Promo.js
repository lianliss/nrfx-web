import "./Promo.less";
import React from "react";
import { NumberFormat, Button } from "src/ui";
import { getLang } from "src/utils";
import SVG from "react-inlinesvg";

import Timer from "./timer";
import COMPANY from "src/index/constants/company";

export default props => {
  return (
    <div className="SiteTokenScreen__Promo">
      <div className="SiteTokenScreen__Promo__content">
        <h1>{getLang("token_promoTitle")}</h1>
        <p>{getLang("token_promoText")}</p>
        <div className="SiteTokenScreen__Promo__numbers">
          <div className="SiteTokenScreen__Promo__numbers__item">
            <small>{getLang("global_price")}</small>
            <strong>
              <NumberFormat number={0.1} currency="usd" />
            </strong>
          </div>
          <Timer roadMap={props.roadMap} />
        </div>
        <div className="SiteTokenScreen__Promo__buttons">
          <Button onClick={props.onBuy}>{getLang("token_buyToken")}</Button>
          <Button
            type="lite"
            onClick={() => {
              window.open(COMPANY.whitePaper.en);
            }}
          >
            {getLang("token_whitePaper")}
            <SVG src={require("src/asset/16px/link.svg")} />
          </Button>
        </div>
      </div>
      <div className="SiteTokenScreen__Promo__logo">
        <SVG src={require("src/asset/token/logo_big.svg")} />
      </div>
    </div>
  );
};
