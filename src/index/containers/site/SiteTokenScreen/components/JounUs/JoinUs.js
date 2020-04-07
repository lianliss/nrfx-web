import "./JoinUs.less";
import React from "react";
import { getLang } from "src/utils";
import { Button } from "src/ui";

export default props => {
  return (
    <div className="SiteTokenScreen__JoinUs">
      <div className="anchor" id="JoinUs" />
      <div className="SiteTokenScreen__JoinUs__bgText">Join Us</div>
      <h2>{getLang("token_JoinUsTitle1")}</h2>
      <h2>
        {getLang("token_JoinUsTitle2")}{" "}
        <span onClick={props.onBuy} className="link">
          {getLang("token_JoinUsTitle2Link")}
        </span>
      </h2>
      <Button onClick={props.onBuy}>{getLang("global_buy")}</Button>
    </div>
  );
};