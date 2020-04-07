import "./Promo.less";
import React from "react";
import { NumberFormat, ButtonWrapper, Button } from "src/ui";
import { getLang } from "src/utils";
import SVG from "react-inlinesvg";

export default props => {
  return (
    <div className="SiteTokenScreen__Promo">
      <div className="anchor" id="Main" />
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
          <div className="SiteTokenScreen__Promo__numbers__item">
            <small>{getLang("token_privatPresale")}</small>
            <strong>24D 17H 44M</strong>
          </div>
        </div>
        <ButtonWrapper>
          <Button onClick={props.onBuy}>{getLang("global_buy")}</Button>
          <Button type="lite">
            {getLang("token_whitePaper")}
            <SVG src={require("src/asset/16px/link.svg")} />
          </Button>
        </ButtonWrapper>
      </div>
      <div className="SiteTokenScreen__Promo__logo">
        <SVG src={require("src/asset/token/logo_big.svg")} />
      </div>
    </div>
  );
};
