import "./Promo.less";
import React, { useEffect, useState } from "react";
import { NumberFormat, Button, OnScroll } from "src/ui";
import { getLang } from "src/utils";
import SVG from "utils/svg-wrap";
import { tokenRateGet } from "src/actions/cabinet/wallets";
import Timer from "./timer";
import COMPANY from "src/index/constants/company";
import web3Backend from 'services/web3-backend';

export default props => {
  const [price, setPrice] = useState(null);
  useEffect(() => {
    web3Backend.getTokenRate('nrfx').then(data => {
      setPrice(data.price);
    })
  }, []);

  return (
    <OnScroll className="SiteTokenScreen__Promo">
      <div className="SiteTokenScreen__Promo__content">
        <h1>{getLang("token_promoTitle")}</h1>
        <p>{getLang("token_promoText")}</p>
        <div className="SiteTokenScreen__Promo__numbers">
          <div className="SiteTokenScreen__Promo__numbers__item">
            <small>{getLang("global_price")}</small>
            <strong>
              {price ? <NumberFormat number={price} currency="usd" /> : "-"}
            </strong>
          </div>
          <Timer roadMap={props.roadMap} />
        </div>
        <div className="SiteTokenScreen__Promo__buttons">
          <Button onClick={() => {
              window.open(COMPANY.BuyInstruction.en);
            }}
            >
              {getLang("token_buyToken")}</Button>
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
    </OnScroll>
  );
};
