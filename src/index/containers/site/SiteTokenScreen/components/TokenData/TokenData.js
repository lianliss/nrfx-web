import "./TokenData.less";

import React from "react";
import { getLang } from "src/utils";
import { Button, NumberFormat, ButtonWrapper } from "src/ui";

export default props => {
  return (
    <div className="SiteTokenScreen__TokenDataWrapper">
      <div className="anchor" id="TokenData" />
      <div className="SiteTokenScreen__TokenData">
        <h2>{getLang("token_narfexTokenDataTitle")}</h2>
        <div className="SiteTokenScreen__TokenData__layout">
          <div className="SiteTokenScreen__TokenData__content">
            <p>{getLang("token_narfexTokenDataText1")}</p>
            <p>{getLang("token_narfexTokenDataText2")}</p>
          </div>
          <div className="SiteTokenScreen__TokenData__scaleWrapper">
            <div className="SiteTokenScreen__TokenData__scale">
              <div
                style={{ height: "0%", width: "0%" }}
                className="SiteTokenScreen__TokenData__scale__value"
              ></div>
            </div>
            <div className="SiteTokenScreen__TokenData__scaleLabels">
              <div className="SiteTokenScreen__TokenData__scaleLabel">
                <small>{getLang("token_narfexTokenDataSoftCap")}</small>
                <strong>
                  <NumberFormat number={7000000} currency="usd" />
                </strong>
              </div>
              <div className="SiteTokenScreen__TokenData__scaleLabel">
                <small>{getLang("token_narfexTokenDataHardCap")}</small>
                <strong>
                  <NumberFormat number={60000000} currency="usd" />
                </strong>
              </div>
            </div>
          </div>
        </div>
        <ButtonWrapper>
          <Button onClick={props.onBuy}>{getLang("global_buy")}</Button>
        </ButtonWrapper>
      </div>
    </div>
  );
};
