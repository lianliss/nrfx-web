import "./TokenBurning.less";
import React from "react";
import { getLang } from "src/utils";
import { Button, ButtonWrapper } from "src/ui";
import SVG from "react-inlinesvg";

export default props => {
  return (
    <div className="SiteTokenScreen__TokenBurning">
      <h2>
        {getLang("token_TokenBurning")}
        <SVG src={require("./assets/flame.svg")} />
      </h2>
      <div className="SiteTokenScreen__TokenBurning__content">
        <div>
          <p>{getLang("token_TokenBurning_p1")}</p>
          <p>{getLang("token_TokenBurning_p2")}</p>
          <ButtonWrapper align="right">
            <Button onClick={props.onBuy}>{getLang("global_buy")}</Button>
          </ButtonWrapper>
        </div>
        <div className="SiteTokenScreen__TokenBurning__amount">
          <div className="SiteTokenScreen__TokenBurning__amount__item">
            <small>{getLang("token_BurningAmount")}</small>
            <strong>50% = 100M</strong>
          </div>
        </div>
      </div>
      <Button
        className="SiteTokenScreen__TokenBurning__mobileButton"
        size="middle"
        onClick={props.onBuy}
      >
        {getLang("global_buy")}
      </Button>
    </div>
  );
};
